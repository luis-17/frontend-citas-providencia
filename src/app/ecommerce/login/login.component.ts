import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.services';
import { TokenService } from '../../services/token.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  // @Input() arrInitConfig; 
  // @Output() searchItem: EventEmitter<any> = new EventEmitter();
  // @Output() arrInitConfig: EventEmitter<any> = new EventEmitter();
  @Output() getInitConfig: EventEmitter<any> = new EventEmitter();
  constructor(
    private authService: AuthService, 
    private tokenService: TokenService,
    private router: Router
  ) { }
  page = 'login';
  arrParams = {};
  fLogin = {
    numDocumento: null,
    clave: null 
  };
  
  ngOnInit() {
    // console.log(this.arrInitConfig,'this.arrInitConfig');
  }
  iniciarSesion() { 
    this.authService.login(
      this.fLogin.numDocumento,
      this.fLogin.clave, 
    )
    .subscribe(
        r => {
          if (r.token) {
            this.tokenService.setToken(r.token); 
            this.getInitConfig.emit({ class: '', login: false });
            this.router.navigateByUrl('/home');
          }
        },
        r => { alert(r.error.error); });
  }
  olvidoClave() {
    console.log('click mee');
  }
  darDeAlta(){
    console.log('click mee alta');
  }
  otherFunction(){
    console.log('called from parent otherrr');
  }
}
