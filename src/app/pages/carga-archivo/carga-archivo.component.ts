import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

import { Recinto } from 'app/_model/recinto';
import { Usuario } from 'app/_model/usuario';

import {
  LoginService, 
  RecintoService, 
  UsuarioService
} from 'app/_service/services';

import { HOST } from 'app/_shared/var.constant';



@Component({
  selector: 'app-carga-archivo',
  templateUrl: './carga-archivo.component.html',
  styleUrls: ['./carga-archivo.component.scss']
})
export class CargaArchivoComponent implements OnInit, AfterViewInit {
  
  /* placa: string = '';
  fechaInicialSelec: Date = new Date();
  fechaFinalSelec: Date = new Date(); */
  recintos: Recinto[] = []
  /* pesajes: Pesaje[] = []; */

  file_upload_config;

  displayedColumns: string[] = ['placa', 'pesoBruto', 'pesoNeto', 'pesoTara', 'operacion', 'fecha', 'recintoCod'];
  /* dataSourcePesajes = new MatTableDataSource<Pesaje>(this.pesajes); */

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    /* this.dataSourcePesajes.paginator = this.paginator; */
  }

  constructor(
    private recintoService: RecintoService,
    /* private datepipe: DatePipe, */
    private loginService: LoginService,
    private usuarioService: UsuarioService,
  ) {
    this.file_upload_config = {
      /* API: this.global_utilities.getAPI('file_upload'), */
      API: `${HOST}/controlOperativo/cargaArchivo`,
      MIME_types_accepted: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      is_multiple_selection_allowed: true,
      data: null,
      recinto: null
    };
   }

  ngOnInit(): void {
    /* this.listarRecintos(); */
    this.usuarioService.listarUsuarioPorId(this.loginService.getUserNameFromToken())
        .subscribe((usuario: Usuario) => {
          this.file_upload_config.recinto = usuario.recinto.recCod;
        });
  }

  listarRecintos() {
    this.recintoService.listarRecintos()
      .subscribe(recintos => this.recintos = recintos);
  }


}
