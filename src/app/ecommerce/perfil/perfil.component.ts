import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ngx-custom-validators';
import { NgxNotifierService } from 'ngx-notifier';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { PacienteService } from '../../services/paciente.services';
import { FamiliarService } from '../../services/familiar.services';
import { TipoDocumentoService } from '../../services/tipoDocumento.services';
import { MatDialog } from '@angular/material';
import { FamiliarComponent } from "../perfil/popup-familiar/familiar.component";
import { ConfAnularFamiliarComponent } from "../perfil/conf.anular.familiar/conf.anular.familiar.component";
import { urlFile } from '../../common';
import * as moment from 'moment';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  @Output() getInitConfig: EventEmitter<any> = new EventEmitter();
  @Input() arrInitConfig; 
  constructor(
    private _ngxNotifierService: NgxNotifierService,
    private ngxLoader: NgxUiLoaderService,
    private pacienteService: PacienteService,
    private tipoDocumentoService: TipoDocumentoService, 
    private familiarService: FamiliarService,
    public dialog: MatDialog
  ) { }
  page = 'perfil';
  // photoUpload: any[];
  arrSexo = [];
  arrTipoDocumento = [];
  arrFamiliares = [];
  fPerfil = {
    urlFile: null,
    personal: {
      nombres: null,
      apellido_paterno: null,
      apellido_materno: null,
      correo: null,
      telefono: null,
      tipo_documento: null,
      numero_documento: null,
      sexo: null,
      fecha_nacimiento: null,
    },
    clinico: {
      peso: null,
      estatura: null,
      tipo_sangre: null,
      edad: null,
      sexo: null,
    },
    lectura: {
      peso: null,
      estatura: null,
      tipo_sangre: null,
      edad: null,
      imc: null,
    }
  };
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
  // fData = {
  //   fPerfil: {},
  //   fPersonal: {
  //     tipoDocumento: null,
  //     genero: 'M',
  //   }
  // };
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
    // setTimeout(() => {
      // this.getInitConfig.emit({ class: '', login: false, urlImagePerfil: this.fPerfil.urlFile });
      this.getInitConfig.emit({ class: '', login: false });
      console.log(this.fPerfil.urlFile, 'this.fPerfil.urlFile');
    // }, 3000);
    
  }
  // validar edicion de perfil
  formEditPerfil = new FormGroup({
    tipo_documento : new FormControl('', [Validators.required]),
    numero_documento : new FormControl('', [Validators.required]),
    nombres : new FormControl(''),
    apellido_paterno : new FormControl('', [Validators.required]),
    apellido_materno : new FormControl('', [Validators.required]),
    telefono : new FormControl('', [Validators.required, CustomValidators.digits, CustomValidators.rangeLength([9, 9])]),
    correo : new FormControl('', [Validators.required, CustomValidators.email]),
    fecha_nacimiento : new FormControl('', [Validators.required]),
    sexo : new FormControl('', [Validators.required]),
  });
  // validar edicion de clinico
  formEditClinico = new FormGroup({
    // correo : new FormControl('', [Validators.required, CustomValidators.email]),
    edad : new FormControl('', [Validators.required]),
    sexo : new FormControl('', [Validators.required]),
    peso : new FormControl('', [CustomValidators.digits, CustomValidators.rangeLength([0, 3])]),
    estatura : new FormControl('', [CustomValidators.digits, CustomValidators.rangeLength([0, 3])]),
    tipo_sangre : new FormControl('', [CustomValidators.rangeLength([0, 3])]),
  });
  ngOnInit() {
    // this.
    this.arrSexo = [
      { id: 'M', nombre: 'MASCULINO' },
      { id: 'F', nombre: 'FEMENINO' },
    ];
    this.tipoDocumentoService.listar().subscribe(
      r => {
        console.log(r, 'rrrr');
        this.arrTipoDocumento = r as string [];
    });
    this.cargarPerfilGeneral();
    this.cargarFamiliares();
  }
  cargarPerfilGeneral = function() {
    this.pacienteService.cargarPerfilGeneral().subscribe(
      r => {
        this.fPerfil.urlFile = (urlFile + r.datos.foto);
        // console.log(this.arrInitConfig, 'this.arrInitConfiggg');
        // this.arrInitConfig.urlImagePerfil = this.fPerfil.urlFile;
        
        this.fPerfil.personal.nombres = r.datos.nombres;
        this.fPerfil.personal.apellido_paterno = r.datos.apellido_paterno;
        this.fPerfil.personal.apellido_materno = r.datos.apellido_materno;
        this.fPerfil.personal.correo = r.datos.correo;
        this.fPerfil.personal.telefono = r.datos.telefono;
        this.fPerfil.personal.tipo_documento = r.datos.tipo_documento;
        this.fPerfil.personal.numero_documento = r.datos.numero_documento;
        this.fPerfil.personal.sexo = r.datos.sexo;
        this.fPerfil.personal.fecha_nacimiento = r.datos.fecha_nacimiento;
        this.formEditPerfil.setValue(this.fPerfil.personal);

        this.fPerfil.clinico.edad = r.datos.edad;
        this.fPerfil.clinico.sexo = r.datos.sexo;
        this.fPerfil.clinico.peso = r.datos.peso === '[ - ]' ? null: r.datos.peso;
        this.fPerfil.lectura.peso = r.datos.peso;
        // console.log(this.fPerfil.lectura.peso, 'this.fPerfil.lectura.peso fasd');
        this.fPerfil.clinico.estatura = r.datos.estatura === '[ - ]' ? null: r.datos.estatura;
        this.fPerfil.lectura.estatura = (r.datos.estatura / 100);
        this.fPerfil.clinico.tipo_sangre = r.datos.tipo_sangre === '[ - ]' ? null: r.datos.tipo_sangre;
        this.fPerfil.lectura.tipo_sangre = r.datos.tipo_sangre;
        this.fPerfil.lectura.edad = r.datos.edad;
        this.fPerfil.lectura.imc = r.datos.imc;
        this.formEditClinico.setValue(this.fPerfil.clinico);

				this.ngxLoader.stop();
			}, 
			r => {
				this._ngxNotifierService.createToast(JSON.stringify(r.message), 'danger', 4000);
				this.ngxLoader.stop();
    });
  }
  cargarFamiliares = function() {
    this.familiarService.cargarFamiliaresDePaciente().subscribe(
      r => {
        this.arrFamiliares = r.datos;
      });
  }
  tipoDocumentoCompare(a1, a2) {
    return a1.nombre === a2;
  }
  actualizarPerfilExec() {
    const arrParams = {
      correo: this.formEditPerfil.get('correo').value,
      telefono: this.formEditPerfil.get('telefono').value,
      peso: this.formEditClinico.get('peso').value || null,
      estatura: this.formEditClinico.get('estatura').value || null,
      tipo_sangre: this.formEditClinico.get('tipo_sangre').value || null,
    };
    // arrParams.fecha_nacimiento = moment(arrParams.fecha_nacimiento).format('YYYY-MM-DD');
    console.log(arrParams, 'arrParamsarrParams');
    this.ngxLoader.start(); 
    this.pacienteService.actualizarPerfilPersonal(arrParams).subscribe(
      r => {
        this._ngxNotifierService.createToast(r.message, 'success', 200000);
        // this.volverALogin();
        this.cargarPerfilGeneral();
        this.ngxLoader.stop(); 
      },
      r => {
        // console.log(r, 'r');
        this._ngxNotifierService.createToast(JSON.stringify(r.error.message), 'danger', 8000);
        this.ngxLoader.stop();
      },
    )
  }
  onFileChange(event) {
    // this.photoUpload = event.target.files;
    // console.log(this.photoUpload, 'this.photoUpload');
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      let formData:FormData = new FormData();
      formData.append('foto', file, file.name);
      this.ngxLoader.start(); 
      this.pacienteService.subirFotoPerfil(formData).subscribe(
        r => {
          this.cargarPerfilGeneral();
          this.ngxLoader.stop();
        },
        r => {
          this.ngxLoader.stop(); 
        },
      );
    }
  }
  // TAB FAMILIARES
  openDialogFamiliar(row = {}, action){
    const dialogOptions = {
      width: '640px',
      data: {},
      
    };
    dialogOptions.data = {
      title: 'Registro de Familiares',
      row,
      action,
    };
    const dialogRef = this.dialog.open(FamiliarComponent, dialogOptions); 
    dialogRef.afterClosed().subscribe(() => {
      this.cargarFamiliares();
    }); 
  }
  openConfirmAnularFamiliar(params){
    console.log(params);
    const dialogRef = this.dialog.open(ConfAnularFamiliarComponent, {
      width: '640px',
      data: {
        idcliente: params,
      }
    }); 
    dialogRef.afterClosed().subscribe(() => {
      this.cargarFamiliares();
    }); 
  }
}
