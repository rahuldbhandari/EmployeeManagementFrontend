import { Routes } from "@angular/router";

export const BodyRoute : Routes = [
    {
        path: '',
        loadComponent: () => import('./dashboard/dashboard.component').then(c => c.DashboardComponent)
    }
    
    
]