import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';
import { User } from './test.component';

export interface DataSource<T = any> {
  headers: DataHeader[];
  data: T[];
  totalRecords: number;
}

export interface DataHeader {
  name: string;
  dataType: string;
  fieldName: string;
  sortable: boolean;
  styleClass?: string;
  clickable?: boolean;
  width?: string; // Nullable width property
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

export interface ActionButton<T = any> {
  label: string;
  name: string;
  icon?: string;
  rounded?: boolean;
  severity?: "success" | "info" | "warning" | "danger" | "help" | "primary" | "secondary" | "contrast" | null | undefined;
  raised?: boolean;
  outlined?: boolean;
  text?: boolean;
  visibility?: (data: T) => boolean;
}

@Component({
  selector: 'p-dtable',
  standalone: true,
  imports: [CommonModule, TableModule, PaginatorModule, ButtonModule],
  template: `
    <h1>MY DYNAMIC TABLE</h1>
    <div>
      <span *ngFor="let user of selectedRows">{{ user.id }} , </span>
    </div>
    <br><br>
    <p-table 
      [value]="dataSource.data.slice(0, rows)"
      [(selection)]="selectedRows"
      [selectionMode]="selectionMode"
      (sortFunction)="sortitionHandler($event)"
      (selectionChange)="rowSelectionHandler($event)"
      styleClass="p-datatable-gridlines">
      <ng-template pTemplate="header">
        <tr>
          <th *ngIf="selectionMode !== undefined" style="width: 3rem"><p-tableHeaderCheckbox/></th>
          <th *ngFor="let header of dataSource.headers" pSortableColumn="{{header.sortable ? header.fieldName : undefined}}" [style.width]="header.width">
            <p-sortIcon *ngIf="header.sortable" field="{{header.fieldName}}"/>
            {{ header.name }}
          </th>
          <th *ngIf="actionButtons.length > 0 && areActionButtonsVisible(dataSource.data[0])" [attr.colspan]="1">Actions</th>
        </tr>
      </ng-template>
      <ng-template pTemplate="body" let-rowData>
        <tr>
          <td *ngIf="selectionMode !== undefined">
            <p-tableCheckbox *ngIf="selectionMode === 'multiple'" [value]="rowData" />
            <p-tableRadioButton *ngIf="selectionMode === 'single'" [value]="rowData" />
          </td>
          <td *ngFor="let header of dataSource.headers"  
              (click)="header.clickable ? cellClickHandler(rowData[header.fieldName], rowData) : null"
              [ngClass]="[header.styleClass || '', header.clickable ? 'cursor-pointer' : '']"
              [style.width]="header.width"
              class="table-cell">
            {{ rowData[header.fieldName] }}
          </td>
          <td *ngIf="areActionButtonsVisible(rowData)">
            <div style="display: flex; gap: 0.5rem;">
              <ng-container *ngFor="let actionButton of actionButtons">
                <p-button *ngIf="!actionButton.visibility || actionButton.visibility(rowData)" 
                          [label]="actionButton.label" 
                          [icon]="actionButton.icon" 
                          [rounded]="actionButton.rounded" 
                          [severity]="actionButton.severity" 
                          [raised]="actionButton.raised" 
                          [text]="actionButton.text" 
                          [outlined]="actionButton.outlined" 
                          size="small" 
                          (onClick)="actionButtonClickHandler(actionButton, rowData)">
                </p-button>
              </ng-container>
            </div>
          </td>
        </tr>
      </ng-template>
    </p-table>
    <p-paginator
      [rows]="rows"
      [totalRecords]="dataSource.totalRecords"
      (onPageChange)="paginationHandler($event)"
      [rowsPerPageOptions]="rowsPerPageOptions"
      currentPageReportTemplate="Showing {skip + 1} to {skip + rows} of {totalRecords} entries"> <!-- Adjusted report to show correct range -->
    </p-paginator>
  `,
  styles: [`
   .table-cell {
      overflow: hidden; /* Hide overflowing content */
      text-overflow: ellipsis; /* Show ellipsis for overflow */
      white-space: nowrap; /* Prevent wrapping */
      max-width: 0px; /* Set max width for cell */
    }
  `]
})
export class DataTable<T = any> {
  @Input() dataSource!: DataSource<T>;
  @Input() rows = 5;
  @Input() rowsPerPageOptions: number[] = [5, 10, 20];
  @Input() size: 'small' | 'large' = 'small';
  @Input() selectionMode: 'single' | 'multiple' | undefined = undefined;
  @Input() actionButtons: ActionButton<T>[] = [];
  
  private _selectedRows: T[] = [];
  
  @Input() set selectedRows(value: T[]) {
    this._selectedRows = value || [];
  }
  get selectedRows(): any[] {
    return this._selectedRows;
  }

  @Output() selectionChange = new EventEmitter<T[]>();
  @Output() queryParameterChange = new EventEmitter<DataQuery>();
  @Output() onCellClick = new EventEmitter<{ cellData: any, rowData: T }>();
  @Output() onActionButtonClicked = new EventEmitter<{ [key: string]: T }>();

  sortParams: SortParameter = { field: '', order: '' };
  limit: number = 10;
  skip: number = 0;

  paginationHandler(event: any) {
    if (this.limit !== event.rows || this.skip !== event.first) {
      this.limit = event.rows;
      this.skip = event.first;
      this.queryParameterChange.emit({ limit: this.limit, skip: this.skip, sortBy: this.sortParams });
    }
  }

  sortitionHandler(event: { field: string; order: number }) {
    const newSortParams: SortParameter = { field: event.field, order: event.order === 1 ? 'asc' : 'desc' };
    if (JSON.stringify(this.sortParams) !== JSON.stringify(newSortParams)) {
      this.sortParams = newSortParams;
      this.queryParameterChange.emit({ limit: this.rows, skip: this.skip, sortBy: newSortParams });
    }
  }

  rowSelectionHandler(event: T[] | T) {
    this._selectedRows = this.selectionMode === 'single' && event ? [event as T] : (event as T[]);
    this.selectionChange.emit(this._selectedRows);
  }

  cellClickHandler(cellData: any, rowData: T) {
    this.onCellClick.emit({ cellData, rowData });
  }

  actionButtonClickHandler(actionButton: ActionButton<T>, rowData: T) {
    this.onActionButtonClicked.emit({ [actionButton.name]: rowData });
  }

  areActionButtonsVisible(rowData: T): boolean {
    return this.actionButtons.some(ab => !ab.visibility || ab.visibility(rowData));
  }
}
