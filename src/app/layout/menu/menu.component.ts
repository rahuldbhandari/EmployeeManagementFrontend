import { OnInit, Component } from '@angular/core';
import { LayoutService } from '../service/layout.service';
import { CommonModule } from '@angular/common';
import { MenuitemComponent } from "../menuitem/menuitem.component";



@Component({
    selector: 'app-menu',
    standalone: true,
    templateUrl: './menu.component.html',
    imports: [CommonModule, MenuitemComponent]
})
export class MenuComponent implements OnInit {
  model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Dashboard',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: [''] }
                ]
            },
            {
                label: 'Employee',
                items: [
                    { label: 'Employee', icon: 'pi pi-fw pi-home', routerLink: ['/employee'] }
                ]
            },
            {
                label: 'Test',
                items: [
                    { label: 'Test', icon: 'pi pi-fw pi-home', routerLink: ['/test'] },
                    { label: 'SBMS Test', icon: 'pi pi-fw pi-home', routerLink: ['/sbms-test'] }
                ]
            }
        ];
    }
}
