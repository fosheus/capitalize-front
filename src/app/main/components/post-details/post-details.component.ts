import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import { PostFile } from 'src/app/core/models/post-file.model';
import { Post } from 'src/app/core/models/post.model';
import { User } from 'src/app/core/models/user.model';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { FileService } from 'src/app/core/services/file/file.service';
import { PostService } from 'src/app/core/services/post/post.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit {

  public state: string;
  private postId: number;
  public post: Post;
  public me: User;


  postForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    tags: new FormArray([], [Validators.required]),
    description: new FormControl('', [Validators.required]),
    files: new FormArray([])
  });

  get files() {
    return this.postForm.controls['files'];
  }

  addTabForm = new FormGroup({
    tabName: new FormControl('', [Validators.required]),
    tabType: new FormControl('', [Validators.required])
  })

  constructor(private router: Router, private postService: PostService, private route: ActivatedRoute, private fileService: FileService, private authService: AuthenticationService) { }

  ngOnInit(): void {
    const state = this.route.snapshot.url;
    this.checkState(state);
    this.loadOrExit();
  }

  private checkState(state: UrlSegment[]) {
    if (state.length > 1 && state[1].path === 'create') {
      this.state = PostDetailsComponentState.CREATE;
    } else if (state.length > 2 && state[1].path === 'edit') {
      this.state = PostDetailsComponentState.EDIT;
      this.postId = Number.parseInt(state[2].path, 10);
    } else {
      this.postId = NaN;
    }
  }

  private loadOrExit() {
    if (isNaN(this.postId)) {
      this.router.navigateByUrl('/home');
    } else if (this.state === 'EDIT') {
      this.loadPost();
      this.authService.getUser().then(user => this.me = user);
    } else if (this.state === 'CREATE') {
      this.authService.getUser().then(user => this.me = user);
    }
  }

  private loadPost() {
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

  addFileTab() {
    if (this.addTabForm.valid) {
      const file: PostFile = new PostFile();
      file.path = this.addTabForm.controls['tabName'].value;
      file.type = this.addTabForm.controls['tabType'].value;
      this.postForm.controls['files'].value.push(file);
      console.log(file);
    } else {
      console.log("non valid");
    }

  }


  public return() {
    this.router.navigateByUrl('/home');
  }


  public savePost() {

  }

  public validatePost() {
    this.postService.validate(this.postId).subscribe(post => this.post = post);
  }


  public deletePost() {

  }


}

enum PostDetailsComponentState {
  CREATE = 'CREATE', EDIT = 'EDIT'
}
