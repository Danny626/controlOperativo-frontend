import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HOST, TOKEN_NAME } from 'app/_shared/var.constant';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CargaArchivoService {

  url: string = `${HOST}/controlOperativo`;
  /* recintoCambio = new Subject<Recinto[]>(); */
  mensaje = new Subject<string>();

  constructor(private http: HttpClient) { }

  cargarArchivoExcel(file: File) {
    const access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;

    const formdata: FormData = new FormData();
    formdata.append('file', file);

    return this.http.post(`${this.url}/cargaArchivo`, formdata, {
      responseType: 'text',
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`)
    });
  }

}
