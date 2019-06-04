import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CustomValidators } from 'ngx-custom-validators';
import { NgxNotifierService } from 'ngx-notifier';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MatDialog } from '@angular/material';

import { PacienteService } from '../../services/paciente.services';
import { ParentescoService } from '../../services/parentesco.services';
import { EspecialidadService } from '../../services/especialidad.services';
import { GaranteService } from '../../services/garante.services';

import { EleccionTurnoComponent } from "../cita/popup-turno/eleccion.turno.component";
import { ConfPagarCitaComponent } from "../cita/conf.pagar.cita/conf.pagar.cita.component";

import * as moment from 'moment';

@Component({
  selector: 'app-cita',
  templateUrl: './cita.component.html',
  styleUrls: ['./cita.component.scss']
})
export class CitaComponent {
  @Output() getInitConfig: EventEmitter<any> = new EventEmitter();
  constructor(
    private _ngxNotifierService: NgxNotifierService,
    private ngxLoader: NgxUiLoaderService,
    public dialog: MatDialog,
    private pacienteService: PacienteService,
    private parentescoService: ParentescoService,
    private especialidadService: EspecialidadService,
    private garanteService: GaranteService,
    private http: HttpClient,
  ) { }
  page = 'cita';
  periodo = moment().format('Y');
  arrPacientes = [];
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
    console.log(moment().format('Y'),'y');
    console.log(moment().format('m'), 'm');
    // PACIENTE
    this.pacienteService.listarPacientes().subscribe(
      r => {
        this.arrPacientes = r.datos;
      });
    // ESPECIALIDAD
    this.especialidadService.cargarEspecialidades().subscribe(
      r => {
        this.arrEspecialidad = r.datos;
        // this.arrPacientes = this.http.get('./assets/data/especialidad.json')
      });
    // PARENTESCO
    this.parentescoService.listar().subscribe(
      r => {
        // console.log(r, 'rrrr');
        this.arrParentesco = r.datos;
      });
    // GARANTE
    this.garanteService.listar().subscribe(
      r => {
        // console.log(r, 'rrrr');
        this.arrGarante = r.datos;
      });
  }
  listarMedicosPorEspecialidad(idespecialidad){
    // console.log('change me xD');
    this.ngxLoader.start(); 
    this.especialidadService.cargarMedicosEspecialidad({periodo, idespecialidad}).subscribe(
      r => {
        this.arrMedico = r.datos;
        // this.arrPacientes = this.http.get('./assets/data/especialidad.json')
      }, 
			r => {
				this._ngxNotifierService.createToast(JSON.stringify(r.message), 'danger', 4000);
				this.ngxLoader.stop();
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