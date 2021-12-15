import React, { createContext } from 'react';
import { subastaReducer } from '../reducers/subastaReducer';
import { types } from '../types/types';

import { v4 as uuidv4 } from 'uuid'

export const SubastaContext = createContext(null);

export const SubastaProvider = ( { children, info } ) => {

    const initialState = {
        subasta: info.subasta,
        pujas: info.pujas,
        puja_mayor: info.pujas.length ? info.pujas.reduce((prev, current) => (prev.valor > current.valor) ? prev : current) : {
            valor: info.subasta.monto_inicial,
            nombre_pujador: 'Monto inicial',
            documeno_pujador: 0
        },
        puja_cancelada: null,
        noti_participantes: [],
        participantes: [],
        sonido: localStorage.getItem('sonido') === "false" ? false : true
    };

    const [ state, dispatch ] = React.useReducer(subastaReducer, initialState);

    const value = {
        subasta: state.subasta,
        pujas: state.pujas,
        puja_mayor: state.puja_mayor,
        puja_cancelada: state.puja_cancelada,
        noti_participantes: state.noti_participantes,
        participantes: state.participantes,
        sonido: state.sonido,
        setSonido: ( sonido ) => {
            dispatch({ type: types.set_sonido, sonido });
        },
        setSubasta: ( subasta ) => {
            dispatch({ type: types.set_subasta, subasta });
        },
        setParticipantes: ( usuarios ) => {
            dispatch({ type: types.set_participantes, usuarios });
        },
        addParticipante: ( usuario ) => {
            dispatch({ type: types.add_participante, usuario });
            const notificacion = {
                id: uuidv4(),
                usuario,
                mensaje: 'Se ha unido a la subasta',
                join: true
            }
            dispatch({ type: types.add_noti_participante, notificacion });
        },
        removeParticipante: ( usuario ) => {
            dispatch({ type: types.remove_participante, _id: usuario._id });
            const notificacion = {
                id: uuidv4(),
                usuario,
                mensaje: 'Ha abanado la subasta',
                join: false
            }
            dispatch({ type: types.add_noti_participante, notificacion });
        },
        addPuja: ( puja ) => {
            dispatch({ type: types.add_puja, puja });
            dispatch({ type: types.best_puja });
        },
        removePuja: ( _id ) => {
            dispatch({ type: types.remove_puja, _id });
            dispatch({ type: types.best_puja });
        },
        setCancelPuja: ( puja ) => {
            dispatch({ type: types.set_puja, puja });
        },
    };

    
    return (
        <SubastaContext.Provider value={value}>
            {children}
        </SubastaContext.Provider>
    );
}


