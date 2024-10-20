import { Routes } from "@angular/router";

export const BodyRoute : Routes = [
    {
        path: '',
        loadComponent: () => import('./dashboard/dashboard.component').then(c => c.DashboardComponent)
    },
    {
        path: 'employee',
        loadComponent: () => import('./employee/employee.component').then(c => c.EmployeeComponent)
    },
    {
        path: 'test',
        loadComponent: () => import('./common/dynamic-table/test.component').then(c => c.TestComponent)
    }
    
    
]