import { Component, OnInit, Output, EventEmitter  } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  @Output() getInitConfig: EventEmitter<any> = new EventEmitter();
  constructor() { }
  page = 'perfil';
  fTab = {
    classDP: ' active',
    classPC: '',
    classFA: ''
  };
  fTabContent = {
    classDP: true,
    classPC: false,
    classFA: false
  };
  fData = {
    fPerfil: {},
    fPersonal: {
      tipoDocumento: null,
      genero: 'M',
    }
  };
  onTabMe(destino) {
    if (destino === 'DP') {
      this.fTab.classDP = ' active';
      this.fTab.classPC = ' ';
      this.fTab.classFA = ' ';
      this.fTabContent.classDP = true;
      this.fTabContent.classPC = false;
      this.fTabContent.classFA = false;
    }
    if (destino === 'PC') {
      this.fTab.classDP = ' ';
      this.fTab.classPC = ' active';
      this.fTab.classFA = ' ';
      this.fTabContent.classDP = false;
      this.fTabContent.classPC = true;
      this.fTabContent.classFA = false;
    }
    if (destino === 'FA') {
      this.fTab.classDP = ' ';
      this.fTab.classPC = ' ';
      this.fTab.classFA = ' active';
      this.fTabContent.classDP = false;
      this.fTabContent.classPC = false;
      this.fTabContent.classFA = true;
    }
  }
  ngAfterViewInit() {
    this.getInitConfig.emit({ class: '', login: false });
  }
  ngOnInit() {
  }

}
