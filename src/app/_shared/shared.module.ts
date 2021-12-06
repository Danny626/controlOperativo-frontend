import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingDialogComponent } from './loading-dialog/loading-dialog.component';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { InfoDialogComponent } from './info-dialog/info-dialog.component';
import { DragAndDropDirective } from './drag-and-drop-directive/drag-and-drop.directive';
import { FileUploaderComponent } from './file-uploader/file-uploader.component';
import { DialogComponent } from './dialog/dialog.component';
import { ReactiveFormsModule } from '@angular/forms';

import {MatTabsModule} from '@angular/material/tabs';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatRadioModule} from '@angular/material/radio';
import {MatMenuModule} from '@angular/material/menu';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSidenavModule} from '@angular/material/sidenav';

const sharedComponents = [LoadingDialogComponent, ErrorDialogComponent, FileUploaderComponent, DragAndDropDirective, DialogComponent];

@NgModule({
  declarations: [...sharedComponents, InfoDialogComponent],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatDialogModule,
    MatTabsModule,
    MatInputModule,
    MatSelectModule,
    MatRippleModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatRadioModule,
    MatMenuModule,
    MatExpansionModule,
    MatProgressBarModule,
    MatTooltipModule,
    MatTableModule,
    MatPaginatorModule,
    MatSidenavModule
  ],
  exports: [...sharedComponents],
  /* providers: [ErrorDialogService, LoadingDialogService], */
  entryComponents: [...sharedComponents],
})
export class SharedModule { }
