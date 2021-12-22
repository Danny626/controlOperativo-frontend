import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from 'app/_shared/shared.module';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SyncPartesSumaComponent } from './sync-partes-suma.component';



@NgModule({
  declarations: [
    SyncPartesSumaComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
  ]
})
export class SyncPartesSumaModule { }
