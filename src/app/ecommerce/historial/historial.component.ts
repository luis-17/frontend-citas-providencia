import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ConfAnularCitaComponent } from "../historial/conf.anular.cita/conf.anular.cita.component";
@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.scss']
})
export class HistorialComponent implements OnInit {
  @Output() getInitConfig: EventEmitter<any> = new EventEmitter();
  constructor(public dialog: MatDialog) { }
  page = 'historial';
  fTab = {
    classCP: ' active',
    classCR: '',
  };
  fTabContent = {
    classCP: true,
    classCR: false,
  };
  openConfirmAnularCita(){
    const dialogRef = this.dialog.open(ConfAnularCitaComponent, {
      width: '640px',
    }); 
    dialogRef.afterClosed().subscribe(() => {
      // this.fEmpl.fullname = localStorage.getItem('fullname');
      // this.fEmpl.id = localStorage.getItem('id');
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
  }

}
