import { api } from './config.api'

export const _getNotificacionesUsuario = async ( ) => {
    return await api.get(`notificaciones`)
}

export const _deleteNotificacion = async ( id_notificacion ) => {
    return await api.delete(`notificaciones/${id_notificacion}`)
}

export const _readNotificacion = async ( id_notificacion ) => {
    return await api.put(`notificaciones/${id_notificacion}`)
}

// export const _cancelPuja = async ( id_puja ) => {
//     return await api.delete(`pujas/${id_puja}`)
// }