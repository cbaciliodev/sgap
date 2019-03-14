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
        { titulo: 'Pólizas', url: '/polizas' },
        { titulo: 'Renovaciones', url: '/polizas/renovacion' }
      ]
    },
    {
      titulo: 'Siniestros',
      icono: 'mdi mdi-alert-outline',
      submenu: [
        { titulo: 'Seguimiento', url: '/siniestro' }
      ]
    },
    {
      titulo: 'Cobranzas',
      icono: 'mdi mdi-coin',
      submenu: [
        { titulo: 'Pólizas', url: '/cobranza' }
      ]
    },
    {
      titulo: 'Reportes',
      icono: 'mdi mdi-chart-bar',
      submenu: [
        { titulo: 'Pólizas', url: '/r_poliza' },
        { titulo: 'Clientes', url: '/r_cliente' }
      ]
    },
    {
      titulo: 'Configuraciones',
      icono: 'mdi mdi-settings',
      submenu: [
        { titulo: 'Empresa / Agencias', url: '/agencias' },
        { titulo: 'Perfiles', url: '/perfiles' },
        { titulo: 'Usuarios', url: '/usuario' },
        { titulo: 'Emp. aseguradoras', url: '/cotizacion' },
        { titulo: 'Modelos', url: '/modelo' },
        { titulo: 'Tasas', url: '/tasa' },
        { titulo: 'Coberturas y deducibles', url: '/coberturas' },
        { titulo: 'Variables generales', url: '/configuracion' }
      ]
    }
  ];

  constructor() { }
}
