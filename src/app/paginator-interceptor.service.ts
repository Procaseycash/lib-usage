import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/do";
import "rxjs/add/observable/from";
import "rxjs/add/operator/debounce";
import "rxjs/add/operator/delay";
import {
  HttpErrorResponse,
  HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,
  HttpResponse
} from "@angular/common/http";

@Injectable()
export class PaginatorInterceptorService implements HttpInterceptor {


  constructor() {
  }

  /**
   * This was an hack to a project not following the conform rules.
   * @param event
   */
  static constructPaging(event) {
    const pos = event['url'].indexOf('?');
    const url = (pos > -1) ? event['url'].substring(0, pos - 1) : event['url'];
    console.log('eventResponse=', event);
    event['body']['data']['test'] = 2;
    event['body']["total"] = event['body']['meta']['total'];
    event['body']["per_page"] = event['body']['meta']['perPage'];
    event['body']["current_page"] = event['body']['meta']['page'];
    event['body']["last_page"] = event['body']['meta']['pageCount'];
    event['body']["next_page_url"] = `${url}?page=` + event['body']['meta']['nextPage'];
    event['body']["prev_page_url"] = (event['body']['meta']['previousPage']) ? `${url}?page=` + event['body']['meta']['previousPage'] : null;
    event['body']["path"] = url;
    event['body']["from"] = event['body']['meta']['perPage'];
    event['body']["to"] = event['body']['meta']['total'];
    event['body']["data"] = event['body']['data'];
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('event=', 'ddd');

    return next.handle(request).delay(300).do((event: HttpEvent<any>) => {

      if (event instanceof HttpResponse) {
        // do stuff with response if you want
        console.log('eventResponse', event);
      }
    }, (err: any) => {
      if (err instanceof HttpErrorResponse) {
        Observable.throw(err || 'Server Error');
      }
    });


  }
}
