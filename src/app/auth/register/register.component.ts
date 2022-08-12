import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [ './register.component.css' ]
})
export class RegisterComponent {

  public formSubmitted = false;

  public registerForm = this.fb.group({
    nombre: ['Fernando', [ Validators.required ] ],
    email: ['test100@gmail.com', [ Validators.required, Validators.email] ],
    password: ['1234', [ Validators.required ] ],
    password2: ['1234', [ Validators.required ] ],
    terminos: [ true, Validators.required ]
  }, {
    validators: this.passwordsIguales('password', 'password2')
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private usuarioService: UsuarioService,
  ) { }

  crearUsuario() {
    this.formSubmitted = true;
    console.log( this.registerForm.value );

    if ( !this.registerForm.valid ) {
      return;
    } 

    // Realizar el posteo
    this.usuarioService.crearUsuario( this.registerForm.value )
      .subscribe({
        next: ( resp ) => {
          console.log('Usuario creado');
          console.log( resp );
          this.router.navigateByUrl('/');
        },
        error: ( error ) => {
          // Si sucede un error
          Swal.fire('Error', error.error.msg, 'error' );
        }
      })
  }

  campoNoValido( campo: string ): boolean {

    if ( !this.registerForm.get( campo )?.valid && !this.formSubmitted ) {
      return true;
    } else {
      return false;
    }

  }

  aceptaTerminos(): boolean {
    return !this.registerForm.get('terminos')?.value && this.formSubmitted;
  }

  contrasenasNoValidas() {
    const pass1 = this.registerForm.get('password')?.value;
    const pass2 = this.registerForm.get('password2')?.value;

    if ( (pass1 !== pass2) && this.formSubmitted ) {
      return true;
    } else {
      return false;
    }

  }

  passwordsIguales( pass1Name: string, pass2Name: string ) {
    return ( formGroup: FormGroup ) => {
      const pass1Control = formGroup.get( pass1Name );
      const pass2Control = formGroup.get( pass2Name );

      if ( pass1Control?.value === pass2Control?.value ) {
        pass2Control?.setErrors( null );
      } else {
        pass2Control?.setErrors({ noEsIgual: true });
      }

    }
  }

}
