// p-rd-table => PrimeNg Responsive Dynamic Table

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';

export interface DataSource {
  headers: DataHeader[];
  data: any[];
  totalRecords: number;
}

export interface DataHeader {
  name: string;
  dataType: string;
  fieldName: string;
  sortable: boolean;
  onClick?: (rowData: any) => void
}

export interface DataQuery {
  limit: number;
  skip: number;
  sortBy: SortParameter;
}

interface SortParameter {
  field: string;
  order: string;
}
@Component({
  selector: 'p-d-table',
  standalone: true,
  imports: [CommonModule, TableModule, PaginatorModule],
  template: `
    <h1>MY DYNAMIC TABLE</h1>
    <p-table 
      [value]="dataSource.data"
      [(selection)] = "selectedRows"
      (sortFunction)="sortitionHandler($event)"
      (selectionChange)="rowSelectionHandler($event)" 
      [customSort]="true" >
      <ng-template pTemplate="header">
        <tr>
          <th *ngIf="selectionMode !== undefined" style="width: 3rem"><p-tableHeaderCheckbox/></th>
          <th *ngFor="let header of dataSource.headers" pSortableColumn="{{header.sortable ? header.fieldName : undefined}}">
          <p-sortIcon *ngIf="header.sortable" field="{{header.fieldName}}"/>
            {{ header.name }}
          </th>
        </tr>
      </ng-template>
      <ng-template pTemplate="body" let-rowData>
        <tr>
          <td *ngIf="selectionMode !== undefined">
              <p-tableCheckbox *ngIf="selectionMode === 'multiple'" [value]="rowData" />
              <p-tableRadioButton  *ngIf="selectionMode === 'single'" [value]="rowData" />
          </td>
          <td *ngFor="let header of dataSource.headers"  (click)="header.onClick ? header.onClick(rowData) : null" [ngClass]="header.onClick ? 'text-indigo-500 cursor-pointer' : null">{{ rowData[header.fieldName] }}</td>
        </tr>
      </ng-template>
    </p-table>
    <p-paginator
      [rows]="rows"
      [totalRecords]="dataSource.totalRecords"
      (onPageChange)="paginationHandler($event)"
      [rowsPerPageOptions]="rowsPerPageOptions"
      currentPageReportTemplate="Showing {skip} to {rows*limit} of {totalRecords} entries"
      ></p-paginator>
  `,
})
export class DataTable {
  @Input()
  dataSource!: DataSource;
  @Input() rows = 5;
  @Input() rowsPerPageOptions = [5, 10, 20];
  @Input() size = 'small';
  @Input() selectionMode : 'single' | 'multiple' | undefined;
  @Output() selectionChange = new EventEmitter<any>();
  @Output() queryParameterChange = new EventEmitter<DataQuery>();

  sortParams : SortParameter = { field: '', order: '' };
  limit : number = 10
  skip: number= 0
  selectedRows: any;

  


  paginationHandler(event: any) {    
    if(this.limit != event.rows || this.skip != event.first){
      this.limit = event.rows
      this.skip = event.first
      this.queryParameterChange.emit({
        limit: this.limit,
        skip: this.skip,
        sortBy: this.sortParams
      });
    }
    
  }

  sortitionHandler(event: any) {
    const newSortParams : SortParameter = {
      field: event.field,
      order: event.order === 1 ? 'asc' : 'desc',
    }
    // handling pre-existing or duplicate sort parameters
    if(JSON.stringify(this.sortParams) !== JSON.stringify(newSortParams)){
      this.sortParams = newSortParams
      this.queryParameterChange.emit({
        limit: this.rows,
        skip: this.skip,
        sortBy: newSortParams
      });
    }
    
  }

  rowSelectionHandler(event: any){
    this.selectionChange.emit(this.selectedRows);
  }
}
