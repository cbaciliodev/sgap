import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioService } from '../services/usuario/usuario.service';
import { Router } from '@angular/router';

import swal from 'sweetalert';

// Iniciando funciones
declare function init_plugins();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor( public _usuario: UsuarioService, public router: Router ) { }

  ngOnInit() {

    init_plugins();

    this.loginForm = new FormGroup({
      usuario: new FormControl( null, [ Validators.required, Validators.email ] ),
      clave: new FormControl( null, [ Validators.required ] ),
      recordar: new FormControl( false )
    });
  }

  login() {
    this._usuario.autenticar(
      this.loginForm.value.usuario,
      this.loginForm.value.clave )
      .subscribe(
        xhr =>  this.router.navigate( ['/dashboard'] ),
        err => swal('Atención' , 'Usuario o contraseña incorrectos', 'error')
      );

  }

}
