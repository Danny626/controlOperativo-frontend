import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CargaArchivoComponent } from 'app/pages/carga-archivo/carga-archivo.component';
import { DescargaPartesSumaComponent } from 'app/pages/descarga-partes-suma/descarga-partes-suma.component';
import { GuardService } from 'app/_service/guard.service';
import { AdminLayoutComponent } from './admin-layout.component';

const routes: Routes = [{
    path: '',
    component: AdminLayoutComponent,
    children: [
        { 
            path: 'cargaArchivo',        
            component: CargaArchivoComponent, 
            canActivate: [GuardService] 
        },
        { 
            path: 'descargaPartesSuma',
            component: DescargaPartesSumaComponent, 
            canActivate: [GuardService] 
        },
        {
            path: '',
            redirectTo: 'cargaArchivo',
            pathMatch: 'full',
        },
        /*{ 
        path: '**',
        component: NotFoundComponent,
        }, */
    ]
}];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ],
  })
export class AdminLayoutRoutes { }
