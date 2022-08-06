import { Component, OnDestroy } from '@angular/core';
import { Observable, retry, interval, take, map, filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnDestroy {

  public intervalSubs!: Subscription;

  constructor() {
    
    // this.retornaObservable().pipe(
    //   retry( 2 )
    // ).subscribe(
    //   valor => console.log( valor ),
    //   error => console.warn( error ),
    //   () => console.log('Finalizado')
    // )
    this.intervalSubs = this.retornaIntervalo().subscribe( console.log );
   
  }

  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }
   
   retornaIntervalo(): Observable<number> {
    return interval( 500 )
      .pipe(
        take( 10 ),
        map( valor => valor + 1 ),
        filter( valor => ( valor % 2 === 0 ) ? true : false ),
      );
   }

   retornaObservable(): Observable<number> {
    let i = -1;
    
    const obs$ = new Observable<number>( ( observer ) => {
      
      const interval = setInterval( () => {
        i++;
        observer.next( i );

        if ( i === 4 ) {
          clearInterval( interval );
          observer.complete();
        }

        if ( i === 2 ) {
          observer.error('i llego a su valor de 2');
        }

      }, 1000 )
    });

    return obs$;
   }


}
