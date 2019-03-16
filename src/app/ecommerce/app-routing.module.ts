import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { CitaComponent } from './cita/cita.component';
import { HistorialComponent } from './historial/historial.component';
import { PerfilComponent } from './perfil/perfil.component';
import { NeedAuthGuard } from '../auth/auth.guard';
// import { EventosComponent } from './gestion-eventos/eventos.component';
// import { PanelEventosComponent } from './panel-eventos/panel.eventos.component';
// import { RegistroIngresoComponent } from './registro-ingreso/registro.ingreso.component';

// COMPONENTES PERSONALIZADOS
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [NeedAuthGuard] },
  { path: 'agendar-cita', component: CitaComponent, canActivate: [NeedAuthGuard] },
  { path: 'historial-citas', component: HistorialComponent, canActivate: [NeedAuthGuard] },
  { path: 'perfil-de-paciente', component: PerfilComponent, canActivate: [NeedAuthGuard] },
  { path: 'login', component: LoginComponent } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
