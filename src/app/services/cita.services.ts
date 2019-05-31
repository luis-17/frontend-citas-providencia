import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { webServiceEndpoint, listEndpoints } from '../common';
import { DefaultResponse } from '../dto/default';
@Injectable({
  providedIn: 'root'
})
export class CitaService {

  constructor(private http: HttpClient) { }
  listarCitasPendientes(): Observable<DefaultResponse>{
    return this.http.get<DefaultResponse>(`${webServiceEndpoint}${listEndpoints.cargaCitasPendientes}`);
  }
  listarCitasRealizadas(): Observable<DefaultResponse>{
    return this.http.get<DefaultResponse>(`${webServiceEndpoint}${listEndpoints.cargaCitasRealizadas}`);
  }
  anularCita(params): Observable<DefaultResponse>{
    return this.http.post<DefaultResponse>(`${webServiceEndpoint}${listEndpoints.anulaCita}`, params);
  }
}
