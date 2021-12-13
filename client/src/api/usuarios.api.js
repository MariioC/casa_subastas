import { api } from './config.api'

export const _login = async ( data ) => {
    return await api.post('usuarios/login', data)
}

export const _is_logged = async ( ) => {
    return await api.post('usuarios/is_logged')
}

export const _registerUser = async ( usuario ) => {
    return await api.post('usuarios/registro', usuario)
}