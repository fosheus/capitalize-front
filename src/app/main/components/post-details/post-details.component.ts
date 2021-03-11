import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import { PostFile } from 'src/app/core/models/post-file.model';
import { PostTag } from 'src/app/core/models/post-tag.model';
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
  public post: Post;
  private postId: number;

  public me: User;



  public postForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    tags: new FormArray([], [Validators.required]),
    description: new FormControl('', [Validators.required]),
    files: new FormArray([])
  });

  get files() {
    return this.postForm.get('files') as FormArray;
  }

  get tags() {
    return this.postForm.get('tags') as FormArray;
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
    this.postService.getOne(this.postId).subscribe(post => {
      this.postForm = new FormGroup({
        title: new FormControl(post.title, [Validators.required]),
        tags: new FormArray(post.tags.map(t => this.mapTagToFormGroup(t))),
        description: new FormControl(post.description, [Validators.required]),
        files: new FormArray(post.files.map(f => this.mapFileToFormGroup(f))),
      });

      for (let i in post.files) {
        if (post.files[i].type === 'TEXT') {
          this.fileService.getOne(post.files[i].id)
            .subscribe(content => {
              post.files[i].content = content.data;
              this.patchFileContent(i, content.data);
              console.log(this.postForm.get(`files.${i}.content`));
            });
        }
      };
      this.post = post;
    });
  }

  private patchFileContent(index: string, content: string) {
    this.postForm.get(`files.${index}.content`)?.patchValue(content);
  }

  private mapFileToFormGroup(file: PostFile) {
    return new FormGroup({
      id: new FormControl(file.id),
      content: new FormControl(file.content),
      path: new FormControl(file.path),
      name: new FormControl(file.name),
      type: new FormControl(file.type),
      binary: new FormControl()
    });
  }
  private mapTagToFormGroup(tag: PostTag) {
    return new FormGroup({
      id: new FormControl(tag.id),
      type: new FormControl(tag.type),
      label: new FormControl(tag.label, [Validators.required])
    })
  }

  addFileTab() {
    if (this.addTabForm.valid) {
      if (this.files.value) {
      }
      const file: PostFile = new PostFile();
      file.path = this.addTabForm.controls['tabName'].value;
      file.type = this.addTabForm.controls['tabType'].value;
      file.name = file.path.split('/').slice(-1)[0];
      file.content = '';
      this.files.push(this.mapFileToFormGroup(file));
    }
  }

  deleteTag(index: number) {
    this.tags.removeAt(index);
  }

  addTag(event: MatChipInputEvent) {
    if (event.value) {
      let tag = new PostTag();
      tag.label = event.value;
      this.tags.push(this.mapTagToFormGroup(tag));
    }
    if (event.input) {
      event.input.value = '';
    }
  }



  handleFileInput(files: FileList, index: number) {
    const fileToUpload = files.item(0);
    this.files.get(`${index}.binary`)?.patchValue(fileToUpload);
  }


  public return() {
    this.router.navigateByUrl('/home');
  }


  public savePost() {

    const postToSave: Post = Object.assign({}, this.postForm.value);
    for (const index in postToSave.files) {
      postToSave.files[index].content = '';
      postToSave.files[index].binary = new File([], '');
    }
    if (this.state === 'CREATE') {
      this.postService.create(postToSave);
    } else {
      this.postService.update(postToSave);
    }

    console.log(postToSave);
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
