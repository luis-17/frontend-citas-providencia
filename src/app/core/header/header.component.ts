import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ObservableMedia, MediaChange} from '@angular/flex-layout';
import { Router } from '@angular/router';
import { PacienteService } from '../../services/paciente.services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() arrMenuToggle;
  @Input() arrInitConfig;
  arrParams = {};
  fPerfil = {};
  constructor(
    private router: Router,
    private pacienteService: PacienteService,
    private media: ObservableMedia
  ) { }
  classToggle = 'semion';
  onDesplegarMenu(){
    this.classToggle = this.classToggle === 'semion' ? 'on': 'semion';
  }
  ngOnInit() {
    this.pacienteService.cargarPerfilGeneral().subscribe(
      r => {
        this.fPerfil = r.datos;
      });
    this.media.asObservable()
      .subscribe((changes: MediaChange) => {
        if( changes.mqAlias == 'sm' || changes.mqAlias == 'xs' ){
          this.classToggle = 'semion';
        }else{
          this.classToggle = 'off';
        }
      });
  }
  onCerrarSesion(){
    this.arrInitConfig.login = true; 
    this.arrInitConfig.class = ' login';
    this.router.navigate(['login']);
    localStorage.removeItem('TOKEN');
  };
}
