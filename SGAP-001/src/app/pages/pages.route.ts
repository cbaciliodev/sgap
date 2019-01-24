import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { ModeloComponent } from './modelo/modelo.component';
import { MFormularioComponent } from './modelo/formulario/formulario.component';
import { CFormularioComponent } from './cotizacion/formulario/formulario.component';
import { LoginGuard } from '../services/service.index';
import { UsuarioComponent } from './usuario/usuario.component';
import { ClienteComponent } from './cliente/cliente.component';
import { CotizacionComponent } from './cotizacion/cotizacion.component';
import { NeCotizacionComponent } from './cotizacion/ne-cotizacion.component';
import { NeClienteComponent } from './cliente/ne-cliente.component';
import { PrevCotizacionComponent } from './cotizacion/prev-cotizacion.component';

const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [ LoginGuard ],
        children: [
            { path: 'usuario', component: UsuarioComponent, data: { title: 'Usuario', routes: [{ title: 'Configuraciones'}, { title: 'Usuarios' }] } },
            { path: 'progress', component: ProgressComponent, data: { title: 'Progress', routes: [{ title: 'Configuraciones'}, { title: 'Usuarios' }] } },
            { path: 'graficas1', component: Graficas1Component, data: { title: 'Gráficos', routes: [{ title: 'Configuraciones'}, { title: 'Usuarios' }] } },
            { path: 'account-settings', component: AccountSettingsComponent, data: { title: 'Cuenta', routes: [{ title: 'Configuraciones'}, { title: 'Usuarios' }] } },
            { path: 'modelo', component: ModeloComponent, data: { title: 'Modelos', routes: [{ title: 'Configuraciones'}, { title: 'Modelo' }] } },
            { path: 'modelo/:id', component: MFormularioComponent, data: { title: 'Modelos', routes: [{ title: 'Configuraciones'}, { title: 'Modelo', link: '/modelo' }, { title: 'Agregar/Editar' }] } },
            { path: 'cotizacion', children: [
                    { path: '', component: CotizacionComponent, data: { title: 'Cotización', routes: [{ title: 'Gestión'}, { title: 'Cotización' }] } },
                    { path: 'prev/:id', component: PrevCotizacionComponent, data: { title: 'Previsualizacion', routes: [{ title: 'Gestión'}, { title: 'Cotización' }, { title: 'Previsualización' }] } }
                ]},
            { path: 'cliente', component: ClienteComponent, data: { title: 'Cliente', routes: [{ title: 'Gestión'}, { title: 'Cliente' }] } },
            { path: 'cotizacion/:id', component: NeCotizacionComponent, data: { title: 'Cotización', routes: [{ title: 'Gestión'}, { title: 'Cotización', link: '/cotizacion' }, { title: 'Agregar/Editar' }] } },
            { path: 'cliente/:id', component: NeClienteComponent, data: { title: 'Cliente', routes: [{ title: 'Gestión'}, { title: 'Cliente', link: '/cliente' }, { title: 'Agregar/Editar' }] } },
            { path: 'dashboard', component: DashboardComponent, data: { title: 'Dashboard', routes: [{ title: 'Dashboard'}] } },
            { path: '', redirectTo: '/dashboard', pathMatch: 'full'}
        ]
    }
];
export const PAGES_ROUTE = RouterModule.forChild(pagesRoutes);
