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
export class EspecialidadService {

  constructor(private http: HttpClient) { }
  
  cargarEspecialidades(): Observable<DefaultResponse>{
    return this.http.get<DefaultResponse>(`${webServiceEndpoint}${listEndpoints.cargaEspecialidades}`);
  }
}
