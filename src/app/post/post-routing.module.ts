import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostConsultComponent } from './components/post-consult/post-consult.component';
import { PostDetailsComponent } from './components/post-details/post-details.component';

const routes: Routes = [
  { path: 'post/create', component: PostDetailsComponent },
  { path: 'post/edit/:id', component: PostDetailsComponent },
  { path: 'post/:id', component: PostConsultComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostRoutingModule { }
