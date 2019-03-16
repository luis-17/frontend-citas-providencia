import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpClient } from '@angular/common/http';

// import { EmpleadoService } from '../../services/empleado.services'; 
// import { EmpleadoResponse } from '../../dto/EmpleadoResponse';

// export interface EmpleadoData {
//     title: string;
//     destino: string;  
// }

// eleccion de turnos
@Component({
    selector: 'eleccion.turno.component',
    templateUrl: './eleccion.turno.component.html',
    styleUrls: ['./eleccion.turno.component.scss']
})
export class EleccionTurnoComponent{ 
    // public rowDataEmpleado: any;
    // public rowSelection;
    constructor(public dialogRef: MatDialogRef<EleccionTurnoComponent>,private http: HttpClient) { }
    eleccionTurno = 1;
    // fEmpleado = {
    //   cuadroBusqueda : '' 
    // };
    elegirTurno(){
      
    }
    onDialogClose(): void {
      this.dialogRef.close();
    }
}