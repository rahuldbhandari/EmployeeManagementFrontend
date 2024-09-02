import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DynamicTable, FilterEnum, MhPrimeDynamicTableModule } from 'mh-prime-dynamic-table';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { ToolbarModule } from 'primeng/toolbar';
import { CardModule } from 'primeng/card';
import { ApiService } from '../../services/api.service';
import { environment } from '../../../environments/environment';
import { PaginatorResponse, Result } from '../../models/paginator-reponse.model';
import { TableHeader } from '../../models/dynamic-table.model';
import { Employee } from '../../models/employee.model';

@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [ButtonModule, CommonModule, MhPrimeDynamicTableModule, CardModule, ToolbarModule, DropdownModule, CalendarModule, FormsModule],
  templateUrl: './employee.component.html'
})
export class EmployeeComponent implements OnInit {

  url = environment.BaseURL + "Employee/" + environment.version + "/Get"
  employees? : Result ;
  tableData : DynamicTable<Employee> 
  isLoading = true;
  constructor(public apiservice: ApiService){
    this.tableData = {
      headers: [],
      childHeaders: [],
      data: [],
      dataCount: 0
    };
  }

  ngOnInit(): void {
    //  this.apiservice.patch(this.url, JSON.stringify('{"paginationQueries": {"pageNumber": 1,"pageSize": 10}}')).subscribe((response) => {
     this.apiservice.patch(this.url, {"paginationQueries": {"pageNumber": 1,"pageSize": 30}}).subscribe((response) => {
       
      this.employees = <Result> response.result;
      this.TableDataCreate();
       
      
    });
     
  }

  TableDataCreate(){
    this.isLoading = true;
    this.tableData.headers = <TableHeader []>[
      { name: 'First Name', fieldName: 'firstName', isSortable : true, isFilterable:true, filterField: "firstName", 
        filterEnums: <FilterEnum []>[
          {
            value: 1,
            label: "firstName",
            styleClass: "firstName"
          }
        ]
      },
      { name: 'Last Name', fieldName: 'lastName', isSortable : true, isFilterable:true, filterField: "lastName"},
      { name: 'Gender', fieldName: 'gender', isSortable : true, isFilterable:true, filterField: "gender"},
      { name: 'Birth Date', fieldName: 'birthDate', isSortable : true, isFilterable:true, filterField: "birthDate"},
      { name: 'Hire Date', fieldName: 'hireDate', isSortable : true, isFilterable:true, filterField: "hireDate"},
    ];
    this.tableData.data = <Employee[]>this.employees?.data;
    this.isLoading = false;
  }
  HandleQueryParameterChange(event : any){
    console.log(event);
    
  }

  

}

