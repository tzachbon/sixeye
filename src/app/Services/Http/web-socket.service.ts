import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import * as io from 'socket.io-client';
import { BehaviorSubject, Subject } from 'rxjs';
import { IDynamicObstacles } from '../obstacles.service';






@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket: WebSocket;
  public socketData = new Subject<IDynamicObstacles | string>();

  constructor() {
    this.socket = new WebSocket(environment.SOCKET_URL);
  }

  initSocketConnectionData() {
    this.socket.onmessage = (event: MessageEvent) => {
      this.socketData.next(event.data);
    };
  }
}
