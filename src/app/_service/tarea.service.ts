import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { HOST, TOKEN_NAME } from 'app/_shared/var.constant';
import { Tarea } from 'app/_model/tarea';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TareaService {

  url: string = `${HOST}/tarea`;
  tareaCambio = new Subject<Tarea[]>();
  mensaje = new Subject<string>();

  constructor(private http: HttpClient) { }

  listarTareas() {
    const access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;

    return this.http.get<Tarea[]>(`${this.url}/obtenerTareas`, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  registrar(tarea: Tarea) {
    const access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;

    return this.http.post(`${this.url}/crearTarea`, tarea, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  modificar(tarea: Tarea) {
    const access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;

    return this.http.put(`${this.url}/modificarTarea`, tarea, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`)
        .set('Content-Type', 'application/json'),
    });
  }

  eliminar(id: number) {
    const access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;
    
    return this.http.delete(`${this.url}/${id}`, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`)
        .set('Content-Type', 'application/json'),
    });
  }

}
