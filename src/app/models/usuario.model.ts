import { environment } from '../../environments/environment';

const base_url = environment.base_url;

export class Usuario {

    constructor(
        public nombre: string,
        public email: string,
        public password?: string,
        public role?: string,
        public google?: boolean,
        public img?: string,
        public uid?: string,
    ) {}

    
    get imagenUrl() {

        if ( !this.img ) {
            return `${ base_url }/upload/usuarios/no-image`;
        } else if ( this.img?.includes('https') ) {
            console.log('IMG entra', this.img );
            return this.img;
        } else if ( this.img ) {
            return `${ base_url }/upload/usuarios/${ this.img }`
        } else {
            return `${ base_url }/upload/usuarios/no-image`
        }
    }


}