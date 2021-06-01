import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PostFile } from '../../models/post-file.model';
import { CheckValueService } from '../check-value/check-value.service';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http: HttpClient, private checkValueService: CheckValueService) {

  }

  getOne(fileId: number): Observable<any> {
    return this.http.get<any>(`api/files/${fileId}/text`);
  }

  getOneBinary(fileId: number): Observable<Blob> {
    return this.http.get(`api/files/${fileId}/binary`, { responseType: 'blob' });
  }

  updateFileContentText(fileId: number, text: string) {
    return this.http.put(`api/files/${fileId}/text`, { data: text });
  }

  updateFileContentBinary(fileId: number, file: File) {

    const formData = new FormData();
    // formData.append('')
    return this.http.put(`api/files/${fileId}/binary`, {});
  }

  pathsFromFullPath(fullPath: string): string[] {
    return fullPath.split(/[\/\\]/);
  }


}
