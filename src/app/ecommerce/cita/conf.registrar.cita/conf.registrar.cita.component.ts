import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NgxNotifierService } from 'ngx-notifier';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { CitaService } from '../../../services/cita.services';

import * as moment from 'moment';

@Component({
  selector: 'app-conf.registrar.cita',
  templateUrl: './conf.registrar.cita.component.html',
  styleUrls: ['./conf.registrar.cita.component.scss']
})
export class ConfRegistrarCitaComponent implements OnInit {

  constructor(
    private router: Router,
    public dialogRef: MatDialogRef<ConfRegistrarCitaComponent>,
    private _ngxNotifierService: NgxNotifierService,
    private ngxLoader: NgxUiLoaderService,
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data,
    private citaService: CitaService,
  ) { }

  ngOnInit() {
  }
  confirmarCita() {
    const strInicio = this.timeToDecimal(this.data.turno.hora_inicio);
    const strFin = this.timeToDecimal(this.data.turno.hora_fin);
    const strDuracionCita = (strFin - strInicio) * 60;
    // console.log(this.data.fecha, 'this.data.fecha');
    console.log(moment(this.data.fecha,'DD-MM-YYYY').format('YYYY-MM-DD'), 'convettifo');
    const arrParams = {
      idcliente: this.data.paciente.id,
      idgarante: this.data.garante.idgarante,
      idhorario: this.data.turno.idhorario,
      fecha_registro: null,
      fecha_cita: moment(this.data.fecha,'DD-MM-YYYY').format('YYYY-MM-DD'),
      hora_inicio: this.data.turno.hora_inicio,
      hora_fin: this.data.turno.hora_fin,
      duracionCita: strDuracionCita,
      idmedico: this.data.medico.idmedico,
      medico: this.data.medico.descripcion,
      especialidad: this.data.especialidad.descripcion,
    };
    this.ngxLoader.start(); 
    this.citaService.registrarCita(arrParams).subscribe(
      r => {
        
        // this.volverALogin();
        // this.cargarPerfilGeneral();
        this.ngxLoader.stop();
        this.router.navigate(['historial-citas']);
        this.dialogRef.close();
        this._ngxNotifierService.createToast(r.message, 'success', 6000);
      },
      r => {
        // console.log(r, 'r');
        this._ngxNotifierService.createToast(JSON.stringify(r.error.message), 'danger', 8000);
        this.ngxLoader.stop();
      },
    )
  }

  onDialogClose(): void {
    this.dialogRef.close();
  }
  timeToDecimal(time) {
    var hoursMinutes = time.split(':');
    var hours = parseInt(hoursMinutes[0], 10);
    var minutes = hoursMinutes[1] ? parseInt(hoursMinutes[1], 10) : 0;
    return hours + minutes / 60;
  }
}
