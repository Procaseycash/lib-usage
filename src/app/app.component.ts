import {AfterViewInit, Component, OnInit} from '@angular/core';
import {EventsService} from "larang-paginator";
import {Http} from "@angular/http";
import 'rxjs/add/operator/map';
import {TableSearcherInterface, TableSearcherTypesEnum, EventsService as EventServe} from "angular-table-searcher";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'app';
  public paginator = {
    path: 'http://localhost:8088/api/organizations',
    limit: 20,
    perNav: 5,
    data: null,
    from: 'list_organizations'

  };

  public tableSearcher: TableSearcherInterface<any> = {
    path: 'http://localhost:8088/api/organizations',
    searchType: TableSearcherTypesEnum.EMPTY_TABLE_APPLY_BACKEND,
    searchKeys: ['name', 'email'], // can be empty array to enable deep searching
    borderColor: '',
    buttonColor: '',
    queryField: 'search',
    data: null,
    placeholder: 'Filter information...',
    from: 'search_organizations'
  };

  constructor(private eventsService: EventsService, private http: Http, private  eventServe: EventServe) {
    this.eventsService.on(this.paginator.from, (res) => {
      // pass response to the property rendering the data in view

      this.paginator.data = res.data; // update paginated data in view
    });

    this.eventServe.on(this.tableSearcher.from, (res) => {
      // Note that table will response from table searcher will respond with result and data,
      // the result is the searched item while data is the previous data passed down to it.
      // the result can be of array or object.
      // if result is an array, that is the final result
      // but if result is object, it denotes a backend response, so you can drill down to pick the searched result depending on your api response.
      console.log('response=', res);
      this.tableSearcher.data = (res['result'].constructor === Array) ? res['result'] : res['result'].data['data']; // update table data in view
      this.paginator.data['data'] = this.tableSearcher.data;
    });
  }
  private getTransactions() {
    this.http.get(this.paginator.path + `?page=1&paginate=${this.paginator.limit}`)
      .map(res => res.json()).subscribe(
      (res) => {
        this.paginator.data = res.data;
        this.tableSearcher.data = res['data']['data'];
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
