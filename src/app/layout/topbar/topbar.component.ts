import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LayoutService } from '../service/layout.service';
import { MenuItem } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { Dialog, DialogModule } from 'primeng/dialog';
import { ConfigComponent } from '../config/config.component';
import { DividerModule } from 'primeng/divider';

import { DropdownModule } from 'primeng/dropdown';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { environment } from '../../../environments/environment';

@Component({
    selector: 'app-topbar',
    standalone: true,
    templateUrl: './topbar.component.html',
    imports: [CommonModule, RouterLink, MenuModule, ButtonModule, DialogModule, RippleModule, ConfigComponent, DividerModule, DropdownModule, TieredMenuModule]

})
export class TopbarComponent implements OnInit {
  items!: MenuItem[];
  menuItems: MenuItem[] = [];

  @ViewChild('menubutton') menuButton!: ElementRef;

  @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

  @ViewChild('topbarmenu') menu!: ElementRef;

  @ViewChild('dialog') dialog!: Dialog;

  constructor(
    public layoutService: LayoutService,
    private router: Router
  ) {}

  ngOnInit(): void {

    this.menuItems = [];
  }

  confirmLogout() {
    // Open the confirmation dialog here
    this.dialog.visible = true;
  }

  logout() {
    // Perform logout actions here
    this.router.navigate(['/login']);
    // After logout, you can redirect the user to the login page or any other appropriate action
  }

  hideDialog() {
    this.dialog.visible = false;
  }

  onConfigButtonClick() {
    this.layoutService.showConfigSidebar();
  }

  get containerClass() {
    return {
        'layout-theme-light blinear-gradient-background': this.layoutService.config.colorScheme === 'light',
        'layout-theme-dark': this.layoutService.config.colorScheme === 'dark',
        'layout-overlay': this.layoutService.config.menuMode === 'overlay',
        'layout-static': this.layoutService.config.menuMode === 'static',
        'layout-static-inactive': this.layoutService.state.staticMenuDesktopInactive && this.layoutService.config.menuMode === 'static',
        'layout-overlay-active': this.layoutService.state.overlayMenuActive,
        'layout-mobile-active': this.layoutService.state.staticMenuMobileActive,
        'p-input-filled': this.layoutService.config.inputStyle === 'filled',
        'p-ripple-disabled': !this.layoutService.config.ripple
    }
}
}

