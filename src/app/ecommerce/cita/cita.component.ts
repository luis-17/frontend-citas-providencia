import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ngx-custom-validators';
import { NgxNotifierService } from 'ngx-notifier';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MatDialog } from '@angular/material';

import { PacienteService } from '../../services/paciente.services';
import { ParentescoService } from '../../services/parentesco.services';

import { EleccionTurnoComponent } from "../cita/popup-turno/eleccion.turno.component";
import { ConfPagarCitaComponent } from "../cita/conf.pagar.cita/conf.pagar.cita.component";
@Component({
  selector: 'app-cita',
  templateUrl: './cita.component.html',
  styleUrls: ['./cita.component.scss']
})
export class CitaComponent {
  @Output() getInitConfig: EventEmitter<any> = new EventEmitter();
  constructor(
    public dialog: MatDialog,
    private pacienteService: PacienteService,
    private parentescoService: ParentescoService
  ) { }
  page = 'cita';
  arrPacientes = ['a','b'];
  arrEspecialidad = [];
  arrParentesco = [];
  arrMedico = [];
  arrGarante = [];
  fData = {
    especialidad: null,
    paciente: null,
    garante: null,
    medico: null 
  };
  ngOnInit() {
    this.pacienteService.listarPacientes().subscribe(
      r => {
        this.arrPacientes = r.datos;
        console.log(this.arrPacientes, 'r.datos');
      });
    this.parentescoService.listar().subscribe(
      r => {
        // console.log(r, 'rrrr');
        this.arrParentesco = r.datos;
      });
  }
  
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
  // validacion "pacientesCita"
	formCitaPaciente = new FormGroup({
		paciente : new FormControl('', [Validators.required]),
		especialidad : new FormControl('', [Validators.required]),
		medico : new FormControl('', [Validators.required]),
    garante : new FormControl('', [Validators.required]),
	});

}