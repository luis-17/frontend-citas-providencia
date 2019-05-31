import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ngx-custom-validators';
import { NgxNotifierService } from 'ngx-notifier';
import { NgxUiLoaderService } from 'ngx-ui-loader';

import { Router } from '@angular/router';
import * as moment from 'moment';

import { LoginService } from '../../services/login.services';
import { TipoDocumentoService } from '../../services/tipoDocumento.services';
import { TokenService } from '../../services/token.service';
import { PacienteService } from '../../services/paciente.services';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Output() getInitConfig: EventEmitter<any> = new EventEmitter();
  tgFormAccount: any;
  // formAccount: any;
  constructor(
    private loginService: LoginService, 
    private tipoDocumentoService: TipoDocumentoService, 
    private pacienteService: PacienteService,
    private tokenService: TokenService,
    private router: Router,
    private _ngxNotifierService: NgxNotifierService,
    private ngxLoader: NgxUiLoaderService
  ) { }
  page = 'login';
  arrParams = {};
  arrTipoDocumento = [];
  arrSexo = [];
  fLogin = {
    numDocumento: null,
    clave: null,
    show: true,
  };
  fRecovery = {
    numDocumento: null,
    show: false,
  }
  fAccount = {
    tipoDocumento: null,
    numDocumento: null,
    nombres: null,
    apellido_paterno: null, 
    apellido_materno: null,
    correo: null,
    celular: null,
    sexo: null,
    fecha_nac: null,
    repitaClave: null,
    show: false,
  };
  // validacion "recuperarCuenta"
  formRecovery = new FormGroup({
    numDocumento : new FormControl('', [Validators.required]),
  });
  // validacion "login"
  formLogin = new FormGroup({
    numDocumento : new FormControl('', [Validators.required]),
    clave : new FormControl('', [Validators.required]),
  });
  // validacion "registrarPaciente"
  claveFC = new FormControl('', [Validators.required]);
  formAccount = new FormGroup({
    tipoDocumento : new FormControl('', [Validators.required]),
    numDocumento : new FormControl('', [Validators.required]),
    nombres : new FormControl('', [Validators.required]),
    ap_paterno : new FormControl('', [Validators.required]),
    ap_materno : new FormControl('', [Validators.required]),
    celular : new FormControl('', [Validators.required, CustomValidators.digits, CustomValidators.rangeLength([9, 9])]),
    correo : new FormControl('', [Validators.required, CustomValidators.email]),
    fecha_nac : new FormControl('', [Validators.required]),
    sexo : new FormControl('', [Validators.required]),
    clave : this.claveFC,
    repita_clave : new FormControl('', [CustomValidators.equalTo(this.claveFC)]),
  });
  
  ngOnInit() {
    this.tipoDocumentoService.listar().subscribe(
      r => {
        console.log(r, 'rrrr');
        this.arrTipoDocumento = r as string [];
      });
    this.arrSexo = [
      { id: 'M', nombre: 'MASCULINO' },
      { id: 'F', nombre: 'FEMENINO' },
    ];
  }
  iniciarSesion() {
    this.ngxLoader.start(); 
    this.loginService.login(
      this.formLogin.value.numDocumento,
      this.formLogin.value.clave, 
    )
    .subscribe(
      r => {
        console.log(r, 'rrr login');
        if (r.token) {
          this.tokenService.setToken(r.token); 
          this.getInitConfig.emit({ class: '', login: false });
          this._ngxNotifierService.createToast('Sesión iniciada correctamente.', 'success', 4000);
          this.router.navigateByUrl('/home');
        }else{
          // console.log(r, 'r elsee');
          this._ngxNotifierService.createToast(JSON.stringify(r.message), 'danger', 4000);
          // alert(r.message); 
        }
        this.ngxLoader.stop();
      },
      r => {
        // alert(r.error.message); 
        this._ngxNotifierService.createToast(JSON.stringify(r.message), 'danger', 4000);
        console.log(r, 'r');
        this.ngxLoader.stop();
      });
  }
  darDeAltaExec () {
    const arrParams = {
      username: this.formAccount.value.numDocumento,
      password: this.formAccount.value.clave,
      nombres: this.formAccount.value.nombres,
      apellido_paterno: this.formAccount.value.ap_paterno,
      apellido_materno: this.formAccount.value.ap_materno,
      correo: this.formAccount.value.correo,
      celular: this.formAccount.value.celular,
      tipo_documento: this.formAccount.value.tipoDocumento.nombre,
      numero_documento: this.formAccount.value.numDocumento,
      fecha_nacimiento: moment(this.formAccount.value.fecha_nac).format("YYYY-MM-DD"),
      sexo: this.formAccount.value.sexo
    };
    this.ngxLoader.start(); 
    this.pacienteService.registrarPacienteNuevo(arrParams).subscribe(
      r => {
        this._ngxNotifierService.createToast(r.message, 'success', 200000);
        this.volverALogin();
        this.ngxLoader.stop(); 
      },
      r => {
        console.log(r, 'r');
        this._ngxNotifierService.createToast(JSON.stringify(r.error.message), 'danger', 4000);
        this.ngxLoader.stop(); 
      },
    )
  }
  recuperarCuentaExec() {
    const arrParams = {
      numero_documento: this.formRecovery.get('numDocumento').value,
    };
    console.log(arrParams, 'arrParamsarrParams');
    this.ngxLoader.start(); 
    this.pacienteService.recuperarCuenta(arrParams).subscribe(
      r => {
        this._ngxNotifierService.createToast(r.message, 'success', 200000);
        this.volverALogin();
        this.ngxLoader.stop(); 
      },
      r => {
        console.log(r, 'r');
        this._ngxNotifierService.createToast(JSON.stringify(r.error.message), 'danger', 8000);
        this.ngxLoader.stop(); 
      },
    )
  }
  olvidoClave() {
    this.fLogin.show = false;
    this.fRecovery.show = true;
    this.fAccount.show = false;
  }
  darDeAlta() {
    this.fLogin.show = false;
    this.fRecovery.show = false;
    this.fAccount.show = true;
  }
  volverALogin(){
    this.fLogin.show = true;
    this.fAccount.show = false;
    this.fRecovery.show = false;
  }
  otherFunction(){
    console.log('called from parent otherrr');
  }
}
