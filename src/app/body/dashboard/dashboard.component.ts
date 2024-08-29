import { Component, OnInit } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [DropdownModule, FormsModule],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent {
}
