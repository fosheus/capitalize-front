import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './components/main/main.component';
import { HomeComponent } from './components/home/home.component';
import { SharedModule } from '../shared/shared.module';
import { PostModule } from '../post/post.module';
import { PostResumeComponent } from './components/post-resume/post-resume.component';
import { PostListComponent } from './components/post-resume-list/post-resume-list.component';
import { PostConsultComponent } from './components/post-consult/post-consult.component';
import { PostDetailsComponent } from './components/post-details/post-details.component';
import { AddFileDialog } from './dialogs/add-file-dialog/add-file.dialog';
import { GenericDialog } from './dialogs/generic-dialog/generic.dialog';
import { DeleteFileDialog } from './dialogs/delete-file-dialog/delete-file.dialog';
import { SpinnerDialog } from './dialogs/spinner-dialog/spinner.dialog';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ValidatePostsComponent } from './components/validate-posts/validate-posts.component';
import { ManageUsersComponent } from './components/manage-users/manage-users.component';
import { MarkdownModule } from 'ngx-markdown';


@NgModule({
  declarations: [MainComponent,
    HomeComponent,
    PostResumeComponent,
    PostListComponent,
    PostDetailsComponent,
    PostConsultComponent,
    AddFileDialog,
    GenericDialog,
    DeleteFileDialog,
    SpinnerDialog,
    NavbarComponent,
    ValidatePostsComponent,
    ManageUsersComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    SharedModule,
    PostModule,
    MarkdownModule.forChild()
  ]
})
export class MainModule { }
