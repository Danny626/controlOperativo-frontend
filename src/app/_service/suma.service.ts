import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HOST, TOKEN_NAME } from 'app/_shared/var.constant';

import { BodyRegistroParteSuma } from 'app/_dto/bodyRegistroParteSuma.dto';
import { ResultRegistroPartesSuma } from 'app/_dto/resultRegistroPartesSuma.dto';

@Injectable({
  providedIn: 'root'
})
export class SumaService {

  url: string = `${HOST}/suma`;
  mensaje = new Subject<string>();

  constructor(private http: HttpClient) { }

  registroPartesSuma(bodyRegistroParteSuma: BodyRegistroParteSuma) {
    const access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;

    return this.http.post<ResultRegistroPartesSuma>(`${this.url}/registroPartesSuma`, bodyRegistroParteSuma, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`)
          .set('Content-Type', 'application/json'),
  });
  }
}
