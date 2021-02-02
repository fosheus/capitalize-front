import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './components/main/main.component';
import { HomeComponent } from './components/home/home.component';
import { SharedModule } from '../shared/shared.module';
import { PostModule } from '../post/post.module';
import { PostResumeComponent } from './components/post-resume/post-resume.component';
import { PostResumeListComponent } from './components/post-resume-list/post-resume-list.component';


@NgModule({
  declarations: [MainComponent, HomeComponent, PostResumeComponent, PostResumeListComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    SharedModule,
    PostModule
  ]
})
export class MainModule { }
