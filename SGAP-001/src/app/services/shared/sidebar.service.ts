import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [
    { titulo: 'Inicio', icono: 'mdi mdi-home-outline',  url: '/dashboard' },
    {
      titulo: 'Gestión',
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Cotizaciones', url: '/cotizacion' },
        { titulo: 'Clientes', url: '/cliente' }
      ]
    },
    {
      titulo: 'Pólizas',
      icono: 'mdi mdi-car',
      submenu: [
        { titulo: 'Pólizas', url: '/dashboard' },
        { titulo: 'Renovaciones', url: '/dashboard' }
      ]
    },
    {
      titulo: 'Siniestros',
      icono: 'mdi mdi-alert-outline',
      submenu: [
        { titulo: 'Seguimiento', url: '/dashboard' }
      ]
    },
    {
      titulo: 'Cobranzas',
      icono: 'mdi mdi-coin',
      submenu: [
        { titulo: 'Pólizas', url: '/dashboard' }
      ]
    },
    {
      titulo: 'Reportes',
      icono: 'mdi mdi-chart-bar',
      submenu: [
        { titulo: 'Pólizas', url: '/dashboard' },
        { titulo: 'Clientes', url: '/dashboard' }
      ]
    },
    {
      titulo: 'Configuraciones',
      icono: 'mdi mdi-settings',
      submenu: [
        { titulo: 'Empresa / Agencias', url: '/dashboard' },
        { titulo: 'Perfiles', url: '/progress' },
        { titulo: 'Usuarios', url: '/usuario' },
        { titulo: 'Emp. aseguradoras', url: '/cotizacion' },
        { titulo: 'Modelos', url: '/modelo' },
        { titulo: 'Tasas', url: '/cotizacion' },
        { titulo: 'Variables generales', url: '/cotizacion' }
      ]
    }
  ];

  constructor() { }
}
