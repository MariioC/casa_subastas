import NotificacionModel from '../models/notificacion.model'


export const NotificacionesController = {
    async createNotificacion({ documento_usuario, notificacion: { usuario, id_subasta, nombre_subasta }, tipo_notificacion, fecha_notificacion }) {
        const notificacion = new NotificacionModel({
            documento_usuario,
            notificacion: {
                usuario,
                id_subasta,
                nombre_subasta
            },
            tipo_notificacion,
            fecha_notificacion
        })
        
        return await notificacion.save()
    },

    async getNotificacion( id_notificacion ) {
        return await NotificacionModel.findOne({ _id: id_notificacion })
    },

    async getNotificacionesUsuario( documento_usuario ) {
        return await NotificacionModel.find({ documento_usuario }).sort({ fecha_notificacion: -1 })
    },
};
