import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { User } from 'src/app/core/models/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private loggedIn: boolean;
  private user: User;


  constructor(private http: HttpClient, private router: Router) {
  }

  isLoggedIn() {
    const token = localStorage.getItem('access-token');
    return token != null;
  }

  me() {
    return this.http.get<User>(`${environment.url}/auth/me`);
  }

  login(model: any) {
    return this.http.post<any>(`${environment.url}/login`, model, { observe: 'response' }).pipe(tap(resp => {
      const keys = resp.headers.keys();
      const header = resp.headers.get('Authorization');
      if (header) {
        const token = header.replace('Bearer ', '');
        localStorage.setItem('access-token', token);
        this.loggedIn = true;
      } else {
        this.loggedIn = false;
      }
    }));
  }

  signUp(model: User) {
    return this.http.post<any>(`${environment.url}/auth/signup`, model);
  }

  logout() {
    localStorage.removeItem('access-token');
    this.router.navigateByUrl('/auth/login')
  }

  getUser() {
    if (this.user) {
      return Promise.resolve(this.user);
    } else {
      return this.me().pipe(tap(user => this.user = user)).toPromise();
    }
  }
}
