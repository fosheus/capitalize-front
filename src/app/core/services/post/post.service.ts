import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/core/models/user.model';
import { Post } from 'src/app/core/models/post.model';
import { environment } from 'src/environments/environment';
import { CheckValueService } from '../check-value/check-value.service';
import { Observable } from 'rxjs';
import { PostFile } from '../../models/post-file.model';
import { Page } from '../../models/page.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private SIZE = 10;

  constructor(private http: HttpClient, private checkValueService: CheckValueService) {

  }

  getAllByCriteria(tags: string[], owner: string, status: boolean | null, pageIndex: number, pageSize: number): Observable<Page<Post>> {
    let params = new HttpParams();
    params = this.checkValueService.hasNumberValue(pageIndex) ? params.append('pageIndex', String(pageIndex)) : params;
    params = this.checkValueService.hasNumberValue(pageSize) ? params.append('pageSize', String(pageSize)) : params;
    params = this.checkValueService.hasStringValue(owner) ? params.append('owner', owner) : params;
    params = this.checkValueService.hasBooleanValue(status) ? params.append('status', String(status)) : params;
    params = this.checkValueService.hasArrayValue(tags) ? params.append('tags', tags.join(',')) : params;

    return this.http.get<Page<Post>>(`api/posts`, { params });
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

  unvalidate(id: number): Observable<Post> {
    return this.http.patch<Post>(`api/posts/${id}/unvalidate`, null);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`api/posts/${id}`);
  }

  createFile(postId: number, fileDto: PostFile): Observable<PostFile> {
    return this.http.post<PostFile>(`api/posts/${postId}/files`, this.prepareFormData(fileDto));
  }

  updateFile(postId: number, fileDto: PostFile): Observable<PostFile> {
    return this.http.put<PostFile>(`api/posts/${postId}/files/${fileDto.id}`, this.prepareFormData(fileDto));
  }

  private prepareFormData(fileDto: PostFile): FormData {
    const formData = new FormData();
    const text = fileDto.text;
    if (fileDto.binary) {
      formData.append('file', fileDto.binary, fileDto.name);
    }
    if (text && text !== '') {
      formData.append('text', text);
    }
    if (fileDto.id) {
      formData.append('id', fileDto.id.toString());
    }
    formData.append('path', fileDto.path);
    formData.append('name', fileDto.name);
    formData.append('type', fileDto.type);
    return formData;
  }

  deleteFile(postId: number, fileId: number): Observable<PostFile> {
    return this.http.delete<PostFile>(`api/posts/${postId}/files/${fileId}`);
  }
}
