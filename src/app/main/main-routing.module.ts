import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthenticatedGuard } from '../core/guards/authenticated/authenticated.guard';
import { PostConsultComponent } from './components/post-consult/post-consult.component';
import { HomeComponent } from './components/home/home.component';
import { MainComponent } from './components/main/main.component';
import { PostDetailsComponent } from './components/post-details/post-details.component';
import { ValidatePostsComponent } from './components/validate-posts/validate-posts.component';
import { ManageUsersComponent } from './components/manage-users/manage-users.component';

const routes: Routes = [
  {
    path: '', component: MainComponent, canActivate: [AuthenticatedGuard], children: [
      { path: 'home', component: HomeComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'post/create', component: PostDetailsComponent },
      { path: 'post/edit/:id', component: PostDetailsComponent },
      { path: 'post/:id', component: PostConsultComponent },
      { path: 'validate-posts', component: ValidatePostsComponent },
      { path: 'users', component: ManageUsersComponent }
    ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
