import mongoose, { Schema } from 'mongoose'

const BodyNotificacionSchema = new Schema({
    usuario: {
        type: String,
        required: true
    },
    id_subasta: {
        type: String,
        required: true
    },
    nombre_subasta: {
        type: String,
        required: true
    },
})

const NotificacionSchema = new Schema({
    documento_usuario: {
        type: Number,
        required: true
    },
    notificacion: BodyNotificacionSchema,
    tipo_notificacion: {
        type: String,
        required: true,
        enum: ['temporal', 'ganador'],
        default: 'temporal',
    },
    view:  {
        type: Boolean,
        default: false,
    },
    fecha_notificacion: {
        type: Date,
        default: Date.now
    },
});

const NotificacionModel = mongoose.model('Notificacion', NotificacionSchema, 'notificaciones');

export default NotificacionModel;
