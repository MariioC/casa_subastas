import { Router } from 'express'

// Validators
import { verifyUserToken } from '../middleware/auth'
import { validatorPuja } from '../middleware/validators/validatorPuja';

// Controllers
import { SubastasController } from '../controllers/subastas.controllers';
import { PujasController } from '../controllers/pujas.controllers';

import { prettierValorCOP, prettierFecha } from '../helpers/utils'
import { NotificacionesController } from '../controllers/notificaciones.controllers';

export const pujasRoutes = Router()

pujasRoutes.get('/', verifyUserToken, async (req, res) => {
    const { data_token } = req.body
    try {
        const pujas = await PujasController.getAllPujasByUsuario( data_token.documento )
        res.json({
            pujas
        })
    } catch (error) {
        console.log(error)
        res.json({
            error: 'Ha ocurrido un error inesperado al obtener las pujas',
        })
    }
});

pujasRoutes.get('/:id_subasta', verifyUserToken, async (req, res) => {
    const { id_subasta } = req.params
    try {
        const pujas = await PujasController.getPujasBySubasta(id_subasta)
        res.json({
            pujas,
        })
    } catch (error) {
        console.log(error)
        res.json({
            error: 'Ha ocurrido un error inesperado al obtener las pujas de la subasta',
        })
    }
});

pujasRoutes.post('/new/:id_subasta', validatorPuja, verifyUserToken, async (req, res) => {
    let { valor, fecha_puja } = req.body
    const { id_subasta } = req.params

    const { data_token } = req.body

    try {

        fecha_puja = fecha_puja ? new Date(fecha_puja) : new Date()

        
        // Una vez tenga la fecha de la puja, le rersto el tiempo del timeZone para el caso de colombia serian 5 horas
        fecha_puja = new Date( fecha_puja.getTime() - fecha_puja.getTimezoneOffset() * 60000)

        // Valido si existe la subasta
        const subasta = await SubastasController.getSubastaById(id_subasta)
        if(!subasta) {
            return res.json({
                error: 'No se ha realizado la puja, debido a que la subasta no existe o fue eliminada'
            })
        }


        // Valido si la puja esta siendo enviada dentro de las fechas de inicio y fin de la subasta
        if(Date.parse(fecha_puja) < Date.parse(subasta.fecha_inicio)) {
            return res.json({
                error: `Aún no puede realizar pujas. \n\nEsta subasta dará inicio el ${prettierFecha(subasta.fecha_inicio)} a las ${subasta.hora_inicio}`
            })
        }

        if(Date.parse(fecha_puja) > Date.parse(subasta.fecha_fin)) {
            return res.json({
                error: `Ya no puede realizar pujas en esta subasta.\n\nEsta subasta finalizó el ${prettierFecha(subasta.fecha_fin)} a las ${subasta.hora_fin}`
            })
        }

        // Obtengo la puja mas alta de la subasta, y valido que el valor de la nueva puja, supere dicha puja
        const maxPuja = await PujasController.getMaxPujaBySubasta(id_subasta)


        if(maxPuja  && maxPuja.documento_pujador == data_token.documento) {
            return res.json({
                error: `No puede realizar 2 pujas seguidas en una subasta`
            })
        }

        if(maxPuja && maxPuja.valor >= valor) {
            return res.json({
                error: `La subasta ya tiene una puja por un valor mayor o igual al enviado\n\nValor actual de la mejor puja: ${prettierValorCOP(maxPuja.valor)}`
            })
        }

        const documento_pujador = data_token.documento
        const nombre_pujador = data_token.nombre
        
        const puja = await PujasController.createPuja({ valor, fecha_puja, nombre_pujador, documento_pujador, id_subasta })

        res.json({
            message: 'Puja realizada correctamente',
            puja
        })

    } catch (error) {
        console.log(error)
        res.json({
            error: 'Ha ocurrido un error inesperado al realizar la puja',
        })
    }
});

pujasRoutes.delete('/:id_puja', verifyUserToken, async (req, res) => {
    const { id_puja } = req.params

    const { data_token } = req.body

    try {

        const puja = await PujasController.getPujaById(id_puja)
        if(!puja) {
            return res.json({
                error: 'La puja que desea cancelar ya no existe'
            })
        }

        if(puja.documento_pujador != data_token.documento) {
            return res.json({
                error: 'No es posible cancelar la puja'
            })
        }

        // Una vez tenga la fecha de la puja, le rersto el tiempo del timeZone para el cso de colombia serian 5 horas
        const subasta = await SubastasController.getSubastaById(puja.id_subasta)

        if(!subasta) {
            // Elimino la puja
            await puja.remove()
            return res.json({
                message: 'Se ha cancelado la puja correctamente'
            })
        }

        let fecha_cancelacion = new Date()
        fecha_cancelacion = new Date( fecha_cancelacion.getTime() - fecha_cancelacion.getTimezoneOffset() * 60000)

        if(Date.parse(fecha_cancelacion) > Date.parse(subasta.fecha_fin)) {
            return res.json({
                error: `La subasta finalizó, ya no es posible cancelar la puja`
            })
        }

        let actualMaxPuja = await PujasController.getMaxPujaBySubasta(puja.id_subasta)

        // Elimino la puja
        await puja.remove()

        //  Una vez se cancele la puja, se le debe notificar al usuario que realizo la puja anterior que su puja es la ganadora hasta el momento
        // Obtengo la puja mas alta de la subasta, y valido que el valor de la nueva puja, supere dicha puja
        let newMaxPuja = await PujasController.getMaxPujaBySubasta(puja.id_subasta)

        
        if (newMaxPuja) {
            if(!actualMaxPuja._id.equals(newMaxPuja._id)) {

                if(newMaxPuja.documento_pujador != puja.documento_pujador) {
                    
                    let fecha_notificacion = new Date()
                    // A la fecha de la notificación, le resto el tiempo del timeZone para el caso de colombia serian 5 horas
                    fecha_notificacion = new Date( fecha_notificacion.getTime() - fecha_notificacion.getTimezoneOffset() * 60000)
                    
                    const bodyNotificacion = {
                        documento_usuario: newMaxPuja.documento_pujador,
                        notificacion: {
                            usuario: puja.nombre_pujador,
                            id_subasta: subasta._id,
                            nombre_subasta: subasta.nombre,
                        },
                        tipo_notificacion: 'temporal',
                        fecha_notificacion

                    }

                    const notificacion = await NotificacionesController.createNotificacion(bodyNotificacion)

                    return res.json({
                        message: 'Se ha cancelado la puja correctamente',
                        notificacion
                    })
                }

            }
        }

        res.json({
            message: 'Se ha cancelado la puja correctamente'
        })

    } catch (error) {
        console.log(error)
        res.json({
            error: 'Ha ocurrido un error inesperado al cancelar la puja',
        })
    }
});
