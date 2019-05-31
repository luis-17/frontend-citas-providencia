import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ngx-custom-validators';
import { ActivatedRoute } from '@angular/router';

import { NgxUiLoaderService } from 'ngx-ui-loader';
import { NgxNotifierService } from 'ngx-notifier';
import { PacienteService } from '../../../services/paciente.services';

@Component({
  selector: 'app-recupera',
  templateUrl: './recupera.component.html',
	styleUrls: ['./recupera.component.scss']
})
export class RecuperaComponent implements OnInit {
	// @Output() getInitConfig: EventEmitter<any> = new EventEmitter();
	// fValida = {
	// 	infoSuccess: false,
	// 	infoDanger: false,
	// 	message: null,
	// };
	constructor(
		private _route: ActivatedRoute,
		private pacienteService: PacienteService,
		private ngxLoader: NgxUiLoaderService,
		private _ngxNotifierService: NgxNotifierService
	) { }
	token = null;
	ngOnInit() {
		// this.ngxLoader.start();
		this.token = this._route.snapshot.paramMap.get('tkn');
	}
	// validacion "login"
	claveFC = new FormControl('', [Validators.required]);
  formUpdatePass = new FormGroup({
    clave : this.claveFC,
    repita_clave : new FormControl('', [CustomValidators.equalTo(this.claveFC)]),
  });
	actualizarClaveExec() {
		const arrParams = {
			password_new: this.formUpdatePass.get('clave').value,
			token: this.token,
    };
    // console.log(arrParams, 'arrParamsarrParams');
    this.ngxLoader.start(); 
    this.pacienteService.actualizarClave(arrParams).subscribe(
      r => {
        this._ngxNotifierService.createToast(r.message, 'success', 200000);
        // this.volverALogin();
        this.ngxLoader.stop(); 
      },
      r => {
        console.log(r, 'r');
        this._ngxNotifierService.createToast(JSON.stringify(r.error.message), 'danger', 8000);
        this.ngxLoader.stop();
      },
    )
	}
}