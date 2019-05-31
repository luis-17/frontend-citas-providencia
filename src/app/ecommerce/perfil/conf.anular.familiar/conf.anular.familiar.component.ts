import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NgxNotifierService } from 'ngx-notifier';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { FamiliarService } from '../../../services/familiar.services';

@Component({
  selector: 'app-conf.anular.familiar',
  templateUrl: './conf.anular.familiar.component.html',
  styleUrls: ['./conf.anular.familiar.component.scss']
})
export class ConfAnularFamiliarComponent implements OnInit {

  constructor(
		public dialogRef: MatDialogRef<ConfAnularFamiliarComponent>,
		private _ngxNotifierService: NgxNotifierService,
    private ngxLoader: NgxUiLoaderService,
		private familiarService: FamiliarService,
		@Inject(MAT_DIALOG_DATA) public data,
	) { }

  ngOnInit() {
  }
  onDialogClose(): void {
    this.dialogRef.close();
	}
	anularFamiliar(idcliente){
		const arrParams = {
			idcliente: idcliente,
		}
		this.ngxLoader.start();
		this.familiarService.anularFamiliar(arrParams).subscribe(
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
