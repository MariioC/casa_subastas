import { types } from "../types/types";

export const subastaReducer = (state, action) => {
    switch (action.type) {
        case types.set_participantes:
            return {
                ...state,
                participantes: action.usuarios
            }
        case types.add_participante:
            return {
                ...state,
                participantes: [
                    action.usuario,
                    ...state.participantes
                ],
            }
        case types.add_noti_participante:
            return {
                ...state,
                noti_participantes: [
                    action.notificacion,
                    ...state.noti_participantes
                ]
            }
        case types.remove_participante: {
            const filteredParticipantes = state.participantes.filter((p) => p._id !== action._id);
            return { ...state, participantes: filteredParticipantes };
        }
        case types.add_puja:
            return {
                ...state,
                pujas: [
                    action.puja,
                    ...state.pujas,
                ],
            }
            case types.remove_puja: {
            const pujaCancelada = state.pujas.filter((p) => p._id === action._id)[0];

            const filteredPujas = state.pujas.filter((p) => p._id !== action._id);
            return { ...state, puja_cancelada: pujaCancelada, pujas: filteredPujas };
        }
        case types.set_puja: {
            return { ...state, puja_cancelada:  action.puja };
        }
        case types.best_puja: {
            if( state.pujas.length ) {
                const maxPuja = state.pujas.reduce((prev, current) => (prev.valor > current.valor) ? prev : current)
                return { ...state, puja_mayor: maxPuja };
            } else {
                return { ...state, puja_mayor: {
                    valor: state.subasta.monto_inicial,
                    nombre_pujador: 'Monto inicial de la subasta',
                }};
            }
        }
        default:
            return state;
    }
};
