import { Router } from 'express'

import { verifyUserToken, IsInterno } from '../middleware/auth'
import { validatorSubasta } from '../middleware/validators/validatorSubasta'

// Controlldores
import { SubastasController } from '../controllers/subastas.controllers'
import { PujasController } from '../controllers/pujas.controllers'

// Multer para la subida de archivos - imagenes
import path from 'path'
import multer from 'multer'

import { uploadImg } from '../helpers/utils'
import { NotificacionesController } from '../controllers/notificaciones.controllers'


export const subastasRoutes = Router()

subastasRoutes.get('/', verifyUserToken, async (req, res) => {
    try {
        const subastas = await SubastasController.getSubastas()
        res.json({
            subastas
        })
    } catch (error) {
        console.log(error)
        res.json({
            error: 'Ha ocurrido un error inesperado al obtener las subastas',
        })
    }
})

subastasRoutes.get('/:id_subasta', verifyUserToken, async (req, res) => {
    const { id_subasta } = req.params
    try {
        const subasta = await SubastasController.getSubastaById(id_subasta)
        const pujas = await PujasController.getPujasBySubasta(id_subasta)
        res.json({
            subasta,
            pujas
        })
    } catch (error) {
        console.log(error)
        res.json({
            error: 'Ha ocurrido un error inesperado al consultar la subasta',
        })
    }
})

subastasRoutes.post('/new', multer({ dest: path.join(__dirname, '../public/img/temp')}).single('foto'), validatorSubasta, verifyUserToken, IsInterno, async (req, res) => {

    const { nombre, descripcion, fecha_cancelacion, fecha_inicio: f_inicio, hora_inicio, fecha_fin: f_fin, hora_fin, monto_inicial = 0, online } = req.body

    const { data_token } = req.body

    try {

        if(!req.file) {
            return res.json({
                error: 'Debe seleccionar una foto para la subasta'
            })
        }
        // Proceso la imagen enviada por el usuario
        const imgUploded = await uploadImg(req.file)

        if(imgUploded.error) {
            return res.json({
                error: imgUploded.error
            })
        }

        // Configuro la fecha de inicio de la subasta correctamente
        const arrHHmmInicio = hora_inicio.split(':')
        const milisegundosHoraInicio = (+arrHHmmInicio[0]) * 60 * 60 + (+arrHHmmInicio[1]) * 60 
        
        let fecha_inicio = new Date(f_inicio)
        fecha_inicio = new Date(fecha_inicio.getTime() + milisegundosHoraInicio * 1000)

        // Configuro la fecha de finalizción de la subasta correctamente
        const arrHHmmFin = hora_fin.split(':')
        const milisegundosHoraFin = (+arrHHmmFin[0]) * 60 * 60 + (+arrHHmmFin[1]) * 60 

        let fecha_fin = new Date(f_fin)
        fecha_fin = new Date(fecha_fin.getTime() + milisegundosHoraFin * 1000)

        // minutes are worth 60 seconds. Hours are worth 60 minutes.

        const documento_subastador = data_token.documento

        const result = await SubastasController.createSubasta({
            nombre,
            foto: imgUploded.fileName,
            descripcion,    
            fecha_cancelacion,
            fecha_inicio,
            hora_inicio,
            fecha_fin,
            hora_fin,
            monto_inicial,
            online,
            documento_subastador
        })

        const subasta = result.toJSON()
        delete subasta.__v
        res.json({
            message: 'Subasta creada correctamente',
            subasta
        })

    } catch (error) {
        console.log(error)
        res.json({
            error: 'Ha ocurrido un error inesperado al crear la subasta',
        })
    }
})

subastasRoutes.put('/finish/:id_subasta', verifyUserToken, async (req, res) => {

    const { id_subasta } = req.params

    const { data_token } = req.body

    try {

        const subasta = await SubastasController.getSubastaById(id_subasta)
        if(!subasta) {
            return res.json({
                error: 'No se puede finalizar la subasta, debido a que no existe o fue eliminada',
            })
        }

        const maxPuja = await PujasController.getMaxPujaBySubasta(id_subasta)

        if(maxPuja?.documento_pujador == data_token.documento || data_token.rol === 'interno') {
            // Finalizo la subasta con la fecha actual
            const puja = await PujasController.getPujaById(maxPuja._id)
            puja['ganadora'] = true
            await puja.save()

            console.log(puja);

            let fecha_fin = new Date()
            fecha_fin = new Date( fecha_fin.getTime() - fecha_fin.getTimezoneOffset() * 60000)

            subasta['finalizada'] = true
            subasta['fecha_fin'] = fecha_fin
            await subasta.save()

            // Notificar al usuario que ha ganado la subasta
            let fecha_notificacion = new Date()
            fecha_notificacion = new Date( fecha_notificacion.getTime() - fecha_notificacion.getTimezoneOffset() * 60000)

            const bodyNotificacion = {
                documento_usuario: maxPuja.documento_pujador,
                notificacion: {
                    usuario: maxPuja.nombre_pujador,
                    id_subasta: subasta._id,
                    nombre_subasta: subasta.nombre,
                },
                tipo_notificacion: 'ganador',
                fecha_notificacion
            }

            const notificacion = await NotificacionesController.createNotificacion(bodyNotificacion)

            return res.json({
                message: 'Subasta finalizada correctamente',
                notificacion
            })
        }

        res.json({
            error: 'No puede finalizar la subasta',
        })

    } catch (error) {
        console.log(error)
        res.json({
            error: 'Ha ocurrido un error inesperado al finalizar la subasta',
        })
    }
})
