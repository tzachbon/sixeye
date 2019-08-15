import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisplayRoutingModule } from './display.routing';
import { DisplayComponent } from './display.component';
import { SharedModule } from '../Shared/shared.module';
import { StaticObstacleComponent } from './Items/static-obstacle/static-obstacle.component';
import { StaticStationComponent } from './Items/static-station/static-station.component';
import { ExtraShapeComponent } from './Items/extra-shape/extra-shape.component';
import { DynamicObstacleComponent } from './Items/dynamic-obstacle/dynamic-obstacle.component';

@NgModule({
  declarations: [
    DisplayComponent,
    StaticObstacleComponent,
    StaticStationComponent,
    ExtraShapeComponent,
    DynamicObstacleComponent
  ],
  imports: [
    CommonModule,
    DisplayRoutingModule,
    SharedModule,
  ], exports: [
    DisplayComponent,
    StaticObstacleComponent,
    StaticStationComponent,
    ExtraShapeComponent

  ],
  providers: [
  ]
})
export class DisplayModule { }
