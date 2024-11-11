import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicQuery, Permission, ApiResponse, PaginatedResponse } from './sbms-test.model';
import { ApiService } from '../../services/api.service';
import { RDPTableComponent } from '../common/rd-p-table/rd-p-table.component';
import { DataSource } from '../common/rd-p-table/rd-p-table.interface';




@Component({
  selector: 'sbms-app-test',
  standalone: true,
  imports: [RDPTableComponent ,CommonModule],
  templateUrl: './sbms-test.component.html'
})
export class TestComponent implements OnInit {
  url : string = "http://localhost:5024/api/InstitutionBARegistration/v1/GetAllOfficeRegDtls"
  defaultQuery : DynamicQuery = {
    limit:    5,
    skip:     0
  }

  tableData: DataSource<Permission> = {
    headers: [
      { name: 'Reference No', fieldName: 'acc_id', sortable: true, clickable: true, tooltip: true, tooltipOptions: {tooltipPosition: 'top'}},
      { name: 'IFSC', fieldName: 'ifsc', sortable: true,},
      { name: 'Status', fieldName: 'status'},
      { name: 'Last Processing Date', fieldName: 'last_process_date' },
    ],
    data: [],
    totalRecords: 0
  };

  selectedPermissions : Permission[] = [];


  constructor(public apiservice: ApiService){}

  ngOnInit(): void {
    this.load(this.defaultQuery);
    this.selectedPermissions = JSON.parse(`[{"acc_id":16480,"ref_no":null,"ia_flag":"N","ifsc":"SBIN0006693","uono":null,"uono_date":null,"status":"Initiated by Bank Operator","last_process_date":"2024-11-05T12:15:17.090871","last_process_flag":150},{"acc_id":16472,"ref_no":null,"ia_flag":"L","ifsc":"SBIN0012363","uono":"wdsdd","uono_date":null,"status":"Account Not Validated","last_process_date":"2024-09-12T15:32:56.500792","last_process_flag":159},{"acc_id":13585,"ref_no":"018292","ia_flag":"N","ifsc":"UBIN0539074","uono":null,"uono_date":null,"status":"Forwarded to GR T for Approval","last_process_date":"2024-04-16T12:05:31","last_process_flag":152}]`);
    console.log("Selected Permission : ",  this.selectedPermissions);
    
  }


  load(query: DynamicQuery){
    this.apiservice.post<ApiResponse<PaginatedResponse<Permission>>>(this.url, query)
    .subscribe((response) => {
      this.tableData.data = response.result.data      
      
      this.tableData.totalRecords = response.result.total
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
