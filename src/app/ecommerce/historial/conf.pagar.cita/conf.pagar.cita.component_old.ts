import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
// import { NgxNotifierService } from 'ngx-notifier';
// import { NgxUiLoaderService } from 'ngx-ui-loader';
// import { CitaService } from '../../../services/cita.services';

@Component({
  selector: 'app-conf.pagar.cita',
  templateUrl: './conf.pagar.cita.component.html',
  styleUrls: ['./conf.pagar.cita.component.scss']
})
export class ConfPagarCitaComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ConfPagarCitaComponent>,
    // private _ngxNotifierService: NgxNotifierService,
    // private ngxLoader: NgxUiLoaderService,
    // private citaService: CitaService,
    @Inject(MAT_DIALOG_DATA) public data,
  ) { }

  ngOnInit() {
    console.log(this.data, 'data');
  }
  onDialogClose(): void {
		this.dialogRef.close();
  }
  // pagarCita(idcita){
	// 	const arrParams = {
	// 		idcita: idcita,
	// 	}
	// 	this.ngxLoader.start();
	// 	this.citaService.anularCita(arrParams).subscribe(
  //     r => {
  //       this._ngxNotifierService.createToast(r.message, 'success', 200000);
	// 			this.onDialogClose();
  //       this.ngxLoader.stop(); 
  //     },
  //     r => {
  //       this._ngxNotifierService.createToast(JSON.stringify(r.error.message), 'danger', 4000);
  //       this.ngxLoader.stop(); 
  //     },
  //   )
	// }
}
