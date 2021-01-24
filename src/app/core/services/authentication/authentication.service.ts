import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/auth/models/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {



  constructor(private http: HttpClient, private router: Router) { }

  login(model: any) {
    return this.http.post<any>(`${environment.url}/login`, model);
  }

  signUp(model: User) {
    console.log(environment.url);
    return this.http.post<any>(`${environment.url}/auth/signup`, model);
  }

  logout() {
    localStorage.removeItem('access-token');
    this.router.navigateByUrl('/auth/login')
  }
}
