import { types } from '../types/types'  

import { _getNotificacionesUsuario } from '../api/notificaciones.api'

export const startGetNotificaciones = () => {
    return async ( dispatch ) => {
        // Hago la petición para obtener las notificaciones
        const { data } = await _getNotificacionesUsuario()

        if(data.error) return

        dispatch( notificaciones(data.notificaciones) )
    }
}

export const notificaciones = ( notificaciones ) => ({
    type: types.set_notificaciones,
    notificaciones
})

export const addNotificacion = ( notificacion ) => ({
    type: types.add_notificacion,
    notificacion
})

export const removeNotificacion = ( notificacion ) => ({
    type: types.remove_notificacion,
    notificacion
})

export const readNotificacion = ( notificacion ) => ({
    type: types.update_notificacion,
    notificacion
})