import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';

export interface DynamicTable {
  headers: TableHeader[];
  data: any[];
  dataCount: number;
}

export interface TableHeader {
  name: string;
  dataType: string;
  fieldName: string;
  sortable: boolean;
}

export interface DynamicTableQueryParameters {
  limit: number;
  skip: number;
  sortParameters: SortParameter;
}

interface SortParameter {
  field: string;
  order: string;
}
@Component({
  selector: 'dynamic-table',
  standalone: true,
  imports: [CommonModule, TableModule, PaginatorModule],
  template: `
    <p-table [value]="data"
      [totalRecords]="dataCount"
      (sortFunction)="onSort($event)"
       [customSort]="true" >
      <ng-template pTemplate="header">
        <tr>
          <th *ngFor="let header of headers" pSortableColumn="{{header.sortable ? header.fieldName : undefined}}">
          <p-sortIcon *ngIf="header.sortable" field="{{header.fieldName}}"/>
            {{ header.name }}
          </th>
        </tr>
      </ng-template>
      <ng-template pTemplate="body" let-rowData>
        <tr>
          <td *ngFor="let header of headers">{{ rowData[header.fieldName] }}</td>
        </tr>
      </ng-template>
    </p-table>
    <p-paginator [rows]="rows" [totalRecords]="dataCount"  (onPageChange)="onPageChange($event)"
      [rowsPerPageOptions]="rowsPerPageOptions"></p-paginator>
  `,
})
export class DynamicTableComponent {
  @Input() headers: TableHeader[] = [];
  @Input() data: any[] = [];
  @Input() dataCount = 0;
  @Input() rows = 5;
  @Input() rowsPerPageOptions = [5, 10, 20];
  @Input() size = 'small';
  @Input() selectionMode = 'single';
  @Output() rowSelect = new EventEmitter<any>();
  @Output() queryParameterChange = new EventEmitter<DynamicTableQueryParameters>();

  sortParams : SortParameter = { field: '', order: '' };
  limit : number = 10
  skip: number= 0

  onPageChange(event: any) {    
    if(this.limit != event.rows || this.skip != event.first){
      this.limit = event.rows
      this.skip = event.first
      this.queryParameterChange.emit({
        limit: this.limit,
        skip: this.skip,
        sortParameters: this.sortParams
      });
    }
    
  }

  onSort(event: any) {
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
        sortParameters: newSortParams
      });
    }
    
  }
}
