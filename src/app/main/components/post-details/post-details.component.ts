import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { PostFile } from 'src/app/core/models/post-file.model';
import { PostTag } from 'src/app/core/models/post-tag.model';
import { Post } from 'src/app/core/models/post.model';
import { User } from 'src/app/core/models/user.model';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { FileService } from 'src/app/core/services/file/file.service';
import { ModalService } from 'src/app/core/services/modal/modal.service';
import { PostService } from 'src/app/core/services/post/post.service';
import { AddFileDialog } from '../../dialogs/add-file-dialog/add-file.dialog';
import { DeleteFileDialog } from '../../dialogs/delete-file-dialog/delete-file.dialog';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit {

  private forbiddenCharactersFilename = ['/', '\\'];
  private forbiddenCharactersPath = ['<', '>', ':', '"', '\'', '|', '`', '?', '*', '..'];


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

  get files(): FormArray {
    return this.postForm.get('files') as FormArray;
  }

  get tags(): FormArray {
    return this.postForm.get('tags') as FormArray;
  }

  addTabForm = new FormGroup({
    tabName: new FormControl('', [Validators.required]),
    tabType: new FormControl('', [Validators.required])
  })

  constructor(
    private router: Router,
    private postService: PostService,
    private route: ActivatedRoute,
    private fileService: FileService,
    private authService: AuthenticationService,
    private dialog: MatDialog,
    private modalService: ModalService
  ) { }

  ngOnInit(): void {
    const state = this.route.snapshot.url;
    this.checkState(state);
    this.loadOrExit();
  }

  private checkState(state: UrlSegment[]): void {
    if (state.length > 1 && state[1].path === 'create') {
      this.state = PostDetailsComponentState.CREATE;
    } else if (state.length > 2 && state[1].path === 'edit') {
      this.state = PostDetailsComponentState.EDIT;
      this.postId = Number.parseInt(state[2].path, 10);
    } else {
      this.postId = NaN;
    }
  }


  private loadOrExit(): void {
    if (this.postId === NaN) {
      this.router.navigateByUrl('/home');
    } else if (this.state === 'EDIT') {
      this.loadPost();
      this.authService.getUser().then(user => this.me = user);
    } else if (this.state === 'CREATE') {
      this.authService.getUser().then(user => this.me = user);
    }
  }

  private loadPost(): void {
    this.postService.getOne(this.postId).subscribe(post => {
      this.postForm = new FormGroup({
        id: new FormControl(Number(post.id), [Validators.required]),
        title: new FormControl(post.title, [Validators.required]),
        tags: new FormArray(post.tags.map(t => this.mapTagToFormGroup(t))),
        description: new FormControl(post.description, [Validators.required]),
        files: new FormArray(post.files.map(f => {
          f.modified = false;
          return this.mapFileToFormGroup(f)
        })),
      });

      for (let i in post.files) {
        post.files[i].modified = false;
        if (post.files[i].type === 'TEXT') {
          this.fileService.getOne(post.files[i].id)
            .subscribe(content => {
              post.files[i].text = content.data;
              this.patchFileText(i, content.data);
            });
        }
      };
      this.post = post;
    });
  }

  private patchFileText(index: string, text: string) {
    this.postForm.get(`files.${index}.text`)?.patchValue(text);
  }

  private mapFileToFormGroup(file: PostFile) {
    return new FormGroup({
      id: new FormControl(file.id),
      text: new FormControl(file.text),
      path: new FormControl(file.path),
      name: new FormControl(file.name),
      type: new FormControl(file.type),
      binary: new FormControl(file.binary),
      modified: new FormControl(file.modified),
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
      if (this.addTabForm.get('tabType')?.value === 'OTHER') {
        const dialogRef = this.dialog.open(AddFileDialog, {
          width: '500px'
        });
        dialogRef.afterClosed().subscribe((file) => {
          this.addFile(file.name, 'OTHER', file);
        });
      } else {
        this.addFile(this.addTabForm.controls['tabName'].value, this.addTabForm.controls['tabType'].value, undefined);
      }

    }
  }
  addFile(name: string, type: string, binary: File | undefined) {
    if (this.files.value.find((file: PostFile) => file.path === name) !== undefined) {
      this.modalService.alert('', 'identifiant non unique', 'Il existe déjà un fichier avec le chemin : ' + name + '.', 'OK');
      return;
    }
    if (this.forbiddenCharactersPath.find(elem => name.includes(elem)) !== undefined) {
      this.modalService.alert('', 'Chemin de fichier incorrect', 'Le chemin du fichier ne peux pas comporter les caractères suivants : ' + this.forbiddenCharactersPath.join(' '), 'OK');
      return;
    }

    const file: PostFile = new PostFile();
    file.path = name;
    file.type = type;
    file.name = file.path.split('/').slice(-1)[0];
    file.text = '';
    file.modified = true;
    file.binary = binary;
    this.files.push(this.mapFileToFormGroup(file));

  }

  tabTypeClick(type: string) {
    this.addTabForm.get('tabName')?.clearValidators();
    if (type === 'TEXT') {
      this.addTabForm.get('tabName')?.setValidators(Validators.required);
    }
    this.addTabForm.get('tabName')?.updateValueAndValidity({ onlySelf: false });
  }

  deleteFile(index: number) {
    const file = this.files.at(index).value;
    const dialogRef = this.dialog.open(DeleteFileDialog, {
      width: '400px',
      data: { filename: file.path }
    });

    dialogRef.afterClosed().subscribe((value) => {
      if (value) {
        const file = this.files.at(index).value;
        file.deleted = true;
        this.files.at(index).setValue(file);
      }
    });
  }

  fileContentChanged(index: number) {
    const file = this.files.at(index).value;
    file.modified = true;
    this.files.at(index).setValue(file);
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


  public return() {
    this.router.navigateByUrl('/home');
  }


  public savePost() {

    if (!this.postForm.valid) {
      this.modalService.info('500px', 'Le formulaire n\'est pas valide', 'Veillez verifier que toutes les informations requises sont saisie', 'OK');
      return;
    }
    if (this.tags.length === 0) {
      this.modalService.info('500px', 'Le formulaire n\'est pas valide', 'Vous devez saisir au moins un tag', 'OK');
      return;
    }
    const postToSave: Post = Object.assign({}, this.postForm.value);
    postToSave.files = [];

    let subscription: Observable<Post>;
    if (this.state === 'CREATE') {
      subscription = this.postService.create(postToSave)
    } else {
      subscription = this.postService.update(postToSave);
    }
    subscription.subscribe(post => {
      const postWithFiles: Post = Object.assign({}, this.postForm.value);

      // map files to observables

      const deletedFiled = postWithFiles.files.filter(f => f.deleted && f.id);
      const updatedFiles = postWithFiles.files.filter(f => f.modified && f.id && !f.deleted);
      const createdFiles = postWithFiles.files.filter(f => f.modified && !f.id && !f.deleted);
      const deleteFilesObservables = deletedFiled.map(f => this.postService.deleteFile(post.id, f.id)); //files that existed and are deleted
      const updateFilesObservables = updatedFiles.map(f => this.postService.updateFile(post.id, f)); // files that existed and are modified and not deleted
      const createFilesObservables = createdFiles.map(f => this.postService.createFile(post.id, f)); // files that are created

      forkJoin(deleteFilesObservables).subscribe(() => forkJoin([updateFilesObservables, createFilesObservables]).subscribe(

      ));

      this.router.navigateByUrl('post/edit/' + post.id)
    });

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
