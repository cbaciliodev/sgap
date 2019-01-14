import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { ModeloComponent } from './modelo/modelo.component';
import { MFormularioComponent } from './modelo/formulario/formulario.component';
import { CGestionComponent } from './cotizacion/gestion/gestion.component';
import { CFormularioComponent } from './cotizacion/formulario/formulario.component';
import { LoginGuard } from '../services/service.index';
import { UsuarioComponent } from './usuario/usuario.component';
import { ClienteComponent } from './cliente/cliente/cliente.component';

const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [LoginGuard],
        children: [
            { path: 'usuario', component: UsuarioComponent, data: { title: 'Usuario', routes: ['Configuraciones', 'Usuarios'] } },
            { path: 'progress', component: ProgressComponent, data: { title: 'Progress', routes: ['Configuraciones', 'Usuarios'] } },
            { path: 'graficas1', component: Graficas1Component, data: { title: 'Gráficos', routes: ['Configuraciones', 'Usuarios'] } },
            { path: 'account-settings', component: AccountSettingsComponent, data: { title: 'Cuenta', routes: ['Configuraciones', 'Usuarios'] } },
            { path: 'modelo', component: ModeloComponent, data: { title: 'Modelos', routes: ['Modelos', 'Usuarios'] } },
            { path: 'modelo/:id', component: MFormularioComponent, data: { title: 'Modelos', routes: ['Configuraciones', 'Usuarios'] } },
            { path: 'cotizacion', component: CGestionComponent, data: { title: 'Cotización', routes: ['Gestión', 'Clientes'] } },
            { path: 'cliente', component: ClienteComponent, data: { title: 'Cliente', routes: ['Gestión', 'Usuarios'] } },
            { path: 'cotizacion/:id', component: CFormularioComponent, data: { title: 'Cotización', routes: ['Configuraciones', 'Usuarios'] } },
            { path: 'dashboard', component: DashboardComponent },
            { path: '', redirectTo: '/dashboard', pathMatch: 'full'}
        ]
    }
];
export const PAGES_ROUTE = RouterModule.forChild(pagesRoutes);
