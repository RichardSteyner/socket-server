import { Usuario } from "./usuario";

export class UsuariosLista {

    private lista: Usuario[] = []

    constructor() {

    }

    //Agregar un usuario
    public add(usuario: Usuario) {
        this.lista.push(usuario)
        console.log(this.lista)
        return usuario
    }

    //Actualizar nombre de usuario
    public actualizarNombre(id: string, nombre: string){
        for( let u of this.lista ){
            if(u.id === id){
                u.nombre = nombre
                break
            }
        }       
        
        console.log('==== Actualizando usuario ====')
        console.log(this.lista)
    }

    //Obtener lista de usuarios
    public getLista(){
        return this.lista.filter( usu => usu.nombre!== 'sin-name' )
    }

    //Obtener un usuario
    public getUsuario( id: string ){
        return this.lista.find( usu => usu.id===id )
    }

    //Obtener usuarios de una sala en particular
    public getUsuariosEnSala(sala: string){
        return this.lista.filter( usu => {
            return usu.sala === sala
        } )
    }

    //Borrar usuario
    public borrarUsuario( id: string ){
        const tempUser = this.getUsuario(id)
        this.lista = this.lista.filter( usu => usu.id!==id )
        return tempUser
    }

}
