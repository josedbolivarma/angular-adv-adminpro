import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { UsuarioService } from '../../services/usuario.service';
import Swal from 'sweetalert2';

declare const google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit {
  @ViewChild('googleBtn') googleBtn!: ElementRef;

  public loginForm = this.fb.group({
    email: [ localStorage.getItem('email') || '', [ Validators.required, Validators.email ] ],
    password: ['', Validators.required ],
    remember: [ false ]
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private usuarioService: UsuarioService
  ) { }

  ngAfterViewInit(): void {
    this.googleInit();
  }
  
  googleInit() {
    google.accounts.id.initialize({
      client_id: "731557543978-9i96qugshpeki7qpllf293hh23qj67tf.apps.googleusercontent.com",
      callback: ( response: any ) => this.handleCredentialResponse( response )
    });
    google.accounts.id.renderButton(
      this.googleBtn.nativeElement,
      { theme: "outline", size: "large" }  // customization attributes
    );
  }

  handleCredentialResponse( response: any ) {
    console.log("Encoded JWT ID token: " + response.credential );
    this.usuarioService.loginGoogle( response.credential )
      .subscribe({
        next: resp => {
          console.log({ login: resp });
          this.router.navigateByUrl('/');
        },
        error: err => {
          console.log( err );
        }
      
      })
  }

  login() {
    console.log( this.loginForm.value );

    if ( !this.loginForm.valid ) {
      return;
    } 

    this.usuarioService.login( this.loginForm.value )
      .subscribe({
        next: resp => {
          if ( this.loginForm.get('remember')?.value ) {
            localStorage.setItem('email', this.loginForm.get('email')?.value! )
          } else {
            localStorage.removeItem('email');
          }
          this.router.navigateByUrl('/');
        },
        error: err => {
          // Si sucede un error
          Swal.fire('Error', err.error.msg, 'error' );
        }
      })

  }

}
