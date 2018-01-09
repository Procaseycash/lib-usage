import {Injectable} from '@angular/core';
import {
  HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,
  HttpResponse
} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/do";

@Injectable()
export class PaginatorInterceptorService implements HttpInterceptor {

  constructor() {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).do((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        // do stuff with response if you want
        console.log('eventResponse=', event);
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        Observable.throw(err || 'Server Error');
      }
    });
  }
}
