
import express from 'express'
import { SERVER_PORT } from '../global/environment'
import socketIO from 'socket.io'
import http from 'http'

import * as misocket from '../sockets/socket'

export default class Server {

    private static _instance : Server

    public app : express.Application
    public port : number

    public io : socketIO.Server
    private httpServer : http.Server

    private constructor(){
        this.app = express()
        this.port = SERVER_PORT

        this.httpServer = new http.Server( this.app )
        
        this.io = socketIO(this.httpServer)
        
        //Esto es para la versión 3 de socket.io
        /*this.io = new socketIO.Server(this.httpServer, 
                                        { 
                                            cors: { 
                                                origin: true,
                                                credentials: true
                                            } 
                                        })*/
        

        this.escucharSockets()
    }

    public static get instance() {
        return this._instance || (this._instance = new this())
    }

    start(callback: ()=>void){
        //this.app.listen(this.port, callback)
        this.httpServer.listen(this.port, callback)
    }

    private escucharSockets(){
        console.log('Escuchando sockets - sockets')

        this.io.on('connection', cliente => {
            console.log('Cliente conectado', cliente.id)

            //Conectar cliente
            misocket.conectarCliente(cliente, this.io)
            
            //Configurar usuario
            misocket.configurarUsuario(cliente, this.io)

            //Obtener usuarios activos
            misocket.obtenerUsuarios(cliente, this.io)

            //Mensajes
            misocket.mensaje(cliente, this.io)

            //Desconectar:
            /*cliente.on('disconnect', ()=>{
                console.log('Cliente desconectado')
            })*/
            misocket.desconectar(cliente, this.io)

            

        })
    }

}
