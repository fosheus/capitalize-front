import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostDetailsComponent } from './components/post-details/post-details.component';

const routes: Routes = [
  { path: 'post/create', component: PostDetailsComponent },
  { path: 'post/edit/:id', component: PostDetailsComponent },
  { path: 'post/:id', component: PostDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostRoutingModule { }
