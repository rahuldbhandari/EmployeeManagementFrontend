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
import { TableHeader } from '../../models/dynamic-table.model';
import { Employee } from '../../models/employee.model';
@Component({
  selector: 'app-employee',
  standalone: true,
  imports: [ButtonModule, CommonModule, MhPrimeDynamicTableModule, CardModule, ToolbarModule, DropdownModule, CalendarModule, FormsModule],
  templateUrl: './employee.component.html'
})
export class EmployeeComponent implements OnInit {
onTablePageChange($event: Event) {
throw new Error('Method not implemented.');
}

  url = environment.BaseURL + "Employee/" + environment.version + "/GetAll?deptno=d005"
  // employees? : Result ;
  tableData : DynamicTable<Employee> 
  isLoading = true;
data: any;
  constructor(public apiservice: ApiService){
    this.tableData = {
      headers: [],
      childHeaders: [],
      data: [],
      dataCount: 0
    };
  }

  ngOnInit(): void {
    //  this.apiservice.patch(this.url, JSON.stringify('{"paginationQueries": {"pageNumber": 1,"limit": 10}}')).subscribe((response) => {
      this.apiservice.post(this.url, {"skip": 1,"limit": 15}).subscribe((response) => {
       
        // this.employees = <Result> response.result;
        this.TableDataCreate();


      });

  }

  TableDataCreate(){
    this.isLoading = true;
    var newTabledata : DynamicTable<Employee> = {
      headers: [],
      childHeaders: [],
      data: [],
      dataCount: 0
    };
    newTabledata.headers = <TableHeader []>[
      { name: 'First Name', fieldName: 'firstName', isSortable : true, isFilterable:true, filterField: "firstName",
        filterEnums: <FilterEnum []>[
          {
            value: 1,
            label: "First Name",
            styleClass: "primary"
          },
        ],
        dataType: "object",

      },
      { name: 'Last Name', fieldName: 'seshNaam', isSortable : true, isFilterable:false, filterField: "seshNaam"},
      { name: 'Gender', fieldName: 'gender', isSortable : true, isFilterable:false, filterField: "gender"},
      { name: 'Birth Date', fieldName: 'birthDate', isSortable : true, isFilterable:false, filterField: "birthDate"},
      { name: 'Hire Date', fieldName: 'hireDate', isSortable : true, isFilterable:false, filterField: "hireDate"},
    ];
    // newTabledata.data = <Employee[]>this.employees?.data;
    this.isLoading = false;
    this.tableData = newTabledata
  }
  HandleQueryParameterChange(event : any){
    console.log(event);
    console.log(JSON.stringify(event));

    this.apiservice.post(this.url, event).subscribe((response) => {
       
      // this.employees = <Result> response.result;
      this.TableDataCreate();


    });
  }

  HandSearchKeyChange(event : any){
    console.log(event);

  }


}

