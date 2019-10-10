<<<<<<< HEAD
# Custom Pagination for Angular

Simple solution to paginate any Angular data.


## Installation

Download or clone the project 

Use Nuget Package Manager

```bash
npm install -g @angular/cli
npm install
```

## Usage

Html:
```html
<app-paginator [(pagination)]="defaultPagination" (pageChange)="onPageChanged($event)">
</app-paginator>

 <p class="example"> Page: {{ defaultPagination.page }} of {{ defaultPagination.totalPages }}</p>

```
Typescript
```typescript
defaultPagination: any = {
    page: 1,
    pageSize: 10,
    totalRecords: 50,
    totalPages: 0
  };

 public onPageChanged($event: number): void {
    // execute any request needed to server 
    // and set the result on a list to show on the page.
    console.log('Page changed', $event);
    this.defaultPagination.page = $event;
}
```

## Paginator Controls Directives

  @Input() pagination: Pagination;
    - Object that sets and contains the current pagination state
    
  @Input() additionalPages: number = 3;
    - Number of pages that will be showd before and after the current page
    
  @Input() page: number;
    - Current page, also used to set the initial selected page
    
  @Input() pageSize: number;
    - Total of items on each page, also used to calculate the number of totalPages
    
  @Input() showFirst: boolean = true;
    - Show or hide the first page with dots on the left side the the component
    
  @Input() showLast: boolean = true;
    - Show or hide the last page with dots on the right side the the component
    
  @Input() options: PaginationOptions;
    - Sets custom options to pagination
  
## Classes 
  ### Pagination: Class that contains the information to create the pagination
    
    page: number;
      - The selected page
      
    pageSize: number;
      - The total of items on each page, also used to calculate de number of totalPages
      
    totalRecords: number;
      - The total of items on the collection, also used to calculate the number of totalPages
      
    totalPages: number;
      - The total of pages generated base on the totalRescords divided by the pageSize
      

  ### PaginationOptions: Class that contains custom options to pagination
    
    arrowPrev: string;
      - Text / HTML to set the previous page arrow
      
    arrowNext: string
      - Text / HTML to set the next page arrow
      

## Contributing
Pull requests are welcome. 

Feel free to use and send me improvements.

## Licensed
[MIT](https://choosealicense.com/licenses/mit/)
