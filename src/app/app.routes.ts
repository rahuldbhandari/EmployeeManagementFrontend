import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout/layout.component';
import { NgxPermissionsGuard } from 'ngx-permissions';
import { authGuard } from './auth.guard';


export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        loadChildren: () => import('./body/body.routes').then(r => r.BodyRoute),
        canActivate: [authGuard]
    }
];
