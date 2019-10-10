import { Component, OnInit, EventEmitter, Output, Input, ChangeDetectionStrategy, KeyValueDiffer, KeyValueDiffers } from '@angular/core';
import { Pagination } from 'src/app/models/pagination';
import { PaginationOptions } from 'src/app/models/pagination-options';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginatorComponent implements OnInit {
  differ: KeyValueDiffer<string, any>;

  @Output() pageChange = new EventEmitter<number>(true);
  @Output() totalPagesChange = new EventEmitter<number>(true);

  @Input()
  get pagination(): any {
    return this.paginationObj;
  }

  set pagination(obj: any) {
    this.paginationObj = obj;
  }

  @Input() additionalPages: number = 3;
  @Input() page: number;
  @Input() pageSize: number;
  @Input() showFirst: boolean = true;
  @Input() showLast: boolean = true;

  @Input() options: PaginationOptions = {
    arrowNext: '>',
    arrowPrev: '<'
  };

  private paginationObj: Pagination;
  private pages: number = 1;

  public additionalPreviousPages: number[] = [];
  public additionalNextPages: number[] = [];

  constructor(private differs: KeyValueDiffers) {
    if (!this.differ)
      this.differ = this.differs.find({}).create();
  }

  ngOnInit() {
    if (this.page) this.paginationObj.page = this.page;
    if (this.pageSize) this.paginationObj.pageSize = this.pageSize;

    this.countTotalPages();
    this.createAdditionalPages();
  }

  ngDoCheck() {
    const change = this.differ.diff(this.pagination);

    if (change) {
      change.forEachChangedItem(item => {
        if (item.key == 'totalRecords') {
          this.countTotalPages();
          this.createAdditionalPages();
        }
      });
    }
  }

  public goToPage(page: number): void {
    if (page <= 0 || page > this.pages) return;

    this.paginationObj.page = page;
    this.onPageChanged();
  }

  public nextPage(number: number = 1): void {
    if (this.paginationObj.page + number > this.pages) return;

    this.paginationObj.page = this.paginationObj.page + number;
    this.onPageChanged();
  }

  public previousPage(number: number = 1): void {
    if (this.paginationObj.page - number <= 0) return;

    this.paginationObj.page = this.paginationObj.page - number;
    this.onPageChanged();
  }

  public isValidPage(number: number): boolean {
    let page = this.paginationObj.page + number;
    return page > 0 && page <= this.pages;
  }

  private createAdditionalPages() {
    let invalidPreviousPages = this.countInvalidPreviousPages();
    let invalidNextPages = this.countInvalidNextPages();

    let previousPagesCount = (this.additionalPages - invalidPreviousPages) + invalidNextPages;
    let nextPagesCount = (this.additionalPages - invalidNextPages) + invalidPreviousPages;

    this.additionalPreviousPages = Array.from(Array(previousPagesCount).keys()).reverse().map(x => x + 1);
    this.additionalNextPages = Array.from(Array(nextPagesCount).keys()).map(x => x + 1);
  }

  private countInvalidPreviousPages(): number {
    let invalidPagesCount = 0;

    for (let i = 1; i <= this.additionalPages; i++) {
      let page = this.paginationObj.page - i;

      if (page <= 0 || page > this.pages)
        invalidPagesCount++;
    }

    return invalidPagesCount;
  }

  private countInvalidNextPages(): number {
    let invalidPagesCount = 0;

    for (let i = 1; i <= this.additionalPages; i++) {
      let page = this.paginationObj.page + i;

      if (page <= 0 || page > this.pages)
        invalidPagesCount++;
    }

    return invalidPagesCount;
  }

  private countTotalPages(): void {
    let total = Math.ceil(+this.paginationObj.totalRecords / +this.paginationObj.pageSize);
    this.paginationObj.totalPages = this.pages = Number.isNaN(total) ? 1 : total;
  }

  private onPageChanged(): void {
    this.createAdditionalPages();
    this.pageChange.emit(this.paginationObj.page);
  }

  get isFirstPage(): boolean {
    return this.paginationObj.page == 1;
  }

  get isLastPage(): boolean {
    return this.paginationObj.page == this.pages;
  }

  get hideFirstLastPages(): boolean {
    return this.pages < this.additionalPages * 3;
  }
}
