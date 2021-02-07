import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/core/models/post.model';
import { FileService } from 'src/app/core/services/file/file.service';
import { PostService } from 'src/app/core/services/post/post.service';
import { PostFile } from 'src/app/core/models/post-file.model';
import * as FileSaver from 'file-saver';
import { User } from 'src/app/core/models/user.model';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';

@Component({
  selector: 'app-post-consult',
  templateUrl: './post-consult.component.html',
  styleUrls: ['./post-consult.component.scss']
})
export class PostConsultComponent implements OnInit {

  public post: Post;
  private postId: number;
  public me: User;


  constructor(private router: Router, private postService: PostService, private fileService: FileService, private route: ActivatedRoute, private authService: AuthenticationService) { }

  ngOnInit(): void {


    const postIdStr = this.route.snapshot.paramMap.get('id');
    if (!postIdStr) {
      this.router.navigateByUrl('/home');
    } else {
      this.postId = Number.parseInt(postIdStr);
      if (isNaN(this.postId)) {
        this.router.navigateByUrl('/home');
      } else {
        this.loadPost();
        this.authService.getUser().then(user => this.me = user);
      }
    }
  }

  loadPost() {
    this.postService.getOne(this.postId).subscribe(async post => {
      this.post = post;
      if (this.post.files) {
        this.post.files.forEach(file => {
          if (file.type === 'TEXT') {
            this.fileService.getOne(file.id)
              .subscribe(content => file.content = content.data);
          }
        });
      }
    });
  }


  public downloadFile(file: PostFile) {
    this.fileService.getOneBinary(file.id as number).subscribe(data => {
      const blob = new Blob([data]);
      const url = window.URL.createObjectURL(blob);
      FileSaver.saveAs(blob, file.name)

    });
  }

  public return() {
    this.router.navigateByUrl('/home');
  }

  public editPost() {

  }

  public validatePost() {
    this.postService.validate(this.postId).subscribe(post => this.post = post);
  }

  public deletePost() {

  }



}
