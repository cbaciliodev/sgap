import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { SettingsService,
        SharedService,
        SidebarService,
        UsuarioService,
        LoginGuard,
        ModeloService,
        ClienteService,
        ParametroService,
        AutoService,
        CoberturaService,
        RiesgoService,
        CommonsService,
        AseguradoraService,
        GpsService,
        PolizaService } from './service.index';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SettingsService,
    SharedService,
    SidebarService,
    UsuarioService,
    LoginGuard,
    ModeloService,
    ClienteService,
    ParametroService,
    AutoService,
    CoberturaService,
    RiesgoService,
    CommonsService,
    AseguradoraService,
    GpsService,
    PolizaService
  ],
  declarations: []
})
export class ServiceModule { }
