import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './components/main/main.component';
import { HomeComponent } from './components/home/home.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [MainComponent, HomeComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    SharedModule
  ]
})
export class MainModule { }
