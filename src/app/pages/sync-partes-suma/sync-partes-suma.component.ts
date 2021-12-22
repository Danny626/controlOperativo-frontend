import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ResultRegistroPartesSuma } from 'app/_dto/resultRegistroPartesSuma.dto';
import { ParteSuma } from 'app/_model/parteSuma';
import { 
  ControlOperativoService,
  InfoDialogService
 } from 'app/_service/services';

@Component({
  selector: 'app-sync-partes-suma',
  templateUrl: './sync-partes-suma.component.html',
  styleUrls: ['./sync-partes-suma.component.scss']
})
export class SyncPartesSumaComponent implements OnInit, AfterViewInit {

  partesSuma: ParteSuma[] = [];
  dataSourcePartesSuma = new MatTableDataSource<ParteSuma>(this.partesSuma);
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

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSourcePartesSuma.paginator = this.paginator;
  }

  constructor(
    private controlOperativoService: ControlOperativoService,
    private infoDialogService: InfoDialogService
  ) { }

  ngOnInit(): void {
  }

  sincronizarPartes() {
    this.controlOperativoService.syncPartes().subscribe((result: ResultRegistroPartesSuma) => {
      this.dataSourcePartesSuma.data = result.partesSumaGuardados;

      let estadoInfo = 'success';
      if(result.registrosError.length !== 0) {
        estadoInfo = 'error';
      }

      this.infoDialogService.openDialog(
        `${result.registrosGuardados} registros sincronizados de ${result.totalRegistros}`,
        estadoInfo
      );
    });
  }

}
