import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { RDPTableComponent } from '../common/rd-p-table/rd-p-table.component';
import { DataSource, ActionButton, DataQuery } from '../common/rd-p-table/rd-p-table.interface';
export interface PaginatedResponse<T> {
  users: T[];
  total: number;
  skip:  number;
  limit: number;
}

export interface User {
  id:        number;
  firstName: string;
  lastName:  string;
  age:       number;
  email:     string;
  username:  string;
  height:    number;
  weight:    number;
}
@Component({
  selector: 'app-test',
  standalone: true,
  imports: [RDPTableComponent, CommonModule],
  template: `
    <div>
      <span *ngFor="let user of selectedUsers">{{ user.id }} , </span>
    </div>
    <br><br>
    <rd-p-table
      [rows]="5"
      [dataSource]="tableData"
      selectionMode="multiple"
      [actionButtons]= "actionButtons"
      size="small"
      [selectedRows]=this.selectedUsers
      [styleClass]="'p-datatable-gridlines'"
      (onCellClick)= "cellClickHandler($event)"
      (selectionChange)="handleRowSelection($event)"
      (queryParameterChange)="handleQueryParameterChange($event)"
      (onActionButtonClicked)="actionButtonClickHandler($event)"
      >
    </rd-p-table>
  `
})
export class TestComponent implements OnInit {
  tableData: DataSource<User> = {
    headers: [
      { name: 'ID', dataType: 'number', fieldName: 'id', sortable: true, clickable: true, width: "8%", tooltip: true, tooltipOptions: {tooltipPosition: 'top'}},
      { name: 'First Name', dataType: 'string', fieldName: 'firstName', sortable: true, width: "14%" },
      { name: 'Last Name', dataType: 'string', fieldName: 'lastName', sortable: false, width: "11%" },
      { name: 'Email', dataType: 'string', fieldName: 'email', sortable: false, width: "2%" },
      { name: 'Username', dataType: 'string', fieldName: 'username', sortable: false, width: "10%", ngClass: (rowData: { age: number; }) => ['p-tag', rowData.age >= 32 ? 'p-tag-success' : 'p-tag-warning'] },
      { name: 'Age', dataType: 'string', fieldName: 'age', sortable: false, width: "5%", ngClass: (rowData: any) => 'underline' },
      { name: 'Height', dataType: 'string', fieldName: 'height', sortable: false, width: "5%" },
      { name: 'Weight', dataType: 'string', fieldName: 'weight', sortable: false, width: "5%" }
    ],
    data: [],
    totalRecords: 10
  };
  selectedUsers : User[] = [];
  actionButtons : ActionButton<User> [] = [
    {label: "Button-1",icon: "pi pi-check",name: "b1", visibility: () => true, severity: "info"},
    {label: "Button-2",icon: "pi pi-asterisk",name: "b2", visibility: (user: { id: number; }) => ((user.id % 2) == 0), severity: "success"},
    {label: "Button-3",icon: "pi pi-crown",name: "b3", visibility: () => true, severity: "help"}
  ]



  constructor(public apiservice: ApiService){}

  ngOnInit(): void {
    this.load();
    this.selectedUsers = JSON.parse(`[{"id":4,"firstName":"James","lastName":"Davis","age":45,"email":"james.davis@x.dummyjson.com","username":"jamesd","height":193.31,"weight":62.1},{"id":6,"firstName":"Olivia","lastName":"Wilson","age":22,"email":"olivia.wilson@x.dummyjson.com","username":"oliviaw","height":182.61,"weight":58},{"id":17,"firstName":"Evelyn","lastName":"Sanchez","age":37,"email":"evelyn.sanchez@x.dummyjson.com","username":"evelyns","height":184.08,"weight":83.15}]`);

  }


  load(query: DataQuery = {limit: 5,skip: 0, sortBy: { field: '', order: '' }}){
    this.apiservice.get<PaginatedResponse<User>>(`https://dummyjson.com/users/?limit=${query.limit+30}&skip=${query.skip}&sortBy=${query.sortBy.field}&order=${query.sortBy.order}&select=id,firstName,lastName,age,email,username,height,weight`)
    .subscribe((response) => {
      this.tableData.data = response.users
      this.tableData.totalRecords = response.total
      // this.selectedUsers.push(...[3, 5, 16].map(i => this.tableData.data[i]));
      // console.log("-- this.selectedUsers");
      // console.log(JSON.stringify(this.selectedUsers));
      // console.log("this.selectedUsers -- ");
    });
  }


  handleRowSelection(event: any) {
    console.log('Row selected:', event);
  }

  handleQueryParameterChange(event: any) {
    console.log('Query parameters changed:', JSON.stringify(event));
    this.load(event)
  }
  cellClickHandler(rowData: any) {
    console.log('Row Clicked:', rowData);
  }

  actionButtonClickHandler(data:any){
    console.log(data)
  }


}
