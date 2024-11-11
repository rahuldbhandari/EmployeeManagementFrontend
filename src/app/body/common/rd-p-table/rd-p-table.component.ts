import { Component, Input, Output, EventEmitter } from '@angular/core';
	import { CommonModule } from '@angular/common';
	import { TableModule } from 'primeng/table';
	import { PaginatorModule } from 'primeng/paginator';
	import { ButtonModule } from 'primeng/button';
	import { TooltipModule } from 'primeng/tooltip';
	import { TooltipOptions } from 'primeng/api/tooltipoptions';
	import { SortParameter } from 'mh-prime-dynamic-table';
import { DataSource, ActionButton, DataQuery } from './rd-p-table.interface';

	@Component({
	  selector: 'rd-p-table',
	  standalone: true,
	  imports: [CommonModule, TableModule, PaginatorModule, ButtonModule, TooltipModule],
	  templateUrl: "./rd-p-table.component.html",
	  styles: [`
	   .table-cell {
		  overflow: hidden;
		  text-overflow: ellipsis;
		  max-width: 0px;
		  white-space: nowrap;
		}
	  `]
	})
	export class RDPTableComponent<T = any> {
	  @Input() dataSource!: DataSource<T>;
	  @Input() rows = 5;
	  @Input() rowsPerPageOptions: number[] = [5, 10, 20];
	  @Input() selectionMode: "multiple" | "single" | null | undefined = "single";
	  @Input() actionButtons: ActionButton<T>[] = [];
	  @Input() styleClass: string | undefined;
	  @Input() tableStyle: { [klass: string]: any; } | null | undefined;
	  
	  defaultTooltipOptions: TooltipOptions = { showDelay: 500, tooltipEvent: "hover", tooltipPosition: "bottom" };
	  
	  private _selectedRows: T[] = [];
	  sortParams: SortParameter = { field: '', order: '' };
	  limit: number = this.rows;
	  skip: number = 0;

	  @Input() set selectedRows(value: T[]) { this._selectedRows = value || []; }
	  get selectedRows(): T[] { return this._selectedRows; }

	  @Output() selectionChange = new EventEmitter<T[]>();
	  @Output() queryParameterChange = new EventEmitter<DataQuery>();
	  @Output() onCellClick = new EventEmitter<{ cellData: any, rowData: T }>();
	  @Output() onActionButtonClicked = new EventEmitter<{ [key: string]: T }>();

	  paginationHandler(event: any) {
		if (this.limit !== event.rows || this.skip !== event.first) {
		  this.limit = event.rows;
		  this.skip = event.first;
		  this.queryParameterChange.emit({ limit: this.limit, skip: this.skip, sortBy: this.sortParams });
		}
	  }

	  sortitionHandler(event: any) {
		const newSortParams: SortParameter = { field: event.field, order: event.order === 1 ? 'asc' : 'desc' };
		if (JSON.stringify(this.sortParams) !== JSON.stringify(newSortParams)) {
		  this.sortParams = newSortParams;
		  this.queryParameterChange.emit({ limit: this.limit, skip: this.skip, sortBy: newSortParams });
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