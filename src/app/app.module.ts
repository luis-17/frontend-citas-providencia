import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AgGridModule } from 'ag-grid-angular';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NeedAuthGuard } from './auth/auth.guard';

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

import { AppRoutingModule } from './ecommerce/app-routing.module';
import { AppComponent } from './app.component';

// app ecommerce 
import { HomeComponent } from './ecommerce/home/home.component';
import { EleccionTurnoComponent } from './ecommerce/cita/popup-turno/eleccion.turno.component';

import { MenuComponent } from './core/menu/menu.component';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { LoginComponent } from './ecommerce/login/login.component';
import { CitaComponent } from './ecommerce/cita/cita.component';
import { HistorialComponent } from './ecommerce/historial/historial.component';
import { PerfilComponent } from './ecommerce/perfil/perfil.component';
import { ConfirmationComponent } from './core/confirmation/confirmation.component';
import { ConfAnularCitaComponent } from './ecommerce/historial/conf.anular.cita/conf.anular.cita.component';
import { ConfPagarCitaComponent } from './ecommerce/cita/conf.pagar.cita/conf.pagar.cita.component';

// import { BusquedaClinicaComponent } from './ecommerce/popup-clinica/busqueda.clinica.component';

@NgModule({
  entryComponents: [
    EleccionTurnoComponent,
    ConfAnularCitaComponent,
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
    CitaComponent,
    HistorialComponent,
    PerfilComponent,
    EleccionTurnoComponent,
    ConfirmationComponent,
    ConfAnularCitaComponent,
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
    AppRoutingModule,
    AgGridModule.withComponents([]),
    FlexLayoutModule,
    MatTabsModule, 
    MatTooltipModule
  ],
  exports: [
    MatDialogModule,
    MatTabsModule,
    EleccionTurnoComponent,
    ConfAnularCitaComponent,
    ConfPagarCitaComponent,
  ],
  providers: [NeedAuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
