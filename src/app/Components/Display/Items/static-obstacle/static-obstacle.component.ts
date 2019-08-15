import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { IStaticObstacle } from '../../display.component';
import { ObstaclesService } from 'src/app/Services/obstacles.service';

@Component({
  selector: 'app-static-obstacle',
  templateUrl: './static-obstacle.component.html',
  styleUrls: ['./static-obstacle.component.scss']
})
export class StaticObstacleComponent implements OnInit {
  @Input() staticObstacle: IStaticObstacle;
  @ViewChild('obstacle', { static: true }) obstacleRef: ElementRef<HTMLDivElement>;


  constructor(public os: ObstaclesService) { }

  ngOnInit() {
    this.initObstacle();
  }

  initObstacle() {
    this.obstacleRef.nativeElement.style.width = this.os.convertToPercentage(this.staticObstacle.w, 'x');
    this.obstacleRef.nativeElement.style.height = this.os.convertToPercentage(this.staticObstacle.h, 'y');
    this.obstacleRef.nativeElement.style.top = this.os.convertToPercentage(this.staticObstacle.y, 'y');
    this.obstacleRef.nativeElement.style.left = this.os.convertToPercentage(this.staticObstacle.x, 'x');
    this.obstacleRef.nativeElement.style.borderRight = `${this.os.convertToPercentage(this.staticObstacle.dzh, 'y')} solid #eee`;
    this.obstacleRef.nativeElement.style.borderLeft = `${this.os.convertToPercentage(this.staticObstacle.dzh, 'y')} solid #eee`;
    this.obstacleRef.nativeElement.style.borderBottom = `${this.os.convertToPercentage(this.staticObstacle.dzw, 'y')} solid #eee`;
    this.obstacleRef.nativeElement.style.borderTop = `${this.os.convertToPercentage(this.staticObstacle.dzw, 'x')} solid #eee`;
  }



}
