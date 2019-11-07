import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { HorarioService } from '../../../services/horario.services';
import { NgxNotifierService } from 'ngx-notifier';
import { NgxUiLoaderService } from 'ngx-ui-loader';
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
    constructor(
      public dialogRef: MatDialogRef<EleccionTurnoComponent>,
      private _ngxNotifierService: NgxNotifierService,
      private ngxLoader: NgxUiLoaderService,
      private http: HttpClient,
      @Inject(MAT_DIALOG_DATA) public data,
      private horarioService: HorarioService,
      private fb: FormBuilder,
    ) { }
    formTurno: FormGroup;
    eleccionTurno = 1;
    arrHorario = [];
    // fEmpleado = {
    //   cuadroBusqueda : '' 
    // };
    ngOnInit() {
      const params = {
        idmedico: this.data.idmedico,
        idespecialidad: this.data.idespecialidad,
        fecha: this.data.fecha,
      }
      // this.ngxLoader.start(); 
      this.horarioService.listarHorario(params).subscribe(
        r => {
          this.arrHorario = r.datos;
          if(r.flag === 1){
            this._ngxNotifierService.createToast(JSON.stringify(r.message), 'success', 4000);
          }
          // this.ngxLoader.stop();
        }, 
        r => {
          this.arrHorario = [];
          this._ngxNotifierService.createToast(JSON.stringify(r.error.message), 'warning', 6000);
          // this.ngxLoader.stop();
        });
        this.formTurno = this.fb.group({
          turno: '',
        });
    }
    elegirTurno(form: HTMLFormElement){
      // console.log(form.value.turno, 'formmm');
      this.data.turno = form.value.turno;
      if(!form.value.turno){
        this._ngxNotifierService.createToast(JSON.stringify('Seleccione un turno para finalizar'), 'warning', 6000);
        return false;
      }
      this.dialogRef.close({turno: form.value.turno});
    }
    onDialogClose(): void {
      this.dialogRef.close();
    }
}