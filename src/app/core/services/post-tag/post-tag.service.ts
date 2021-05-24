import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostTag } from '../../models/post-tag.model';
import { CheckValueService } from '../check-value/check-value.service';
import { GenericService } from '../generic-service/generic.service';

@Injectable({
  providedIn: 'root'
})
export class PostTagService extends GenericService {


  constructor(private http: HttpClient, private checkValueService: CheckValueService) { super(); }

  public getByLabel(label: string, limit: number) {
    let params = new HttpParams();
    params = this.checkValueService.hasStringValue(label) ? params.append('label', String(label)) : params;
    params = this.checkValueService.hasNumberValue(limit) ? params.append('limit', String(limit)) : params;
    return this.http.get<PostTag[]>(`api/tags/labels`, { params });

  }

  public getItemsLike(value: string, limit: number): Observable<string[]> {
    let params = new HttpParams();
    params = this.checkValueService.hasStringValue(value) ? params.append('label', String(value)) : params;
    params = this.checkValueService.hasNumberValue(limit) ? params.append('limit', String(limit)) : params;
    return this.http.get<string[]>(`api/tags/labels`, { params });
  }
}
