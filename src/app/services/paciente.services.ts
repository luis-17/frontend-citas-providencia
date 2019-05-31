import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { webServiceEndpoint, listEndpoints } from '../common';
import { PacienteNuevoResponse } from '../dto/paciente';
import { DefaultResponse } from '../dto/default';
import { PerfilResponse } from '../dto/perfil';
@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  constructor(private http: HttpClient) { }
  listarPacientes(): Observable<DefaultResponse>{
    return this.http.get<DefaultResponse>(`${webServiceEndpoint}${listEndpoints.cargaPaciente}`);
  }
  registrarPacienteNuevo(params): Observable<PacienteNuevoResponse>{
    return this.http.post<PacienteNuevoResponse>(`${webServiceEndpoint}${listEndpoints.registroPaciente}`, params);
  }
  validarCuenta(token): Observable<DefaultResponse>{
    return this.http.post<DefaultResponse>(`${webServiceEndpoint}${listEndpoints.validaCuenta}`, { token });
  }
  recuperarCuenta(params): Observable<DefaultResponse>{
    return this.http.post<DefaultResponse>(`${webServiceEndpoint}${listEndpoints.recuperaCuenta}`, params);
  }
  actualizarClave(params): Observable<DefaultResponse>{
    return this.http.post<DefaultResponse>(`${webServiceEndpoint}${listEndpoints.actualizaCuenta}`, params);
  }
  cargarPerfilGeneral(): Observable<PerfilResponse>{
    return this.http.get<PerfilResponse>(`${webServiceEndpoint}${listEndpoints.cargaPerfil}`);
  }
  actualizarPerfilPersonal(params): Observable<DefaultResponse>{
    return this.http.post<DefaultResponse>(`${webServiceEndpoint}${listEndpoints.actualizaPerfil}`, params);
  }
  subirFotoPerfil(params): Observable<DefaultResponse>{
    let httpparams = new HttpParams();
    const options = {
      params: httpparams,
      reportProgress: true,
    };
    return this.http.post<DefaultResponse>(`${webServiceEndpoint}${listEndpoints.subeFotoPerfil}`, params, options);
  }
}
