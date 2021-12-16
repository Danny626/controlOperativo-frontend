import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { CargaArchivoModule } from 'app/pages/carga-archivo/carga-archivo.module';
import { ComponentsModule } from 'app/components/components.module';
import { AdminLayoutComponent } from './admin-layout.component';
import { DescargaPartesSumaModule } from 'app/pages/descarga-partes-suma/descarga-partes-suma.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    AdminLayoutRoutes,
    ComponentsModule,
    CargaArchivoModule,
    DescargaPartesSumaModule
  ],
  declarations: [
    AdminLayoutComponent
  ]
})

export class AdminLayoutModule {}
