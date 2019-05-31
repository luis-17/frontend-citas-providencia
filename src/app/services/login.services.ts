import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { webServiceEndpoint, listEndpoints } from '../common';
import { LoginResponse } from '../dto/login';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(numeroDocumento: string, clave: string): Observable<LoginResponse>{
    return this.http.post<LoginResponse>(`${webServiceEndpoint}${listEndpoints.login}`, {
      username: numeroDocumento,
      password: clave
    });
  }
}
