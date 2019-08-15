import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { ObstaclesService, IDynamicObstacle } from 'src/app/Services/obstacles.service';

@Component({
  selector: 'app-dynamic-obstacle',
  templateUrl: './dynamic-obstacle.component.html',
  styleUrls: ['./dynamic-obstacle.component.scss']
})
export class DynamicObstacleComponent implements OnInit {
  @Input() dynamicObstacle: IDynamicObstacle;
  @ViewChild('obstacle', { static: true }) obstacleRef: ElementRef<HTMLDivElement>;


  constructor(public os: ObstaclesService) { }

  ngOnInit() {
    this.initObstacle();
  }

  initObstacle() {
    this.obstacleRef.nativeElement.style.width = this.os.convertToPercentage(this.dynamicObstacle.w, 'x');
    this.obstacleRef.nativeElement.style.height = this.os.convertToPercentage(this.dynamicObstacle.h, 'y');
    this.obstacleRef.nativeElement.style.top = this.os.convertToPercentage(this.dynamicObstacle.y, 'y');
    this.obstacleRef.nativeElement.style.left = this.os.convertToPercentage(this.dynamicObstacle.x, 'x');
    this.obstacleRef.nativeElement.style.borderRight = `${this.os.convertToPx(this.dynamicObstacle.dzh)} solid #ccc`;
    this.obstacleRef.nativeElement.style.borderLeft = `${this.os.convertToPx(this.dynamicObstacle.dzh)} solid #ccc`;
    this.obstacleRef.nativeElement.style.borderBottom = `${this.os.convertToPx(this.dynamicObstacle.dzw)} solid #ccc`;
    this.obstacleRef.nativeElement.style.borderTop = `${this.os.convertToPx(this.dynamicObstacle.dzw)} solid #ccc`;
  }


}
