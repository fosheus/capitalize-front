import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../../../core/models/post.model';
import { PostTag } from '../../../core/models/post-tag.model';


@Component({
  selector: 'app-post-resume',
  templateUrl: './post-resume.component.html',
  styleUrls: ['./post-resume.component.scss']
})
export class PostResumeComponent implements OnInit {

  @Input() public post: Post;

  constructor() { }

  ngOnInit(): void {

  }

}
