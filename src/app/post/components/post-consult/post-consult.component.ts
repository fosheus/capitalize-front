import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/core/models/post.model';
import { FileService } from 'src/app/core/services/file/file.service';
import { PostService } from 'src/app/core/services/post/post.service';
import { PostFile } from 'src/app/core/models/post-file.model';

@Component({
  selector: 'app-post-consult',
  templateUrl: './post-consult.component.html',
  styleUrls: ['./post-consult.component.scss']
})
export class PostConsultComponent implements OnInit {

  public post: Post;
  private postId: number;

  constructor(private router: Router, private postService: PostService, private fileService: FileService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    const postIdStr = this.route.snapshot.paramMap.get('id');
    console.log(postIdStr);
    if (!postIdStr) {
      this.router.navigateByUrl('/home');
    } else {
      this.postId = Number.parseInt(postIdStr);
      if (isNaN(this.postId)) {
        this.router.navigateByUrl('/home');
      } else {
        this.loadPost();
      }

    }
  }

  loadPost() {
    console.log("coucou");
    this.postService.getOne(this.postId).subscribe(async post => {
      this.post = post;
      if (this.post.files) {
        this.post.files = await Promise.all(this.post.files.map(async f => {
          if (f.type === 'TEXT') {
            const content = await this.fileService.getOneAsync(f.id as number);
            f.content = content;
          }
          return f;
        }));
      }
    });
  }

  public downloadFile(file: PostFile) {
    this.fileService.getOneBinary(file.id as number).subscribe(data => {
      const blob = new Blob([data]);
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    });
  }



}
