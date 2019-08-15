import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MaterialModule } from './Material/material.module';


@NgModule({
  declarations: [],
  imports: [
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
  ]
})
export class SharedModule { }
