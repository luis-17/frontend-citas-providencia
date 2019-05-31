import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { webServiceEndpoint, listEndpoints } from '../common';
// import { PacienteNuevoResponse } from '../dto/paciente';
import { DefaultResponse } from '../dto/default';
// import { PerfilResponse } from '../dto/perfil';
@Injectable({
  providedIn: 'root'
})
export class FamiliarService {

  constructor(private http: HttpClient) { }
  
  cargarFamiliaresDePaciente(): Observable<DefaultResponse>{
    return this.http.get<DefaultResponse>(`${webServiceEndpoint}${listEndpoints.cargaFamiliares}`);
  }
  registrarFamiliar(params): Observable<DefaultResponse>{
    return this.http.post<DefaultResponse>(`${webServiceEndpoint}${listEndpoints.registroFamiliar}`, params);
  }
  actualizarFamiliar(params): Observable<DefaultResponse>{
    return this.http.post<DefaultResponse>(`${webServiceEndpoint}${listEndpoints.actualizaFamiliar}`, params);
  }
  anularFamiliar(params): Observable<DefaultResponse>{
    return this.http.post<DefaultResponse>(`${webServiceEndpoint}${listEndpoints.anulaFamiliar}`, params);
  }
}
