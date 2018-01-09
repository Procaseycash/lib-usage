import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import {LarangPaginatorModule} from 'larang-paginator';
import {PaginatorInterceptorService} from "./paginator-interceptor.service";
import {HttpModule} from "@angular/http";
import {HTTP_INTERCEPTORS} from "@angular/common/http";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    LarangPaginatorModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: PaginatorInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
