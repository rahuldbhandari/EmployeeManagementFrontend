import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicQuery, ApiResponse, PaginatedResponse, Institution } from './sbms-test.model';
import { ApiService } from '../../services/api.service';
import { DataSource } from '../common/rd-p-table/rd-p-table.interface';
import { RdPTableComponent } from '../common/rd-p-table/rd-p-table.component';




@Component({
  selector: 'sbms-app-test',
  standalone: true,
  imports: [RdPTableComponent, CommonModule, RdPTableComponent],
  template: `
    <div>
    <span *ngFor="let user of selectedPermissions">{{ user.acc_id }} , </span>
    </div>
    <br><br>
    <rd-p-table
      [rows]="5"
      [paginator]="true"
      [dataSource]="tableData"
      [selectionMode]="'multiple'"
      [selectedRows]=selectedPermissions
      [scrollHeight]="'600px'"
      [styleClass]="'p-datatable-gridlines'"
      (onCellClick)= "cellClickHandler($event)"
      (selectionChange)="handleRowSelection($event)"
      (onActionButtonClicked)="actionButtonClickHandler($event)"
      (queryParameterChange)="handleQueryParameterChange($event)"
      >
</rd-p-table>
<!-- (queryParameterChange)="handleQueryParameterChange($event)" -->

  `
})
export class TestComponent implements OnInit {
  url : string = "http://localhost:5024/api/InstitutionBARegistration/v1/GetAllOfficeRegDtls"
  defaultQuery : DynamicQuery = {
    limit:    5,
    skip:     0
  }

  tableData: DataSource<Institution> = {
    headers: [
      { name: 'Reference No', fieldName: 'acc_id', width: "20%", sortable: true, filterable: true, type: "numeric" ,clickable: true, ngClass: (rowData:Institution) => ['cursor-pointer text-primary font-bold']},
      { name: 'Account Type', fieldName: 'ia_flag', width: "20%", },
      { name: 'IFSC Code', fieldName: 'ifsc', width: "20%", sortable: true, filterable: true, type: "text"},
      { name: 'Status', fieldName: 'status', width: "20%", tooltip: true, tooltipOptions: {tooltipPosition: 'top'}, ngClass: (rowData: Institution) => ['badge', 'primary']},
      { name: 'Updated On', width: "20%", fieldName: 'last_process_date' },
    ],
    data: [],
    totalRecords: 0
  };

  selectedPermissions : Institution[] = [];


  constructor(public apiservice: ApiService, private cdr: ChangeDetectorRef){}

  ngOnInit(): void {
    this.load(this.defaultQuery);
    this.selectedPermissions = JSON.parse(`[{"acc_id":16480,"ref_no":null,"ia_flag":"N","ifsc":"SBIN0006693","uono":null,"uono_date":null,"status":"Initiated by Bank Operator","last_process_date":"2024-11-05T12:15:17.090871","last_process_flag":150},{"acc_id":16472,"ref_no":null,"ia_flag":"L","ifsc":"SBIN0012363","uono":"wdsdd","uono_date":null,"status":"Account Not Validated","last_process_date":"2024-09-12T15:32:56.500792","last_process_flag":159},{"acc_id":13585,"ref_no":"018292","ia_flag":"N","ifsc":"UBIN0539074","uono":null,"uono_date":null,"status":"Forwarded to GR T for Approval","last_process_date":"2024-04-16T12:05:31","last_process_flag":152}]`);
    // console.log("Selected Permission : ",  this.selectedPermissions);

  }


  load(query: DynamicQuery){
    this.apiservice.post<ApiResponse<PaginatedResponse<Institution>>>(this.url, query)
    .subscribe((response) => {
      this.tableData = {
        headers: [...this.tableData.headers], // Preserve headers and other metadata
        data: [...response.result.data],
        totalRecords: response.result.total
    };
    this.cdr.detectChanges();
    });
    // console.log(this.tableData);
    
  }


  handleRowSelection(event: any) {
    console.log('Row selected:', event);
  }

  handleQueryParameterChange(event: any) {
    console.log('Query parameters changed:', JSON.stringify(event));
    this.load(event)
  }
  cellClickHandler(rowData: any) {
    alert(JSON.stringify(rowData))
  }

  actionButtonClickHandler(data:any){
    console.log(data)
  }


}
