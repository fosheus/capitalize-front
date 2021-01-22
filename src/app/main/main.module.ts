import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './components/main/main.component';
import { HomeComponent } from './components/home/home.component';
import { SharedModule } from '../shared/shared.module';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { PostSummaryComponent } from './components/post-summary/post-summary.component';


@NgModule({
  declarations: [MainComponent, HomeComponent, PostDetailComponent, PostSummaryComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    SharedModule
  ]
})
export class MainModule { }
