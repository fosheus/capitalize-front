import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/core/models/post.model';
import { PostService } from 'src/app/core/services/post/post.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.scss']
})
export class PostDetailsComponent implements OnInit {

  private state: string;
  private postId: number;
  private post: Post;

  constructor(private router: Router, private postService: PostService, private route: ActivatedRoute/*, private userService: UserService*/) { }

  ngOnInit(): void {
    const state = this.route.snapshot.url;
    if (state.length > 1 && state[1].path === 'create') {
      this.state = PostDetailsComponentState.CREATE;
    } else if (state.length > 2 && state[1].path === 'edit') {
      this.state = PostDetailsComponentState.EDIT;
      this.postId = Number.parseInt(state[2].path, 10);

    } else if (state.length > 1) {
      this.state = PostDetailsComponentState.CONSULT;
      this.postId = Number.parseInt(state[1].path, 10);
    } else {
      this.postId = NaN;
    }

    if (isNaN(this.postId)) {
      this.router.navigateByUrl('home');
    } else if (this.state !== 'CREATE') {
      this.postService.getOne(this.postId).subscribe(post => this.post = post);
    }

  }

}

enum PostDetailsComponentState {
  CREATE = 'CREATE', EDIT = 'EDIT', CONSULT = 'CONSULT'
}
