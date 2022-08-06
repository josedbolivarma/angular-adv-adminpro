import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styleUrls: ['./promesas.component.css']
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.getUsuarios().then( usuario => {
      console.log( usuario );
    })
    // const promesa = new Promise( ( resolve, reject ) => {
    //   resolve('Hola Mundo');
    // });

    // promesa.then( x => console.log( x ) );
  }

  getUsuarios() {
    
    return new Promise( ( resolve ) => {
      fetch('https://reqres.in/api/users')
      .then( resp => {
        resp.json()
      })
      .then( body => resolve( body ));
    });

    
  }
}
