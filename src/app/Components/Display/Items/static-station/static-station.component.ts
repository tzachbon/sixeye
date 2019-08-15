import { Component, OnInit, ElementRef, ViewChild, Input } from '@angular/core';
import { IStaticStation } from '../../display.component';
import { ObstaclesService } from 'src/app/Services/obstacles.service';

@Component({
  selector: 'app-static-station',
  templateUrl: './static-station.component.html',
  styleUrls: ['./static-station.component.scss']
})
export class StaticStationComponent implements OnInit {
  @Input() staticStation: IStaticStation;
  @ViewChild('station', { static: true }) stationRef: ElementRef<HTMLDivElement>;

  constructor(public os: ObstaclesService) { }

  ngOnInit() {
    this.initStation();
  }

  initStation() {
    this.stationRef.nativeElement.style.width = this.os.convertToPercentage(this.staticStation.w, 'x');
    this.stationRef.nativeElement.style.height = this.os.convertToPercentage(this.staticStation.h, 'y');
    this.stationRef.nativeElement.style.top = this.os.convertToPercentage(this.staticStation.y, 'y');
    this.stationRef.nativeElement.style.left = this.os.convertToPercentage(this.staticStation.x, 'x');

  }

}
