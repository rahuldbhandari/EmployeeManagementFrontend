import { Component, OnInit } from '@angular/core';
import { ActionButton, DataQuery, DataSource, DataTable} from './p-dtable.component';
import { ApiService } from '../../../services/api.service';
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
  imports: [DataTable],
  template: `
    <p-dtable 
      [rows]="5" 
      [dataSource]="tableData"
      selectionMode="multiple"
      [actionButtons]= "actionButtons"
      size="small"
      [selectedRows]=this.selectedUsers
      (onCellClick)= "cellClickHandler($event)"
      (selectionChange)="handleRowSelection($event)"
      (queryParameterChange)="handleQueryParameterChange($event)" 
      (onActionButtonClicked)="actionButtonClickHandler($event)"
      >
    </p-dtable>
  `
})
export class TestComponent implements OnInit {
  tableData: DataSource<User> = {
    headers: [
      { name: 'ID', dataType: 'number', fieldName: 'id', sortable: true, clickable: true, styleClass: "text-indigo-500 font-italic", width: "8%"},
      { name: 'First Name', dataType: 'string', fieldName: 'firstName', sortable: true, width: "14%" },
      { name: 'Last Name', dataType: 'string', fieldName: 'lastName', sortable: false, width: "11%" },
      { name: 'Email', dataType: 'string', fieldName: 'email', sortable: false, width: "10%" },
      { name: 'Username', dataType: 'string', fieldName: 'username', sortable: false, width: "10%" },
      { name: 'Age', dataType: 'string', fieldName: 'age', sortable: false, width: "5%" },
      { name: 'Height', dataType: 'string', fieldName: 'height', sortable: false, width: "5%" },
      { name: 'Weight', dataType: 'string', fieldName: 'weight', sortable: false, width: "5%" }
    ],
    data: [],
    totalRecords: 10
  };
  selectedUsers : User[] = [];
  actionButtons : ActionButton<User> [] = [
    {label: "Button-1",icon: "pi pi-check",name: "b1", visibility: (user) => true, severity: "info"},
    {label: "Button-2",icon: "pi pi-asterisk",name: "b2", visibility: (user) => ((user.id % 2) == 0), severity: "success"},
    {label: "Button-3",icon: "pi pi-crown",name: "b3", visibility: (user) => true, severity: "help"}
  ]
  


  constructor(public apiservice: ApiService){}
  
  ngOnInit(): void {
    this.load();
  }
  

  load(query: DataQuery = {limit: 5,skip: 0, sortBy: { field: '', order: '' }}){
    this.apiservice.get<PaginatedResponse<User>>(`https://dummyjson.com/users/?limit=${query.limit+30}&skip=${query.skip}&sortBy=${query.sortBy.field}&order=${query.sortBy.order}&select=id,firstName,lastName,age,email,username,height,weight`)
    .subscribe((response) => {
      this.selectedUsers.push(...[3, 5, 16].map(i => response.users[i]));
      console.log("-- this.selectedUsers");      
      console.log(this.selectedUsers);      
      console.log("this.selectedUsers -- ");
      this.tableData.data = response.users
      this.tableData.totalRecords = response.total

    });
  }


  handleRowSelection(event: any) {
    console.log('Row selected:', event);
  }

  handleQueryParameterChange(event: any) {
    console.log('Query parameters changed:', event);
    this.load(event)
  }
  cellClickHandler(rowData: any) {
    console.log('Row Clicked:', rowData);
  }

  actionButtonClickHandler(data:any){
    console.log(data)
  }


}
