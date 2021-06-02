import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, NgZone, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from '../services/authentication/authentication.service';
import { ModalService } from '../services/modal/modal.service';

@Injectable({
    providedIn: 'root'
})
export class ErrorInterceptor implements HttpInterceptor {


    constructor(private modalService: ModalService) { }


    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                if (req.url.includes('login')) {
                    return throwError(error);
                }
                if (error && error.status === 504) {
                    this.modalService.serverError('Impossible de joindre le serveur, veuillez verifier votre connexion ou vous rapprocher d\'un administrateur');
                } else if (error && error.error && (error.status !== 401 && error.status !== 0)) {

                    this.modalService.serverError(`${error.error.text}`);
                }
                return throwError(error);
            })
        );
    }

}
