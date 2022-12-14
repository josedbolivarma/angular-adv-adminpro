import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';

import { ProgressComponent } from "./progress/progress.component";
import { Grafica1Component } from './grafica1/grafica1.component';
import { DashboardComponent } from "./dashboard/dashboard.component";
import { PagesComponent } from "./pages.component";
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { AuthGuard } from '../guards/auth.guard';
import { PerfilComponent } from "./perfil/perfil.component";

// Mantenimientos
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { MedicoComponent } from './mantenimientos/medicos/medico.component';

const routes: Routes = [
    {
        path: 'dashboard',
        component: PagesComponent,
        canActivate: [ AuthGuard ],
        children: [
          {
            path: '',
            component: DashboardComponent,
            data: {
              titulo: 'Dashboard'
            }
          },
          {
            path: 'perfil',
            component: PerfilComponent,
            data: {
              titulo: 'Perfil'
            }
          },
          {
            path: 'progress',
            component: ProgressComponent,
            data: {
              titulo: 'ProgressBar'
            }
          },
          {
            path: 'grafica1',
            component: Grafica1Component,
            data: {
              titulo: 'Grafica #1'
            }
          },
          {
            path: 'account-settings',
            component: AccountSettingsComponent,
            data: {
              titulo: 'Temas'
            }
          },
          {
            path: 'promesas',
            component: PromesasComponent,
            data: {
              titulo: 'Promesas'
            }
          },
          {
            path: 'rxjs',
            component: RxjsComponent,
            data: {
              titulo: 'RxJs'
            }
          },

          // Mantenimientos
          {
            path: 'usuarios',
            component: UsuariosComponent,
            data: {
              titulo: 'Usuario de aplicacion'
            }
          },
          {
            path: 'hospitales',
            component: HospitalesComponent,
            data: {
              titulo: 'Hospitales de la aplicacion'
            }
          },
          {
            path: 'medicos',
            component: MedicosComponent,
            data: {
              titulo: 'Medicos de la aplicacion'
            }
          },
          {
            path: 'medico/:id',
            component: MedicoComponent,
            data: {
              titulo: 'Medico de la aplicacion'
            }
          }
        ]
      },
]

@NgModule({
    imports: [
        RouterModule.forChild( routes )
    ],
    exports: [ RouterModule ]
})

export class PagesRoutingModule {}