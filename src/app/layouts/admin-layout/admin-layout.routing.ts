import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { GuardService } from 'app/_service/guard.service';

import { AdminLayoutComponent } from './admin-layout.component';
import { CargaArchivoComponent } from 'app/pages/carga-archivo/carga-archivo.component';
import { SyncPartesSumaComponent } from 'app/pages/sync-partes-suma/sync-partes-suma.component';
import { DescargaPartesSumaComponent } from 'app/pages/descarga-partes-suma/descarga-partes-suma.component';
import { ProgramadorTareasComponent } from 'app/pages/programador-tareas/programador-tareas.component';

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
            path: 'syncPartesSuma',
            component: SyncPartesSumaComponent, 
            canActivate: [GuardService] 
        },
        { 
            path: 'programadorTareas',
            component: ProgramadorTareasComponent, 
            canActivate: [GuardService] 
        },
        {
            path: '',
            redirectTo: 'descargaPartesSuma',
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
