import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { webServiceEndpoint, listEndpoints } from '../common';
// import { PacienteNuevoResponse } from '../dto/paciente';
import { DefaultResponse } from '../dto/default';
import { CalendarioResponse } from '../dto/calendario';
@Injectable({
  providedIn: 'root'
})
export class HorarioService {

  constructor(private http: HttpClient) { }
  
  listarCalendarioMes(params): Observable<CalendarioResponse>{
    return this.http.post<CalendarioResponse>(`${webServiceEndpoint}${listEndpoints.cargaCalendarioMes}`, params);
  }

  listarMock(params): Observable<CalendarioResponse>{
    return this.http.post<CalendarioResponse>(`${webServiceEndpoint}${listEndpoints.cargaCalendarioMock}`, params);
  }
}
