import { Component, OnInit } from '@angular/core';
import { DataQuery, DataSource, DataTable} from './p-rd-table.component';
import { environment } from '../../../../environments/environment';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [DataTable],
  template: `
    <p-d-table 
      [rows]="5" 
      [dataSource]="tableData"
      selectionMode="multiple"
      (selectionChange)="handleRowSelection($event)"
      (queryParameterChange)="handQueryParameterChange($event)" size="small">
    </p-d-table>
  `
})
export class TestComponent implements OnInit {
  tableData: DataSource = {
    headers: [
      { name: 'ID', dataType: 'number', fieldName: 'id', sortable: true, onClick: this.abcd },
      { name: 'First Name', dataType: 'string', fieldName: 'firstName', sortable: true },
      { name: 'Last Name', dataType: 'string', fieldName: 'lastName', sortable: false }
    ],
    data: [],
    totalRecords: 10
  };


  constructor(public apiservice: ApiService){}
  
  ngOnInit(): void {
    this.load();
  }
  

  load(query: DataQuery = {limit: 5,skip: 0, sortBy: { field: '', order: '' }}){
    this.apiservice.get(`https://dummyjson.com/users/?limit=${query.limit}&skip=${query.skip}&sortBy=${query.sortBy.field}&order=${query.sortBy.order}&select=id,firstName,lastName,age`)
    .subscribe((response) => {
      this.tableData.data = response.users
      this.tableData.totalRecords = response.total

    });
  }


  handleRowSelection(event: any) {
    console.log('Row selected:', event);
  }

  handQueryParameterChange(event: any) {
    console.log('Query parameters changed:', event);
    this.load(event)
  }
  abcd(rowData: any) {
    console.log('Column clicked:', rowData);
  }


}
