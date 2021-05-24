import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from 'src/app/core/models/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private user: User | null;


  constructor(private http: HttpClient, private router: Router) {
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('access-token') !== null;
  }

  me(): Observable<User> {
    return this.http.get<User>(`api/auth/me`);
  }

  login(model: any): Observable<any> {
    return this.http.post<any>(`api/login`, model, { observe: 'response' }).pipe(tap(resp => {
      const keys = resp.headers.keys();
      const header = resp.headers.get('Authorization');
      if (header) {
        const token = header.replace('Bearer ', '');
        localStorage.setItem('access-token', token);
      }
    }));
  }

  signUp(model: User): Observable<any> {
    return this.http.post<any>(`api/auth/signup`, model);
  }

  logout(): void {
    localStorage.removeItem('access-token');
    this.router.navigateByUrl('/auth/login');
  }

  getUser(): Promise<User> {
    if (this.user) {
      return Promise.resolve(this.user);
    } else {
      return this.me().pipe(tap(user => this.user = user)).toPromise();
    }
  }
}
