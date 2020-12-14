import {Router, Request, Response} from 'express'
import Server from '../clases/server'
import { Socket } from 'socket.io'
import { usuariosConectados } from '../sockets/socket'

const router = Router()

router.get('/mensajes', (req: Request, res: Response)=> {
    res.json({
        ok: true,
        mensaje: 'Todo está bien.!!'
    })
})

router.post('/mensajes', (req: Request, res: Response)=> {

    const cuerpo = req.body.cuerpo
    const de = req.body.de

    const server = Server.instance;

    const payload = {
        de,
        cuerpo
    }

    server.io.emit( 'mensaje-nuevo' , payload)

    res.json({
        ok: true,
        cuerpo,
        de,
        mensaje: 'POST - listo.!!'
    })
})

router.post('/mensajes/:id', (req: Request, res: Response)=> {

    const cuerpo = req.body.cuerpo
    const de = req.body.de
    const id = req.params.id

    const server = Server.instance;

    const payload = {
        de,
        cuerpo
    }

    server.io.in( id ).emit( 'mensaje-privado' , payload)

    res.json({
        ok: true,
        cuerpo,
        de,
        mensaje: 'POST - listo.!!',
        id
    })
})

//Servicios para obtener todos los Ids de los usuarios activos
router.get('/usuarios', ( req: Request, res: Response ) => {
    const server = Server.instance
    server.io.clients( ( err: any, clientes: string[] ) => {
        if(err){
            return res.json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            clientes
        })
    } )
    
})

//Servicios para obtener todos los Ids y nombre de los usuarios activos
router.get('/usuarios/detalle', ( req: Request, res: Response ) => {
    const server = Server.instance


        res.json({
            ok: true,
            clientes: usuariosConectados.getLista()
        })
    
})


export default router