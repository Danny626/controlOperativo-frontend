import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent
  ]
})
export class ComponentsModule { }
