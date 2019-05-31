import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import { NgxUiLoaderService } from 'ngx-ui-loader';
import { PacienteService } from '../../../services/paciente.services';

@Component({
  selector: 'app-valida',
  templateUrl: './valida.component.html',
	styleUrls: ['./valida.component.scss']
})
export class ValidaComponent implements OnInit {
	// @Output() getInitConfig: EventEmitter<any> = new EventEmitter();
	fValida = {
		infoSuccess: false,
		infoDanger: false,
		message: null,
	};
	constructor(
		private _route: ActivatedRoute,
		private pacienteService: PacienteService,
    private ngxLoader: NgxUiLoaderService
	) { }
	ngOnInit() {
		this.ngxLoader.start();
		const token = this._route.snapshot.paramMap.get('tkn');
    this.pacienteService.validarCuenta(token).subscribe(
      r => {
				console.log(r, 'rrrrr');
				console.log(r);
				this.fValida.infoSuccess = true;
				this.fValida.infoDanger = false;
				this.fValida.message = r.message; // r.message;
				this.ngxLoader.stop();
			}, 
			r => {
				console.log(r, ' BUG');
				this.fValida.infoSuccess = false;
				this.fValida.infoDanger = true;
				this.fValida.message = r.error.message;
				this.ngxLoader.stop();
		});
	}
}