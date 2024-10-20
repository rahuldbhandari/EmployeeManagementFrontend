import { Component, OnInit } from '@angular/core';
import { DynamicTable, DynamicTableComponent, DynamicTableQueryParameters } from './dynamic-table.component';
import { environment } from '../../../../environments/environment';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [DynamicTableComponent],
  template: `
    <dynamic-table [rows]="5" [rowsPerPageOptions]="[5, 10, 20]" [data]="tableData.data" [dataCount]="tableData.dataCount" [headers]="tableData.headers" selectionMode="single" (rowSelect)="handleRowSelection($event)"
      (queryParameterChange)="handQueryParameterChange($event)" size="small">
    </dynamic-table>
  `
})
export class TestComponent implements OnInit {
  tableData: DynamicTable = {
    headers: [
      { name: 'ID', dataType: 'number', fieldName: 'id', sortable: true },
      { name: 'First Name', dataType: 'string', fieldName: 'firstName', sortable: true },
      { name: 'Last Name', dataType: 'string', fieldName: 'lastName', sortable: false }
    ],
    data: [],
    dataCount: 0
  };


  constructor(public apiservice: ApiService){}
  
  ngOnInit(): void {
    this.load();
  }
  

  load(query: DynamicTableQueryParameters = {limit: 5,skip: 0, sortParameters: { field: '', order: '' }}){
    this.apiservice.get(`https://dummyjson.com/users/?limit=${query.limit}&skip=${query.skip}&sortBy=${query.sortParameters.field}&order=${query.sortParameters.order}&select=id,firstName,lastName,age`)
    .subscribe((response) => {
      this.tableData.data = response.users
      this.tableData.dataCount = response.total
    });
  }


  handleRowSelection(event: any) {
    console.log('Row selected:', event);
  }

  handQueryParameterChange(event: any) {
    console.log('Query parameters changed:', event);
    this.load(event)
  }
}
