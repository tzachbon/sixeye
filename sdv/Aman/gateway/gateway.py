import asyncio
import websockets
import time
import json

#from simple_dds import SimpleDDS
from threading import Thread, RLock

from flask import Flask, jsonify

FPS = 30

class Obstacle:
	def __init__(self):
		pass

class Gateway:
	def __init__(self):
		with open('staticData.json', 'r') as file:
			self.staticData = json.loads(file.read())

		self.roomConfigLock = RLock()
		self.systemStatusLock = RLock()
		self.sdvDataLock = RLock()
		#self.systemStatusReader = SimpleDDS("Cam1", 'sdv::SystemStatus', 'sdv_types.idl')
		#self.roomConfigReader = SimpleDDS("Cam2", 'sdv::RoomConfig', 'sdv_types.idl')
		#self.cameraLocationReader = SimpleDDS("CameraLocation", 'sdv::SDVCameraLocation', 'sdv_types.idl')
		#self.submitTaskReader = SimpleDDS("SubmitTask", 'sdv::SubmitTask', 'sdv_types.idl')
		self.webSocketsServer = websockets.serve(self.periodicSend, '0.0.0.0', 8765, extra_headers=[('Access-Control-Allow-Origin', '*')])

		self.sdvIdToData = {}
		self.systemStatusMessage = None

		with open('systemStatusDummy.json', 'r') as file:
			self.systemStatusDummy = json.loads(file.read())

	def readDDSMessages(self):
		print("Read DDS Thread Started!")
		try:
			while True:
				self.takeRoomConfig()
				self.takeSystemStatus()
				self.takeCameraLocation()
				self.takeSubmitTask()

				time.sleep(1 / FPS)
		except Exception as e:
			print(str(e))
			print("Read DDS Thread Exit!")

	def takeSystemStatus(self):
		message = self.takeMessageUntilNoneLeft(self.systemStatusReader)

		if message is not None:
			self.systemStatusLock.acquire()
			self.systemStatusMessage = message
			self.systemStatusLock.release()

	def takeRoomConfig(self):
		message = self.takeMessageUntilNoneLeft(self.roomConfigReader)

		if message is not None:
			self.roomConfigLock.acquire()
			self.roomConfigMessage = message
			self.roomConfigLock.release()

	def getSDVData(self, sdvId):
		if self.sdvIdToData.get(sdvId, None) is None:
			data = {}
			self.sdvIdToData[sdvId] = data
			return data

		return self.sdvIdToData[sdvId]

	def takeCameraLocation(self):
		self.takeEachMessage(self.cameraLocationReader, self.setVehicleLocation)

	def setVehicleLocation(self, message):
		self.sdvDataLock.acquire()
		self.getSDVData(message.sdvID)['position'] = {'x': message.x, 'y': message.y, 'th': message.theta}
		self.sdvDataLock.release()

	def takeSubmitTask(self):
		self.takeEachMessage(self.submitTaskReader, self.setVehicleTask)

	def setVehicleTask(self, message):
		self.sdvDataLock.acquire()
		self.getSDVData(message.sdvID)['path'] = message.path
		self.sdvDataLock.release()

	def getVehicleData(self, sdvID):
		if self.sdvIDToData.get(sdvID, None) is not None:
			return self.sdvIDToData[sdvID]
		else:
			self.sdvIDToData[sdvID] = {}
			return self.sdvIDToData[sdvID]

	def takeMessageUntilNoneLeft(self, reader):
		samples = reader.take()
		if len(samples) == 0:
			return None

		message = None
		while len(samples) > 0:
			(message, si) = samples[-1]
			print(message)
			samples = reader.take()

		return message

	def takeEachMessage(self, reader, function):
		samples = reader.take()
		if len(samples) == 0:
			return

		message = None
		while len(samples) > 0:
			(message, si) = samples[-1]
			function(message)
			samples = reader.take()

	def start(self):
		# Raise dds thread that keeps an up-to-date data
		#self.ddsThread = Thread(target = self.readDDSMessages, args = ())
		#self.ddsThread.start()

		self.wsThread = Thread(target = self.runWebServer, args = ())
		self.wsThread.start()

		# Raise web socket connection that periodcially sends the real time data message
		asyncio.get_event_loop().run_until_complete(self.webSocketsServer)
		asyncio.get_event_loop().run_forever()

	def preparePushMessage(self):
		self.systemStatusLock.acquire()
		self.sdvDataLock.acquire()
		message = {}
		if self.systemStatusMessage is not None:
			message['dynamicObstacles'] = [{'x': obstacle.position.x, 'y': obstacle.position.y, 'w': obstacle.size.x, 'h': obstacle.size.y} for obstacle in self.systemStatusMessage.dynamicObstacles]
		else:
			message['dynamicObstacles'] = []
		message['SDVs'] = self.sdvIdToData
		messageString = json.dumps(self.systemStatusDummy)
		self.systemStatusLock.release()
		self.sdvDataLock.release()

		return messageString

	async def periodicSend(self, websocket, path):
		while True:
			message = self.preparePushMessage()
			await websocket.send(message)

			time.sleep(1 / FPS)

	def runWebServer(self):
		app.run(host='0.0.0.0')

	def getStaticData(self):
		return jsonify(self.staticData)

gateway = Gateway()
app = Flask(__name__)

@app.route('/staticData', methods=['GET'])
def getStaticData():
	response = gateway.getStaticData()
	response.headers['Access-Control-Allow-Origin'] = '*'
	return response

if __name__ == '__main__':
	gateway.start()
