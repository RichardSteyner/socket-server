import { Socket } from "socket.io";
import { UsuariosLista } from "../clases/usuarios-lista";
import { Usuario } from "../clases/usuario";

export const usuariosConectados = new UsuariosLista()

export const conectarCliente = ( cliente: Socket ) => {
    const u = new Usuario(cliente.id)
    usuariosConectados.add(u)
}

export const desconectar = ( cliente: Socket ) => {
    cliente.on('disconnect', ()=>{
        console.log('Cliente desconectado!')

        usuariosConectados.borrarUsuario(cliente.id)
    })
}

//escuchar mensajes
export const mensaje = ( cliente: Socket, io: SocketIO.Server ) => {
    
    cliente.on('mensaje', ( payload : { de: string, cuerpo: string } ) => {
        console.log('Mensaje recibido ', payload)

        io.emit('mensaje-nuevo', payload)        
    })

}

//escuhar login (configurar usuario)
export const configurarUsuario = ( client: Socket, io: SocketIO.Server ) => {

    client.on('configurar-usuario', ( payload: {nombre: string}, callback: Function ) => {
        
        usuariosConectados.actualizarNombre(client.id, payload.nombre)

        callback( {
            ok: true,
            mensaje : 'Usuario ' + payload.nombre + ' configurado'
        } )

    })

}

