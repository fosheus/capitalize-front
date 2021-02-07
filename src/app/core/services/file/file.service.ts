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
    return this.http.get<any>(`${environment.url}/files/${fileId}/text`);
  }

  getOneBinary(fileId: number) {
    return this.http.get(`${environment.url}/files/${fileId}/binary`, { responseType: 'blob' });
  }

}
