import { Component, ViewChild } from '@angular/core';
import { PaginatorComponent } from './components/paginator/paginator.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Angular Paginator';
  totalPages: number = 0;

  constructor() { }

  defaultPagination = {
    page: 1,
    pageSize: 10,
    totalRecords: 50,
    totalPages: 0
  };

  customPagination = {
    page: 5,
    pageSize: 5,
    totalRecords: 100,
    totalPages: 0
  };

  public onPageChanged($event: number): void {
    this.defaultPagination.page = $event;
  }
}
