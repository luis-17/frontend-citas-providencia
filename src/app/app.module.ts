import { BrowserModule } from '@angular/platform-browser';

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { FlexLayoutModule } from '@angular/flex-layout';
import { NeedAuthGuard } from './auth/auth.guard';
import { TokenInterceptor } from './auth/token.interceptor';

import { 
  MatInputModule, 
  MatButtonModule, 
  MatCheckboxModule, 
  MatRadioModule,
  MatSelectModule, 
  MatIconModule, 
  MatCardModule, 
  MatDatepickerModule, 
  MatGridListModule, 
  MatDialogModule,
  MatTabsModule,
  MatTooltipModule
} from '@angular/material'; 

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxNotifierModule } from 'ngx-notifier';
import { NgxUiLoaderModule } from  'ngx-ui-loader';

import { AppRoutingModule } from './ecommerce/app-routing.module';
import { AppComponent } from './app.component';

// app ecommerce 
import { HomeComponent } from './ecommerce/home/home.component';
import { EleccionTurnoComponent } from './ecommerce/cita/popup-turno/eleccion.turno.component';
import { FamiliarComponent } from './ecommerce/perfil/popup-familiar/familiar.component';

import { MenuComponent } from './core/menu/menu.component';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { LoginComponent } from './ecommerce/login/login.component';
import { ValidaComponent } from './ecommerce/login/validacuenta/valida.component';
import { RecuperaComponent } from './ecommerce/login/recuperacuenta/recupera.component';
import { CitaComponent } from './ecommerce/cita/cita.component';
import { HistorialComponent } from './ecommerce/historial/historial.component';
import { PerfilComponent } from './ecommerce/perfil/perfil.component';
import { ConfirmationComponent } from './core/confirmation/confirmation.component';
import { ConfAnularCitaComponent } from './ecommerce/historial/conf.anular.cita/conf.anular.cita.component';
import { ConfAnularFamiliarComponent } from './ecommerce/perfil/conf.anular.familiar/conf.anular.familiar.component';
import { ConfPagarCitaComponent } from './ecommerce/cita/conf.pagar.cita/conf.pagar.cita.component';

// import { BusquedaClinicaComponent } from './ecommerce/popup-clinica/busqueda.clinica.component';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [
    EleccionTurnoComponent,
    FamiliarComponent,
    ConfAnularCitaComponent,
    ConfAnularFamiliarComponent,
    ConfPagarCitaComponent,
  ],
  declarations: [
    AppComponent, 
    HomeComponent,
    // BusquedaPacienteComponent,
    MenuComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    ValidaComponent,
    RecuperaComponent,
    CitaComponent,
    HistorialComponent,
    PerfilComponent,
    EleccionTurnoComponent,
    FamiliarComponent,
    ConfirmationComponent,
    ConfAnularCitaComponent,
    ConfAnularFamiliarComponent,
    ConfPagarCitaComponent,
  ],
  imports: [ 
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatInputModule, 
    MatButtonModule, 
    MatCheckboxModule,
    MatRadioModule,
    MatSelectModule, 
    MatIconModule, 
    MatCardModule,
    MatDatepickerModule,
    MatGridListModule,
    BrowserAnimationsModule,
    NgxNotifierModule,
    NgxUiLoaderModule,
    AppRoutingModule,
    FlexLayoutModule,
    MatTabsModule, 
    MatTooltipModule
  ],
  exports: [
    FormsModule,
    MatDialogModule,
    MatTabsModule,
    EleccionTurnoComponent,
    FamiliarComponent,
    ConfAnularCitaComponent,
    ConfAnularFamiliarComponent,
    ConfPagarCitaComponent,
  ],
  providers: [NeedAuthGuard, {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
