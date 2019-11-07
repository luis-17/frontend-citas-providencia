import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { NgxNotifierService } from 'ngx-notifier';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ConfAnularCitaComponent } from "../historial/conf.anular.cita/conf.anular.cita.component";
import { ConfPagarCitaComponent } from "../historial/conf.pagar.cita/conf.pagar.cita.component";
import { CitaService } from '../../services/cita.services';
@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.scss']
})
export class HistorialComponent implements OnInit {
  @Output() getInitConfig: EventEmitter<any> = new EventEmitter();
  constructor(
    public dialog: MatDialog,
    private citaService: CitaService,
  ) { }
  page = 'historial';
  arrCitasPendientes = [];
  arrCitasRealizadas = [];
  fTab = {
    classCP: ' active',
    classCR: '',
  };
  fTabContent = {
    classCP: true,
    classCR: false,
  };
  openConfirmAnularCita(params){
    const dialogRef = this.dialog.open(ConfAnularCitaComponent, {
      width: '640px',
      data: {
        idcita: params,
      }
    }); 
    dialogRef.afterClosed().subscribe(() => {
      this.cargarCitasPendientes();
      this.cargarCitasRealizadas();
    }); 
  }
  openConfirmPagarCita(params){
    const dialogRef = this.dialog.open(ConfPagarCitaComponent, {
      width: '640px',
      data: params
    }); 
    dialogRef.afterClosed().subscribe(() => {
      this.cargarCitasPendientes();
      this.cargarCitasRealizadas();
    }); 
  }
  onTabMe(destino) {
    if (destino === 'CP') {
      this.fTab.classCP = ' active';
      this.fTab.classCR = ' ';
      this.fTabContent.classCP = true;
      this.fTabContent.classCR = false;
    }
    if (destino === 'CR') {
      this.fTab.classCP = ' ';
      this.fTab.classCR = ' active';
      this.fTabContent.classCP = false;
      this.fTabContent.classCR = true;
    }
  }
  ngAfterViewInit() {
    this.getInitConfig.emit({ class: '', login: false });
  }
  ngOnInit() {
    this.cargarCitasPendientes();
    this.cargarCitasRealizadas();
  }
  cargarCitasPendientes() {
    this.citaService.listarCitasPendientes().subscribe(
      r => {
        this.arrCitasPendientes = r.datos;
      });
  }
  cargarCitasRealizadas() {
    this.citaService.listarCitasRealizadas().subscribe(
      r => {
        this.arrCitasRealizadas = r.datos;
      });
  }
}
