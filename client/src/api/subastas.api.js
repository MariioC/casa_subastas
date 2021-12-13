import { api } from './config.api'

export const _newSubasta = async ( subasta ) => {
    return await api.post('subastas/new', subasta)
}

export const _getSubastas = async ( ) => {
    return await api.get('subastas/')
}

export const _getSubasta = async ( id ) => {
    return await api.get(`subastas/${id}`)
}