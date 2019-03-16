import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {LoginRequest} from '../dto/request/login.request';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(numeroDocumento: string, clave: string): Observable<LoginRequest>{
    return this.http.post<LoginRequest>('https://reqres.in/api/login', {
      email: numeroDocumento,
      password: clave
    });
  }
}
