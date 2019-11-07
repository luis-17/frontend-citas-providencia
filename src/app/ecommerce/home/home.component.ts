import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { NgxNotifierService } from 'ngx-notifier';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Router } from '@angular/router';
import { PacienteService } from '../../services/paciente.services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit  {
  @Output() getInitConfig: EventEmitter<any> = new EventEmitter();
  constructor( 
    private router: Router,
    private _ngxNotifierService: NgxNotifierService,
    private ngxLoader: NgxUiLoaderService,
    private pacienteService: PacienteService,
  ) { }
  page = 'home';
  fPerfil = {};
  @Input() arrInitConfig; 
  ngAfterViewInit() {
    this.getInitConfig.emit({ class: '', login: false });
  }
  ngOnInit() {
    this.pacienteService.cargarPerfilGeneral().subscribe(
      r => {
        this.fPerfil = r.datos;
        // this.fPerfil.estatura = this.fPerfil.estatura / 100;
        this.ngxLoader.stop();
        
			}, 
			r => {
				this._ngxNotifierService.createToast(JSON.stringify(r.message), 'danger', 4000);
        this.ngxLoader.stop();
        // this.arrInitConfig.login = true; 
        // this.arrInitConfig.class = ' login';
        this.router.navigate(['login']);
		});
  }
}