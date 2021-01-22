import { Component, Input, OnInit } from '@angular/core';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-post-summary',
  templateUrl: './post-summary.component.html',
  styleUrls: ['./post-summary.component.scss']
})
export class PostSummaryComponent implements OnInit {

  @Input()
  private post: Post;

  constructor() { }

  ngOnInit(): void {
  }

}
