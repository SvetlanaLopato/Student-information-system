import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

    constructor(
        private router: Router,
    ) {} 

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req).catch(error => {
            const unauthorizedStatus = 401;

            if (error.status === unauthorizedStatus) {
                this.router.navigate(['/login']);
            }

            return Observable.throw(error);
        });
    }

}
