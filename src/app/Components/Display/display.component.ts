import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ObstaclesService } from 'src/app/Services/obstacles.service';
import { HttpService } from '../../Services/Http/http.service';
import { Subscription } from 'rxjs';
import { IDynamicObstacles } from '../../Services/obstacles.service';




const DEMO_DATA = {
  "camerasMapping": [
    {
      "id": 1,
      "mapping": [
        { "x": 1, "y": 1 },
        { "x": 10, "y": 1 },
        { "x": 10, "y": 20 },
        { "x": 1, "y": 20 },
        { "x": 1, "y": 1 }]
    },
    {
      "id": 2,
      "mapping": [
        { "x": 6, "y": 1 },
        { "x": 15, "y": 1 },
        { "x": 15, "y": 20 },
        { "x": 6, "y": 20 },
        { "x": 6, "y": 1 }]
    }
  ],
  "extraShapes":
    [{
      "color": "#ffddee",
      "polygon": [
        { "x": 35, "y": 15 },
        { "x": 30, "y": 15 },
        { "x": 28, "y": 16.5 },
        { "x": 30, "y": 18 },
        { "x": 35, "y": 18 }
      ]
    }
    ], "factoryPolygon": [
      { "x": 0, "y": 0 },
      { "x": 50, "y": 0 },
      { "x": 50, "y": 30 },
      { "x": 0, "y": 30 },
      { "x": 0, "y": 0 }
    ],
  "staticObstacles": [
    { "dzh": 0.1, "dzw": 0.1, "h": 10, "w": 20, "x": 8, "y": 1 },
    { "dzh": 0.1, "dzw": 0.1, "h": 10, "w": 5, "x": 1, "y": 1 },
    { "dzh": 0.1, "dzw": 0.1, "h": 10, "w": 10, "x": 38, "y": 15 },
    { "dzh": 0.1, "dzw": 0.1, "h": 2, "w": 10.5, "x": 1, "y": 16 },
    { "dzh": 0.1, "dzw": 0.1, "h": 10, "w": 10, "x": 13, "y": 13 },
  ],
  "staticStations": [
    { "Name": "Station1", "h": 5.5, "w": 12, "x": 25, "y": 20 },
    { "Name": "Station2", "h": 12.5, "w": 5.5, "x": 30, "y": 1 },
    { "Name": "Station3", "h": 7.5, "w": 4.5, "x": 40, "y": 1 },
    { "Name": "Station4", "h": 3.5, "w": 10.5, "x": 1, "y": 20 },
    { "Name": "Station5", "h": 3.5, "w": 10.5, "x": 1, "y": 10 },
  ]
}




export interface IStaticObstacle {
  "dzh": number;
  "dzw": number;
  "h": number;
  "w": number;
  "x": number;
  "y": number;
}

export interface IStaticStation {
  "Name": string;
  "h": number;
  "w": number;
  "x": number;
  "y": number;
}

export interface IExtraShape {
  color: string;
  polygon: IPolygonRib[];
}

export interface IPolygonRib {
  x: number;
  y: number;
}


@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss'],
  host: {
    class: 'component-display'
  }
})
export class DisplayComponent implements OnInit, OnDestroy {
  private dynamicItemSub: Subscription;
  public dynamicObstacles: IDynamicObstacles;
  public map;
  @ViewChild('factoryMap', { static: true }) factoryMap: ElementRef<HTMLDivElement>;



  constructor(private os: ObstaclesService, private http: HttpService) { }

  ngOnInit() {
    this.initMap();
    this.initDynamicItems();
  }

  initDynamicItems() {
    this.dynamicItemSub = this.os.getPositionOfDynamicItems().subscribe(data => {
      let newData = data;
      if (typeof data === 'string') {
        newData = JSON.parse(data);
      }
      if (!this.dynamicObstacles) {
        this.dynamicObstacles = newData as IDynamicObstacles;
      } else if (!this.checkIfNewObstacleIsTheSameObstacle(newData as IDynamicObstacles)) {
        this.dynamicObstacles = newData as IDynamicObstacles;
      }
    });
  }

  checkIfNewObstacleIsTheSameObstacle(newObstacle: IDynamicObstacles) {
    let isOld = true;
    if (isOld && newObstacle.dynamicObstacles.length === this.dynamicObstacles.dynamicObstacles.length) {
      this.dynamicObstacles.dynamicObstacles.forEach((dynamicObs, i) => {
        for (const key in dynamicObs) {
          if (newObstacle.dynamicObstacles[i].hasOwnProperty(key)) {
            const oldElement = dynamicObs[key];
            const newElement = newObstacle.dynamicObstacles[i][key];
            if (oldElement === newElement) {
              isOld = isOld && true;
            } else {
              isOld = false;
            }
          } else {
            isOld = false;
          }
        }
      });
    } else {
      isOld = false;
    }
    return isOld;

  }

  initMap() {
    this.http.getMap().subscribe(res => {
      // this.map = res;
      this.map = DEMO_DATA
      this.initFactoryMap(this.map.factoryPolygon);
    });
  }

  initFactoryMap(factoryMap: { x: number, y: number }[]) {
    this.os.setXAndY(factoryMap);
    const clipPath = this.os.getPolygonClipPathString(factoryMap);
    this.factoryMap.nativeElement.style.clipPath = clipPath;
  }

  getDynamicObstacles(): IDynamicObstacles {
    if (this.map && this.dynamicObstacles) {
      return this.dynamicObstacles;
    }
    return {
      SDVs: {},
      dynamicObstacles: []
    };
  }

  getStaticObstacles(): IStaticObstacle[] {
    if (this.map) {
      return this.map.staticObstacles;
    }
    return [];
  }

  getStaticStations(): IStaticStation[] {
    if (this.map) {
      return this.map.staticStations;
    }
    return [];
  }

  getExtraShapes(): IExtraShape[] {
    if (this.map) {
      return this.map.extraShapes;
    }
    return [];
  }


  ngOnDestroy() {
    if (this.dynamicItemSub) {
      this.dynamicItemSub.unsubscribe();
    }
  }
}
