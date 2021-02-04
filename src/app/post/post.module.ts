import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostRoutingModule } from './post-routing.module';
import { PostDetailsComponent } from './components/post-details/post-details.component';
import { PostConsultComponent } from './components/post-consult/post-consult.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [PostDetailsComponent, PostConsultComponent],
  imports: [
    CommonModule,
    PostRoutingModule,
    SharedModule
  ]
})
export class PostModule { }
