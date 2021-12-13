import { types } from "../types/types";

export const notificacionesReducer = (state = [], action) => {
    switch (action.type) {
        case types.set_notificaciones:
            return action.notificaciones
            
        case types.add_notificacion:
            return [
                    action.notificacion,
                    ...state
                ]

        case types.update_notificacion:
            const idxNotificacion = state.findIndex(n => n._id === action.notificacion._id)
            const notificaciones = JSON.parse(JSON.stringify(state))
            notificaciones[idxNotificacion] = action.notificacion
            return notificaciones;

        case types.remove_notificacion:
            const filteredNotificaciones = state.filter(n => n._id !== action.notificacion._id);
            console.log(filteredNotificaciones);
            return filteredNotificaciones

        default:
            return state;
    }
};
