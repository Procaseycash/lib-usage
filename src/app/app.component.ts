import {AfterViewInit, Component, OnInit} from '@angular/core';
import {EventsService} from "larang-paginator";
import {Http} from "@angular/http";
import 'rxjs/add/operator/map';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'app';
  public paginator = {
    path: 'http://localhost:8088/api/organizations',
    limit: 5,
    perNav: 5,
    data: null,
    from: 'list_organizations'

  };

  constructor(private eventsService: EventsService, private http: Http) {
    this.eventsService.on(this.paginator.from, (res) => {
      // pass response to the property rendering the data in view

      this.paginator.data = res.data; // update paginated data in view
    });
  }
  private getTransactions() {
    this.http.get(this.paginator.path + `?page=1&paginate=${this.paginator.limit}`)
      .map(res => res.json()).subscribe(
      (res) => {
        this.paginator.data = res.data;
        console.log('Response=', res);
      },
      (err) => {

      }
    );
  }

  ngOnInit() {
    this.getTransactions();
  }
  ngAfterViewInit() {
  }
}
