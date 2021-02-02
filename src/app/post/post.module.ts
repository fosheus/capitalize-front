import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostRoutingModule } from './post-routing.module';
import { PostDetailsComponent } from './components/post-details/post-details.component';



@NgModule({
  declarations: [PostDetailsComponent],
  imports: [
    CommonModule,
    PostRoutingModule
  ]
})
export class PostModule { }
