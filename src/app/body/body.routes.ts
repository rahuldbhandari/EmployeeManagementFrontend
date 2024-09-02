import { Routes } from "@angular/router";

export const BodyRoute : Routes = [
    {
        path: '',
        loadComponent: () => import('./dashboard/dashboard.component').then(c => c.DashboardComponent)
    },
    {
        path: 'employee',
        loadComponent: () => import('./employee/employee.component').then(c => c.EmployeeComponent)
    }
    
    
]