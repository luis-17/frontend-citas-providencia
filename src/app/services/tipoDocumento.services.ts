import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class TipoDocumentoService {

  constructor(private http: HttpClient) { }

  listar() {
    return this.http.get('./assets/data/tipoDocumento.json');
  }
}
