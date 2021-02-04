import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PostFile } from '../../models/post-file.model';
import { CheckValueService } from '../check-value/check-value.service';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http: HttpClient, private checkValueService: CheckValueService) {

  }

  getOne(fileId: number) {
    return this.http.get<PostFile>(`${environment.url}/files/${fileId}/text`);
  }

  async getOneAsync(fileId: number) {
    return this.http.get<string>(`${environment.url}/files/${fileId}/text`).toPromise();
  }

  getOneBinary(fileId: number) {
    return this.http.get<any>(`${environment.url}/files/${fileId}/bi,ary`);
  }

}
