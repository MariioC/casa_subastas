import { api } from './config.api'

export const _newSubasta = async ( subasta ) => {
    return await api.post('subastas/', subasta)
}

export const _updateSubasta = async ( id_subasta, subasta ) => {
    return await api.put(`subastas/${id_subasta}`, subasta)
}

export const _getSubastas = async ( ) => {
    return await api.get('subastas/')
}

export const _getSubasta = async ( id ) => {
    return await api.get(`subastas/${id}`)
}

export const _finishSubasta = async ( id ) => {
    return await api.put(`subastas/finish/${id}`)
}

export const _deleteSubasta = async ( id_subasta ) => {
    return await api.delete(`subastas/${id_subasta}`)
}