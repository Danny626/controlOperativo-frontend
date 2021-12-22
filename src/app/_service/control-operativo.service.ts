import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HOST, TOKEN_NAME } from 'app/_shared/var.constant';
import { Subject } from 'rxjs';
import { ResultRegistroPartesSuma } from 'app/_dto/resultRegistroPartesSuma.dto';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class ControlOperativoService {

  url: string = `${HOST}/controlOperativo`;
  mensaje = new Subject<string>();

  constructor(
    private http: HttpClient,
    private loginService: LoginService
  ) { }

  syncPartes() {
    const access_token = JSON.parse(sessionStorage.getItem(TOKEN_NAME)).access_token;

    const usrName = this.loginService.getUserNameFromToken();
    const codRecinto = this.loginService.getRecintoActual();

    return this.http.get<ResultRegistroPartesSuma>(`${this.url}/syncPartes/${codRecinto}/${usrName}`, {
      headers: new HttpHeaders().set('Authorization', `bearer ${access_token}`)
        .set('Content-Type', 'application/json'),
    });
  }
}
