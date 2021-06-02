import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { Post } from '../../models/post.model';
import { User } from '../../models/user.model';
import { CheckValueService } from '../check-value/check-value.service';
import { GenericService } from '../generic-service/generic.service';

@Injectable({
    providedIn: 'root'
})
export class UserService extends GenericService {


    constructor(private http: HttpClient, private checkValueService: CheckValueService) { super(); }

    public getByUsername(username: string, limit: number): Observable<User[]> {
        let params = new HttpParams();
        params = this.checkValueService.hasStringValue(username) ? params.append('username', String(username)) : params;
        params = this.checkValueService.hasNumberValue(limit) ? params.append('limit', String(limit)) : params;
        return this.http.get<User[]>(`api/users`, { params });

    }


    public getItemsLike(value: string, limit: number): Observable<string[]> {
        let params = new HttpParams();
        params = this.checkValueService.hasStringValue(value) ? params.append('username', String(value)) : params;
        params = this.checkValueService.hasNumberValue(limit) ? params.append('limit', String(limit)) : params;
        return this.http.get<User[]>(`api/users`, { params }).pipe(map(users => users.map(u => (u.username as string))));

    }


}
