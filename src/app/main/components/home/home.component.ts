import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { PostTag } from 'src/app/core/models/post-tag.model';
import { Post } from 'src/app/core/models/post.model';
import { User } from 'src/app/core/models/user.model';
import { PostTagService } from 'src/app/core/services/post-tag/post-tag.service';
import { PostService } from 'src/app/core/services/post/post.service';
import { UserService } from 'src/app/core/services/user/user.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { tap } from 'rxjs/operators';
import { PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public pageSizeOptions: number[] = [5, 10, 25];
  public pageSize = 10;
  public length = 0;
  public pageEvent: PageEvent;


  private USER_LIMIT = 5;
  public TAG_LIMIT = 5;
  private timeoutSearch: any;

  public posts: Post[];

  public autoCompleteOwnerOptions: Observable<string[]> = of([]);

  public searchForm = this.fb.group({
    tags: this.fb.array([]),
    owner: this.fb.control('')
  });

  public get tagsControl(): FormArray {
    return this.searchForm.get('tags') as FormArray;
  }

  public get ownerControl(): FormControl {
    return this.searchForm.get('owner') as FormControl;
  }
  get serviceTag(): PostTagService {
    return this.tagService;
  }

  constructor(private postService: PostService, private userService: UserService, private tagService: PostTagService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.searchPosts([], '', 0, 10);
    this.ownerControl.valueChanges.pipe(tap((value) => {
      clearTimeout(this.timeoutSearch);
      this.timeoutSearch = setTimeout(() => {
        this.autoCompleteOwnerOptions = value !== null && value !== undefined && value.length > 1 ? this.userService.getItemsLike(value, this.USER_LIMIT) : of([])
      }, 500);
    })).subscribe();
  }

  addPost(): void {
    this.router.navigateByUrl('/post/create');
  }

  searchPosts(tags: string[], owner: string, pageIndex: number, pageSize: number) {
    this.postService.getAllByCriteria(tags, owner, pageIndex, pageSize).subscribe(postPage => {
      this.posts = postPage.content
      this.length = postPage.totalElements;
    });

  }

  onSubmit() {
    let pageIndex = 0;
    let pageSize = 10;
    if (this.pageEvent) {
      pageIndex = this.pageEvent.pageIndex;
      pageSize = this.pageEvent.pageSize;
    }
    this.searchPosts(this.tagsControl.value, this.ownerControl.value, 0, 10);
  }

  removeTag(event: number) {
    this.tagsControl.removeAt(event);
  }

  addTag(event: string) {
    if (event) {
      this.tagsControl.push(this.fb.control(event));
    }
  }

  pageChanged(event: PageEvent) {
    this.pageEvent = event;
    this.searchPosts(this.tagsControl.value, this.ownerControl.value, event.pageIndex, event.pageSize);
  }

}
