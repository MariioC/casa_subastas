import { resetAxios } from '../api/config.api'
import { _login } from '../api/usuarios.api'
import { types } from '../types/types'  
import { finishLoading, showError, startLoading } from './ui'

import { socket, resetSocket } from '../sockets/socket'


export const startLogin = (documento, password) => {
    return async ( dispatch ) => {
        // Hago la petición para iniciar sesión
        dispatch( startLoading() )

        const { data } = await _login({ documento, password })
        
        if(data.error) {
            dispatch(finishLoading())
            dispatch(showError( data.error ))
            return
        }
        const { usuario, token } = data

        localStorage.setItem('token', token)

        // Actualizo la configuracion del API
        resetAxios()

        // Actualizo la configuracion del SOCKET
        resetSocket()
        
        
        dispatch( login(usuario) )

        dispatch( finishLoading() )
    }    
}

export const startLogout = () => {
    return ( dispatch ) => {
        localStorage.removeItem('token')

        // Actualizo la configuracion del API
        resetAxios()

        // DESCONECTO AL USUARIO DEL SOCKET
        socket.disconnect()
        // Actualizo la configuracion del SOCKET
        resetSocket()
        
        dispatch( logout() )
    }
}

export const login = ( usuario ) => {
    // CONECTO AL USUARIO AL SOCKET
    socket.connect()

    return ({
        type: types.login,
        payload: usuario
    })
}

export const logout = () =>({
    type: types.logout
})