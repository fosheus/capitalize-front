import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/core/models/user.model';
import { Post } from 'src/app/core/models/post.model';
import { environment } from 'src/environments/environment';
import { CheckValueService } from '../check-value/check-value.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private SIZE = 10;

  constructor(private http: HttpClient, private checkValueService: CheckValueService) {

  }

  getAllByCriteria(tags: string[], owner: string, page: number): Observable<Post[]> {
    let params = new HttpParams();
    params = this.checkValueService.hasNumberValue(page) ? params.append('page', String(page)) : params;
    params = this.checkValueService.hasStringValue(owner) ? params.append('owner', owner) : params;
    params = this.checkValueService.hasArrayValue(tags) ? params.append('tags', tags.join(',')) : params;

    return this.http.get<Post[]>(`api/posts`, { params });
  }

  getOne(id: number): Observable<Post> {
    return this.http.get<Post>(`api/posts/${id}`);
  }

  create(post: Post): Observable<Post> {
    return this.http.post<Post>(`api/posts`, post);
  }

  update(post: Post): Observable<Post> {
    return this.http.put<Post>(`api/posts/${post.id}`, post);
  }



  validate(id: number): Observable<Post> {
    return this.http.patch<Post>(`api/posts/${id}/validate`, null);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`api/posts/${id}`);
  }
}
