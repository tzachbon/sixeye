import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { IExtraShape } from '../../display.component';
import { ObstaclesService } from '../../../../Services/obstacles.service';

@Component({
  selector: 'app-extra-shape',
  templateUrl: './extra-shape.component.html',
  styleUrls: ['./extra-shape.component.scss']
})
export class ExtraShapeComponent implements OnInit {
  @Input() extraShape: IExtraShape;
  @ViewChild('extraShape', { static: true }) extraShapeRef: ElementRef<HTMLDivElement>;

  constructor(public os: ObstaclesService) { }

  ngOnInit() {
    this.initExtraShape();
  }

  initExtraShape() {
    this.extraShapeRef.nativeElement.style.backgroundColor = this.extraShape.color;
    this.extraShapeRef.nativeElement.style.clipPath = this.os.getPolygonClipPathString(this.extraShape.polygon);

  }




}
