import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';

import { EleccionTurnoComponent } from "../cita/popup-turno/eleccion.turno.component";
import { ConfPagarCitaComponent } from "../cita/conf.pagar.cita/conf.pagar.cita.component";
@Component({
  selector: 'app-cita',
  templateUrl: './cita.component.html',
  styleUrls: ['./cita.component.scss']
})
export class CitaComponent implements OnInit {
  @Output() getInitConfig: EventEmitter<any> = new EventEmitter();
  constructor(public dialog: MatDialog) { }
  page = 'cita';
  arrPaciente = [];
  arrEspecialidad = [];
  arrMedico = [];
  arrGarante = [];
  fData = {
    especialidad: null,
    paciente: null,
    garante: null,
    medico: null 
  };
  procesarCita(){
    
  }
  confirmarCita(){
    const dialogRef = this.dialog.open(ConfPagarCitaComponent, {
      width: '640px',
    }); 
    dialogRef.afterClosed().subscribe(() => {
      // this.fEmpl.fullname = localStorage.getItem('fullname');
      // this.fEmpl.id = localStorage.getItem('id');
    }); 
  }
  openDialogTurno(){
    const dialogRef = this.dialog.open(EleccionTurnoComponent, {
      width: '640px',
      data: {
        title: 'Elección de Turno'
      }
    }); 
    dialogRef.afterClosed().subscribe(() => {
      // this.fEmpl.fullname = localStorage.getItem('fullname');
      // this.fEmpl.id = localStorage.getItem('id');
    }); 
  }
  ngAfterViewInit() {
    this.getInitConfig.emit({ class: '', login: false });
  }
  ngOnInit() {
  }

}