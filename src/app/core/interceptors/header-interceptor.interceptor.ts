import { Injectable, NgZone, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { finalize, tap, catchError, filter, switchMap, take, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../services/authentication/authentication.service';

@Injectable({
    providedIn: 'root'
})
export class HeaderInterceptor implements HttpInterceptor {


    constructor(private authService: AuthenticationService, private router: Router, private zone: NgZone, private injector: Injector) { }


    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {



        req = this.addAuthenticationToken(req);

        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                if (req.url.includes('login')) {
                    return throwError(error);
                }

                if (error && (error.status === 401 || error.status === 0)) {
                    this.authService.logout();
                }
                return throwError(error);
            })
        );
    }

    private addAuthenticationToken(request: HttpRequest<any>): HttpRequest<any> {
        // If we do not have a token yet then we should not set the header.
        // Here we could first retrieve the token from where we store it.
        const token = localStorage.getItem('access-token');
        if (token) {
            return request.clone({
                headers: request.headers.set('Authorization', 'Bearer ' + token)
            });
        } else {
            return request;
        }
    }

}
