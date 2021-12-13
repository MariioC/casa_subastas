import { Router } from 'express'

// Validators
import { verifyUserToken } from '../middleware/auth'

// Controllers
import { SubastasController } from '../controllers/subastas.controllers';
import { PujasController } from '../controllers/pujas.controllers';
import { prettierValorCOP, prettierFecha } from '../helpers/utils'

import { NotificacionesController } from '../controllers/notificaciones.controllers';

export const notificacionesRoutes = Router()

notificacionesRoutes.get('/', verifyUserToken, async (req, res) => {
    const { data_token } = req.body
    try {
        const notificaciones = await NotificacionesController.getNotificacionesUsuario(data_token.documento)
        res.json({
            notificaciones
        })
    } catch (error) {
        console.log(error)
        res.json({
            error: 'Ha ocurrido un error al obtener las notificaciones del usuario',
        })
    }
});

notificacionesRoutes.put('/:id_notificacion', verifyUserToken, async (req, res) => {
    const { id_notificacion } = req.params

    const { data_token } = req.body

    try {
        const notificacion = await NotificacionesController.getNotificacion(id_notificacion)
        if(notificacion.documento_usuario != data_token.documento) {
            return res.json({
                error: 'No puede actualizar la notificación'
            })
        }
        notificacion.view = true;

        await notificacion.save();

        res.json({
            message: 'Notificación actualizada',
            notificacion
        })
    } catch (error) {
        console.log(error)
        res.json({
            error: 'Ha ocurrido un error al actualizar la notificación',
        })
    }
});

notificacionesRoutes.delete('/:id_notificacion', verifyUserToken, async (req, res) => {
    const { id_notificacion } = req.params

    const { data_token } = req.body

    try {
        const notificacion = await NotificacionesController.getNotificacion(id_notificacion)
        if(notificacion.documento_usuario != data_token.documento) {
            return res.json({
                error: 'No puede eliminar la notificación'
            })
        }
        await notificacion.remove();

        res.json({
            message: 'Notificación eliminada',
            notificacion
        })
    } catch (error) {
        console.log(error)
        res.json({
            error: 'Ha ocurrido un error al eliminar la notificación',
        })
    }
});