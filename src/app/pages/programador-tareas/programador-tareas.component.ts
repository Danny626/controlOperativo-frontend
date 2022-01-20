import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

import { Recinto } from 'app/_model/recinto';
import { Tarea } from 'app/_model/tarea';
import { EstadoParte } from 'app/_model/estadoParte';

import { BodyRegistroParteSuma } from 'app/_dto/bodyRegistroParteSuma.dto';

import { 
  RecintoService,
  TareaService,
  InfoDialogService,
  LoginService
} from 'app/_service/services';
import { ParamsMisPartesSuma } from 'app/_dto/paramsMisPartesSuma.dto';
import { TareaDialogComponent } from './tarea-dialog/tarea-dialog.component';

@Component({
  selector: 'app-programador-tareas',
  templateUrl: './programador-tareas.component.html',
  styleUrls: ['./programador-tareas.component.scss']
})
export class ProgramadorTareasComponent implements OnInit {

  formTarea: FormGroup;
  recintoSelec: Recinto;

  tareas: Tarea[] = [];
  recintos: Recinto[] = []

  tipoSelec: string;

  displayedColumns: string[] = [
    'id',
    'nombre',
    'tipo',
    'cron',
    'body',
    'recinto',
    'accionesTarea'
  ];

  hide = true;

  dataSourceTareas = new MatTableDataSource<Tarea>(this.tareas);

  constructor(
    private recintoService: RecintoService,
    private tareaService: TareaService,
    private infoDialogService: InfoDialogService,
    private loginService: LoginService,
    public dialog: MatDialog
  ) {
    this.formTarea = new FormGroup({
      'nombre': new FormControl('', [Validators.required]),
      'tipo': new FormControl('', [Validators.required]),
      'cron': new FormControl('', [Validators.required]),
      'recinto': new FormControl('', [Validators.required]),
      'usuarioSuma': new FormControl('', [Validators.required]),
      'passwordSuma': new FormControl('', [Validators.required]),
      /* 'body': new FormControl('', [Validators.required]), */
    });
  }

  ngOnInit(): void {
    this.listarRecintos();
    this.listarTareas();
  }

  crearTarea(formDirective: FormGroupDirective) {
    const estadoParte = new EstadoParte();
    const paramsMisPartesSuma = new ParamsMisPartesSuma();
    const fechaActual = new Date();
    
    const bodyRegistroParteSuma: BodyRegistroParteSuma = {
      usuario: this.loginService.getUserNameFromToken(),
      token: '',
      bodyMisPartesSuma: {
        estadoParte: estadoParte.getEstadosParteSuma().map((estado: EstadoParte) => estado.nombre)
      },
      paramsMisPartesSuma: paramsMisPartesSuma.getParamsMisPartesSuma('INTERIOR', fechaActual, fechaActual, ''),
      bodyLoginSuma: {
        nombreUsuario: this.formTarea.value['usuarioSuma'],
        password: this.formTarea.value['passwordSuma'],
        tipo: 'EXTERNO'
      },
      codRecinto: this.loginService.getRecintoActual().recCod
    };

    const tareaCreada = new Tarea();
    tareaCreada.body = JSON.stringify(bodyRegistroParteSuma);
    tareaCreada.cron = this.formTarea.value['cron'];
    tareaCreada.nombre = this.formTarea.value['nombre'];
    tareaCreada.tipo = this.formTarea.value['tipo'];
    tareaCreada.recinto = this.formTarea.value['recinto'];

    this.tareaService.registrar(tareaCreada)
      .subscribe((responseTarea: Tarea) => {
        this.infoDialogService.openDialog(
          `Tarea ${responseTarea.nombre} creada`,
          'success'
        );

        this.listarTareas();
        formDirective.resetForm();
        this.formTarea.reset();
      });
  }

  listarRecintos() {
    this.recintoService.listarRecintos()
      .subscribe(recintos => this.recintos = recintos);
  }

  listarTareas() {
    this.tareaService.listarTareas()
      .subscribe(responseTareas => this.dataSourceTareas.data = responseTareas);
  }

  modificarTarea(tarea: Tarea) {
    const dialogRef = this.dialog.open(TareaDialogComponent, {
      data: tarea
    });

    dialogRef.afterClosed().subscribe(tareaModificada => {
      if ( tareaModificada !== null ) {
        this.tareaService.modificar(tareaModificada)
          .subscribe(( responseTareaModificada: Tarea ) => {
            this.infoDialogService.openDialog(
              `Tarea ${responseTareaModificada.nombre} modificada`,
              'success'
              );

            this.listarTareas();
          });
      };
    });

    
  }

}
