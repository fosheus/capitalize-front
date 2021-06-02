import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from '../../../core/models/post.model';

@Component({
    selector: 'app-post-resume-list',
    templateUrl: './post-resume-list.component.html',
    styleUrls: ['./post-resume-list.component.scss']
})
export class PostListComponent implements OnInit {

    @Input() public posts: Post[] = [];

    constructor(private router: Router) { }

    ngOnInit(): void {
    }

    onClickPost(post: Post): void {
        this.router.navigateByUrl('post/' + post.id);
    }

}
