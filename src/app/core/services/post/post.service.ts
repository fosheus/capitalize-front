import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/auth/models/user.model';
import { Post } from 'src/app/core/models/post.model';
import { environment } from 'src/environments/environment';
import { CheckValueService } from '../check-value/check-value.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private SIZE: number = 10;

  constructor(private http: HttpClient, private checkValueService: CheckValueService) {

  }

  getAllByCriteria(tags: string[], owner: string, page: number) {
    let params = new HttpParams();
    params = this.checkValueService.hasNumberValue(page) ? params.append('page', String(page)) : params;
    params = this.checkValueService.hasStringValue(owner) ? params.append('owner', owner) : params;
    params = this.checkValueService.hasArrayValue(tags) ? params.append('tags', tags.join(',')) : params;

    return this.http.get<Post[]>(`${environment.url}/posts`, { params: params });
  }

  getOne(id: number) {
    return this.http.get<Post>(`${environment.url}/posts/${id}`);
  }

  create(post: Post) {
    return this.http.post<Post>(`${environment.url}/posts`, post);
  }
}
