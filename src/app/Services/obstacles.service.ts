import { Injectable } from '@angular/core';
import { WebSocketService } from './Http/web-socket.service';

export interface IDynamicObstacles {
  SDVs: any;
  dynamicObstacles: IDynamicObstacle[];
}

export interface IDynamicObstacle {
  dzh: number;
  dzw: number;
  h: number;
  w: number;
  x: number;
  y: number;
}

const PIXEL_CONSTANT = 37.95275590551;

@Injectable({
  providedIn: 'root'
})
export class ObstaclesService {
  public mapSize: { x: number; y: number } = {
    x: 0,
    y: 0
  }

  constructor(public wss: WebSocketService) {
    this.wss.initSocketConnectionData();
  }

  getPolygonClipPathString(polygon: { x: number; y: number }[]) {
    const polygonRibsArray = [];
    polygon.forEach(rib => {
      const convertedRib = `${this.convertToPercentage(rib.x, 'x')} ${this.convertToPercentage(rib.y, 'y')}`;
      polygonRibsArray.push(convertedRib);
    });
    return `polygon(${polygonRibsArray.join(',')})`;
  }

  public getPositionOfDynamicItems() {
    return this.wss.socketData;
  }

  public convertToPx(meters: number): string {
    return (meters * PIXEL_CONSTANT) + 'px';
  }

  public convertToPercentage(meters: number, type: 'x' | 'y'): string {
    let size: string;
    switch (type) {
      case 'x':
        size = (meters / this.mapSize.x) * 100 + '%';
        break;
      case 'y':
        size = (meters / this.mapSize.y) * 100 + '%';
        break;
    }
    return size;
  }

  public setXAndY(factoryMap: { x: number; y: number }[]) {
    factoryMap.forEach(rib => {
      if (rib.x) {
        this.mapSize.x = rib.x;
      }
      if (rib.y) {
        this.mapSize.y = rib.y;
      }
    });
  }


}
