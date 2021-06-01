import { A, COMMA, ENTER } from '@angular/cdk/keycodes';
import { ElementRef, NgZone } from '@angular/core';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router, UrlSegment } from '@angular/router';
import { forkJoin, Observable, of } from 'rxjs';
import { defaultIfEmpty } from 'rxjs/internal/operators/defaultIfEmpty';
import { tap } from 'rxjs/operators';
import { PostFile } from 'src/app/core/models/post-file.model';
import { PostTag } from 'src/app/core/models/post-tag.model';
import { Post } from 'src/app/core/models/post.model';
import { User } from 'src/app/core/models/user.model';
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
import { FileService } from 'src/app/core/services/file/file.service';
import { ModalService } from 'src/app/core/services/modal/modal.service';
import { PostTagService } from 'src/app/core/services/post-tag/post-tag.service';
import { PostService } from 'src/app/core/services/post/post.service';
import { AddFileDialog } from '../../dialogs/add-file-dialog/add-file.dialog';
import { DeleteFileDialog } from '../../dialogs/delete-file-dialog/delete-file.dialog';
import { SpinnerDialog } from '../../dialogs/spinner-dialog/spinner.dialog';

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

  public selectedTab = 0;

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
  get serviceTag(): PostTagService {
    return this.tagService;
  }
  public TAG_LIMIT = 5;

  addTabForm = new FormGroup({
    tabName: new FormControl('', [Validators.required]),
    tabType: new FormControl('', [Validators.required])
  });

  constructor(
    private router: Router,
    private postService: PostService,
    private route: ActivatedRoute,
    private fileService: FileService,
    private authService: AuthenticationService,
    private dialog: MatDialog,
    private modalService: ModalService,
    private tagService: PostTagService) { }

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

      this.sortFiles();

      for (let i in this.files.value) {
        if (this.files.value[i].type === 'TEXT') {
          this.fileService.getOne(this.files.value[i].id)
            .subscribe(content => {
              this.patchFileText(i, content.data);
            });
        }
      }
      this.post = post;
    });
  }

  private sortFiles() {
    const tmpFilesToSort = this.files.value as any[];
    this.files.patchValue(tmpFilesToSort.sort((a, b) => a.path.localeCompare(b.path)));
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
      this.modalService.alert('', 'Identifiant non unique', 'Il existe déjà un fichier avec le chemin : ' + name + '.', 'OK');
      return;
    }

    if (!this.checkPathIsNotADirectaoryOrFilename(name)) {
      this.modalService.alert('', 'Nom de fichier identique à nom de dossier', 'Le chemin \"' + name + '\" existe déjà comme nom de dossier ou contient un nom de fichier existant', 'OK');
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

    this.sortFiles();

  }

  checkPathIsNotADirectaoryOrFilename(path: string): boolean {
    const pathsFromName = this.fileService.pathsFromFullPath(path);

    for (const file of this.files.value) {
      const pathsFromCurrentFileName = this.fileService.pathsFromFullPath(file.path);
      let long: string[];
      let short: string[];
      if (pathsFromCurrentFileName.length > pathsFromName.length) {
        long = pathsFromCurrentFileName;
        short = pathsFromName;
      } else {
        long = pathsFromName;
        short = pathsFromCurrentFileName;
      }
      let index: any = 0;
      for (index in short) {
        console.log(short[index], long[index]);
        if (short[index] !== long[index]) {
          index = -1
          break;
        }
      }
      if (index !== -1) {
        return false;
      }
    }
    return true;
  }

  displaySelectedFile(event: string) {
    const index = this.files.controls.filter(c => c.value.type === 'TEXT').findIndex(c => c.value.path === event);
    if (index === -1) {
      return;
    }

    this.selectedTab = index;
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
        if (file.id) {
          file.deleted = true;
          this.files.at(index).setValue(file);
        } else {
          this.files.removeAt(index);
        }
      }
    });
  }

  fileContentChanged(index: number) {
    const file = this.files.at(index).value;
    file.modified = true;
    delete file.paths;
    this.files.at(index).setValue(file);
  }

  removeTag(event: number) {
    this.tags.removeAt(event);
  }

  addTag(event: string) {
    if (event) {
      let tag = new PostTag();
      tag.label = event;
      this.tags.push(this.mapTagToFormGroup(tag));
    }
  }

  public goBackHome() {
    this.router.navigateByUrl('/home');
  }


  public async savePost() {

    if (!this.postForm.valid) {
      this.modalService.info('500px', 'Le formulaire n\'est pas valide', 'Veillez verifier que toutes les informations requises sont saisie', 'OK');
      return;
    }
    if (this.tags.length === 0) {
      this.modalService.info('500px', 'Le formulaire n\'est pas valide', 'Vous devez saisir au moins un tag', 'OK');
      return;
    }
    const postToSave: Post = Object.assign({}, this.postForm.value);

    let subscription: Observable<Post>;
    if (this.state === 'CREATE') {
      subscription = this.postService.create(postToSave)
    } else {
      subscription = this.postService.update(postToSave);
    }
    let dialogRef: MatDialogRef<SpinnerDialog> = this.dialog.open(SpinnerDialog, {
      panelClass: 'transparent',
      disableClose: true
    });

    try {
      const postSaved = await subscription.toPromise();
      const postWithFiles: Post = Object.assign({}, this.postForm.value);

      // map files to observables

      const deletedFiled = postWithFiles.files.filter(f => f.deleted && f.id);
      const updatedFiles = postWithFiles.files.filter(f => f.modified && f.id && !f.deleted);
      const createdFiles = postWithFiles.files.filter(f => f.modified && !f.id && !f.deleted);
      const deleteFilesObservables = deletedFiled.map(f => this.postService.deleteFile(postSaved.id, f.id)); //files that existed and are deleted
      const updateFilesObservables = updatedFiles.map(f => this.postService.updateFile(postSaved.id, f)); // files that existed and are modified and not deleted
      const createFilesObservables = createdFiles.map(f => this.postService.createFile(postSaved.id, f)); // files that are created

      await forkJoin(deleteFilesObservables).pipe(defaultIfEmpty()).toPromise();
      await forkJoin([...updateFilesObservables, ...createFilesObservables]).pipe(defaultIfEmpty()).toPromise();
      if (this.state === 'CREATE') {
        this.router.navigateByUrl('/post/edit/' + postSaved.id);
      } else {
        this.loadPost();
      }

    } finally {
      dialogRef.close();
    }

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
