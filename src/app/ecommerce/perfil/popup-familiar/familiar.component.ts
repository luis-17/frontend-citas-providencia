import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ngx-custom-validators';
import { NgxNotifierService } from 'ngx-notifier';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import { FamiliarService } from '../../../services/familiar.services';
import { ParentescoService } from '../../../services/parentesco.services';
import { TipoDocumentoService } from '../../../services/tipoDocumento.services';

// eleccion de turnos
@Component({
	selector: 'familiar.component',
	templateUrl: './familiar.component.html',
	styleUrls: ['./familiar.component.scss']
})
export class FamiliarComponent{
	constructor(
		public dialogRef: MatDialogRef<FamiliarComponent>,
    private _ngxNotifierService: NgxNotifierService,
		private ngxLoader: NgxUiLoaderService,
		private familiarService: FamiliarService,
		private parentescoService: ParentescoService,
		private tipoDocumentoService: TipoDocumentoService,
		@Inject(MAT_DIALOG_DATA) public data,
		) { }
	arrTipoDocumento = [];
	arrParentesco = [];
	arrSexo = [];
	tipoDocumentoCompare(a1, a2) {
		console.log(a1, a2, 'a1, a2dee');
    return a1 === a2;
	}
	parentescoCompare(a1, a2) {
		console.log(a1, a2, 'a1, a2d');
    return a1 == a2;
  }
	// validacion "registrarFamiliar"
	formFamiliar = new FormGroup({
		tipoDocumento : new FormControl('', [Validators.required]),
		numDocumento : new FormControl('', [Validators.required]),
		parentesco : new FormControl('', [Validators.required]),
		nombres : new FormControl('', [Validators.required]),
		ap_paterno : new FormControl('', [Validators.required]),
		ap_materno : new FormControl('', [Validators.required]),
		correo : new FormControl('', [Validators.required, CustomValidators.email]),
		fecha_nac : new FormControl('', [Validators.required]),
		sexo : new FormControl('', [Validators.required]),
	});
	ngOnInit() {
		this.tipoDocumentoService.listar().subscribe(
      r => {
        // console.log(r, 'rrrr');
        this.arrTipoDocumento = r as string [];
      });
		this.parentescoService.listar().subscribe(
			r => {
				// console.log(r, 'rrrr');
				this.arrParentesco = r.datos;
			});
		this.arrSexo = [
			{ id: 'M', nombre: 'MASCULINO' },
			{ id: 'F', nombre: 'FEMENINO' },
		];
		if (this.data.action === 'edit') {
			const arrParams = {
				tipoDocumento: this.data.row.tipo_documento,
				numDocumento: this.data.row.numero_documento,
				parentesco: this.data.row.idparentesco,
				nombres: this.data.row.nombres,
				ap_paterno: this.data.row.apellido_paterno,
				ap_materno: this.data.row.apellido_materno,
				correo: this.data.row.correo,
				fecha_nac: this.data.row.fecha_nacimiento,
				sexo: this.data.row.sexo,
			};
			console.log(arrParams, 'arrParams');
			this.formFamiliar.setValue(arrParams);
		}
		// console.log(this.data, 'this.dattata');
	}
	onDialogClose(): void {
		this.dialogRef.close();
	}
	actualizarFamiliarExec () {
    const arrParams = {
      nombres: this.formFamiliar.get('nombres').value,
      apellido_paterno: this.formFamiliar.get('ap_paterno').value,
      apellido_materno: this.formFamiliar.get('ap_materno').value,
      correo: this.formFamiliar.get('correo').value,
			tipo_documento: this.formFamiliar.get('tipoDocumento').value,
			idparentesco: this.formFamiliar.get('parentesco').value,
      numero_documento: this.formFamiliar.get('numDocumento').value,
      fecha_nacimiento: moment(this.formFamiliar.value.fecha_nac).format("YYYY-MM-DD"),
			sexo: this.formFamiliar.value.sexo, 
			idcliente: this.data.row.idcliente || null,
		};
		// console.log(this.formFamiliar.get('tipoDocumento').value, 'gettipodoc');
		console.log(arrParams, 'arrParamsparent');
		this.ngxLoader.start();
		if (this.data.action === 'reg') {
			this.familiarService.registrarFamiliar(arrParams).subscribe(
				r => {
					this._ngxNotifierService.createToast(r.message, 'success', 200000);
					this.onDialogClose();
					this.ngxLoader.stop(); 
				},
				r => {
					console.log(r, 'r');
					this._ngxNotifierService.createToast(JSON.stringify(r.error.message), 'danger', 4000);
					this.ngxLoader.stop(); 
				},
			)
		}else{
			this.familiarService.actualizarFamiliar(arrParams).subscribe(
				r => {
					this._ngxNotifierService.createToast(r.message, 'success', 200000);
					this.onDialogClose();
					this.ngxLoader.stop(); 
				},
				r => {
					console.log(r, 'r');
					this._ngxNotifierService.createToast(JSON.stringify(r.error.message), 'danger', 4000);
					this.ngxLoader.stop(); 
				},
			)
		}
    
  }
}