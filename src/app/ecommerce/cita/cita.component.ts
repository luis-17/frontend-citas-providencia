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
import { HorarioService } from '../../services/horario.services';
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
    private horarioService: HorarioService,
    private http: HttpClient,
  ) { }
  objTurno: object;
  // turno: string;
  paciente: string = '-';
  especialidad: string = '-';
  medico: string = '-';
  garante: string = '-';
  fecha: string = '-';
  hora: string = '-';
  page = 'cita';
  paso1 = 'section-active';
  paso2 = 'section-inactive';
  paso3 = 'section-inactive';
  periodoActual = (moment().format('Y') + moment().format('MM')).toString();
  // periodoActual = '201905';
  arrPacientes = [];
  arrEspecialidad = [];
  arrParentesco = [];
  arrMedico = [];
  arrCalendario = {
    calendario: [],
    periodoAnterior: null,
    periodoSiguiente: null,
  };
  showCalendario = false;
  arrGarante = [];
  fData = {
    especialidad: null,
    paciente: null,
    garante: null,
    medico: null 
  };
  ngOnInit() {
    // PACIENTE
    this.pacienteService.listarPacientes().subscribe(
      r => {
        this.arrPacientes = r.datos;
      });
    // ESPECIALIDAD
    this.especialidadService.cargarEspecialidades().subscribe(
      r => {
        this.arrEspecialidad = r.datos;
      });
    // PARENTESCO
    this.parentescoService.listar().subscribe(
      r => {
        this.arrParentesco = r.datos;
      });
    // GARANTE
    this.garanteService.listar().subscribe(
      r => {
        this.arrGarante = r.datos;
      });
    // MOCK FECHAS
    this.getCalendarioMock(null, false);
    this.
      formCitaPaciente.
      valueChanges.
      subscribe(form => {
        // sessionStorage.setItem('form', JSON.stringify(form));
        console.log(JSON.stringify(form), 'JSON.stringify(form)');
        this.paciente = form.paciente.paciente || '-';
        this.especialidad = form.especialidad.descripcion || '-';
        this.medico = form.medico.descripcion || '-';
        this.garante = form.garante.descripcion_gar || '-';
        this.fecha = '-';
        this.hora = '-';
      });
  }
  getMedicosPorEspecialidad(idespecialidad){
    console.log(idespecialidad, 'idespecialidadidespecialidad');
    this.ngxLoader.start(); 
    this.especialidadService.cargarMedicosEspecialidad({periodo: this.periodoActual, idespecialidad}).subscribe(
      r => {
        this.arrMedico = r.datos;
        this.paso2 = 'section-active';
        this.ngxLoader.stop();
        // this.arrPacientes = this.http.get('./assets/data/especialidad.json')
      }, 
			r => {
        this.arrMedico = [];
        this.medico = '-';
        this._ngxNotifierService.createToast(JSON.stringify(r.error.message), 'warning', 6000);
        this.paso2 = 'section-active';
				this.ngxLoader.stop();
    });
  }
  getCalendarioActions(dir){
    if(dir === 'prev'){
      this.periodoActual = this.arrCalendario.periodoAnterior;
    }
    if(dir === 'next'){
      this.periodoActual = this.arrCalendario.periodoSiguiente;
    }
    // console.log(this.periodoActual, 'this.periodoActualll');
    const idpaciente = this.formCitaPaciente.get('paciente').value.id;
    const idmedico = this.formCitaPaciente.get('medico').value.idmedico;
    const idespecialidad = this.formCitaPaciente.get('especialidad').value.idespecialidad;
    // console.log(this.periodoActual, 'periodo');
    // console.log(idmedico, 'idmedico');
    if (!idpaciente) {
      this._ngxNotifierService.createToast('Seleccione al paciente antes de navegar por el calendario', 'warning', 5000);
      return false;
    }
    if (!idespecialidad) {
      this._ngxNotifierService.createToast('Seleccione especialidad antes de navegar por el calendario', 'warning', 5000);
      return false;
    }
    if (!idmedico) {
      this.getCalendarioMock(this.periodoActual, true);
      this._ngxNotifierService.createToast('Seleccione el médico deseado', 'warning', 5000);
      return false;
    }
    
    this.getCalendarioMes(this.periodoActual, idmedico);
  }
  getCalendarioMock(argPeriodo, flagMedico){
    const periodo = argPeriodo || this.periodoActual;
    this.horarioService.listarMock({ periodo }).subscribe(
      r => {
        this.arrCalendario = r.datos;
        const idespecialidad = this.formCitaPaciente.get('especialidad').value.idespecialidad;
        if (flagMedico === true) {
          this.getMedicosPorEspecialidad(idespecialidad);
        }
      });
  }
  getCalendarioMes(argPeriodo = null, idmedico){
    // console.log('change me xD');
    // console.log();
    const idespecialidad = this.formCitaPaciente.get('especialidad').value.idespecialidad;
    const periodo = argPeriodo || this.periodoActual;
    // console.log(periodo, 'periodo');
    this.ngxLoader.start(); 
    this.horarioService.listarCalendarioMes({periodo, idespecialidad, idmedico}).subscribe(
      r => {
        this.arrCalendario = r.datos;
        // this.showCalendario = true;
        // this.paso2 = 'section-active';
        this.ngxLoader.stop();
      }, 
			r => {
        this.arrCalendario = r.datos;
        // this.showCalendario = false;
        // this.paso2 = 'section-inactive';
        console.log(r.error,'rrrr.error');
				this._ngxNotifierService.createToast(JSON.stringify(r.error.message), 'warning', 6000);
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
  openDialogTurno(fecha, clase){
    if(!(clase.trim() === 'active')){
      return false;
    }
    const idespecialidad = this.formCitaPaciente.get('especialidad').value.idespecialidad;
    const idmedico = this.formCitaPaciente.get('medico').value.idmedico;
    const dialogRef = this.dialog.open(EleccionTurnoComponent, {
      width: '640px',
      data: {
        title: 'Elección de Turno',
        fecha,
        idespecialidad,
        idmedico,
        turno: this.objTurno,
      }
    }); 
    dialogRef.afterClosed().subscribe(result => {
      // this.objTurno = result.turno;
      // console.log(this.objTurno, 'this.objTurno');
      this.paso3 = 'section-active';
      this.fecha = fecha;
      this.hora = result.turno.hora_inicio;
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
    garante : new FormControl('', []),
	});

}