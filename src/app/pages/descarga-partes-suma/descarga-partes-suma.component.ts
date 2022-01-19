import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

import { 
  LoginService, 
  SumaService,
  InfoDialogService
 } from 'app/_service/services';

import { EstadoParte } from 'app/_model/estadoParte';
import { Recinto } from 'app/_model/recinto';

import { BodyRegistroParteSuma } from 'app/_dto/bodyRegistroParteSuma.dto';
import { BodyMisPartesSuma } from 'app/_dto/bodyMisPartesSuma.dto';
import { ParamsMisPartesSuma } from 'app/_dto/paramsMisPartesSuma.dto';
import { BodyLoginSuma } from 'app/_dto/bodyLoginSuma.dto';

import { UsuarioSumaDialogComponent } from './usuario-suma-dialog/usuario-suma-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { ParteSuma } from 'app/_model/parteSuma';

declare var $: any;

@Component({
  selector: 'app-descarga-partes-suma',
  templateUrl: './descarga-partes-suma.component.html',
  styleUrls: ['./descarga-partes-suma.component.scss']
})
export class DescargaPartesSumaComponent implements OnInit, AfterViewInit {

  formDescarga: FormGroup;
  selectedEstadoParte: string;
  recinto: Recinto;
  usuarioSuma: string;
  passwordSuma: string;

  minDate: Date;
  maxDate: Date;

  partesSuma: ParteSuma[] = [];

  displayedColumns: string[] = [
      'cor',
      'fecTra',
      'dstOea',
      'dstCodTipDoc',
      'dstNumDoc',
      'dstNomRazSoc',
      'estAct',
      'datgenNumMan',
      'datgenNumDocEmb',
      'datgenFecing',
      'ingubimerModregDes',
      'ingubimerAlmCod',
      'inftecDocfirUsrfir',
      'contotsobfalCanrec',
      'contotsobfalPesrec'
    ];

  dataSourcePartesSuma = new MatTableDataSource<ParteSuma>(this.partesSuma);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSourcePartesSuma.paginator = this.paginator;
  }

  constructor(
    private loginService: LoginService,
    private sumaService: SumaService,
    private infoDialogService: InfoDialogService,
    public dialog: MatDialog
  ) {
    const currentDate = new Date();
    this.minDate = currentDate;
    this.maxDate = currentDate;

    this.formDescarga = new FormGroup({
      /* 'estadoParteSuma': new FormControl('', [Validators.required]), */
      'fechaInicial': new FormControl(new Date(), [Validators.required]),
      /* 'fechaFinal': new FormControl(''), */
    });
   }

  ngOnInit(): void {
    this.recinto = this.loginService.getRecintoActual();
  }

  // abre el dialog para obtener el usuario y password de suma
  openUsuarioSumaDialog(): void {
    const dialogRef = this.dialog.open(UsuarioSumaDialogComponent, {
      width: '350px',
      data: {}
    });

    dialogRef.afterClosed().subscribe((result: BodyLoginSuma) => {
      if ( result !== null ) {
        this.descargarPartes(result)
      };
    });

  }

  // devuelve lista de estados partes suma (todos)
  cargaEstadosParteSuma(): EstadoParte[] {
    let estadoParte: EstadoParte = new EstadoParte();
    return estadoParte.getEstadosParteSuma();
  }

  // devuelve lista de estados partes suma en proceso
  /* cargaEstadosEnProcesoParteSuma(): EstadoParte[] {
    let estadoParte: EstadoParte = new EstadoParte();
    return estadoParte.getEstadosEnProcesoParteSuma();
  } */


  // devuelve lista de estados partes suma concluidos
  /* cargaEstadosConcluidoParteSuma(): EstadoParte[] {
    let estadoParte: EstadoParte = new EstadoParte();
    return estadoParte.getEstadosConcluidoParteSuma();
  } */

  descargarPartes(bodyLoginSuma: BodyLoginSuma) {    
    const usrName: string = this.loginService.getUserNameFromToken();

    let bodyRegistroParteSuma: BodyRegistroParteSuma = {
      usuario: usrName,
      token: '',
      bodyMisPartesSuma: this.getBodyEstadosParteSuma(),
      paramsMisPartesSuma: this.getParamsMisPartesSuma('AEROPUERTO'),
      bodyLoginSuma: bodyLoginSuma,
      codRecinto: this.loginService.getRecintoActual().recCod
    };

    // mandamos al servicio el requerimiento de descarga y registro de los partes suma
    this.sumaService.registroPartesSuma(bodyRegistroParteSuma).subscribe(result => {
      this.dataSourcePartesSuma.data = result.partesSumaGuardados;
      
      let estadoInfo = 'success';
      if(result.registrosError.length !== 0) {
        estadoInfo = 'error';
      }

      this.infoDialogService.openDialog(
        `${result.registrosGuardados} registros guardados o modificados de ${result.totalRegistros}`,
        estadoInfo
      );
    });
  }

  // obtiene el objeto BodyMisPartesSuma
  getBodyEstadosParteSuma(): BodyMisPartesSuma {
    let listaEstadosParteSuma: string[] = [];
    let estadosParteSuma: EstadoParte[] = [];

    /* if(this.formDescarga.value['estadoParteSuma'] === 'PROCESO') {
      estadosParteSuma = this.cargaEstadosEnProcesoParteSuma();
    }

    if(this.formDescarga.value['estadoParteSuma'] === 'CONCLUIDO') {
      estadosParteSuma = this.cargaEstadosConcluidoParteSuma();
    } */

    // cargamos todos los estados
    estadosParteSuma = this.cargaEstadosParteSuma();

    estadosParteSuma.forEach(estado => {
      listaEstadosParteSuma.push(estado.nombre);
    });

    const bodyMisPartesSuma: BodyMisPartesSuma = {
      estadoParte: listaEstadosParteSuma
    };

    return bodyMisPartesSuma;
  }

  // obtiene el objeto ParamsMisPartesSuma según el tipo de recinto(AEROPUERTO, INTERIOR)
  getParamsMisPartesSuma(tipoRecinto: string): ParamsMisPartesSuma {
    const paramsMisPartesSuma = new ParamsMisPartesSuma();
    /* const fechaInicial = this.formDescarga.value['fechaInicial'];
    const fechaFinal = this.formDescarga.value['fechaInicial']; */

    const fechaInicial = this.formDescarga.value['fechaInicial'];
    const fechaFinal = fechaInicial;

    return paramsMisPartesSuma.getParamsMisPartesSuma(tipoRecinto, fechaInicial, fechaFinal, '');
  }

}
