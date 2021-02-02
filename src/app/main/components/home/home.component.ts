import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/core/models/post.model';
import { PostService } from 'src/app/core/services/post/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  public posts: Post[];

  constructor(private postService: PostService, private router: Router) { }

  ngOnInit(): void {
    this.postService.getAllByCriteria([], '', 0).subscribe(posts => this.posts = posts);
  }

  addPost() {
    this.router.navigateByUrl('/post/create');
  }
}
