import { io } from 'socket.io-client'
import { BASE_URI } from '../api/config.api'

export let socket = io(BASE_URI, {
    reconnectionDelayMax: 1000,
    auth: {
        token: localStorage.getItem('token')
    },
    autoConnect: false
})

export let socketBusbasta = io(BASE_URI+'subasta', {
    reconnectionDelayMax: 1000,
    auth: {
        token: localStorage.getItem('token')
    },
    autoConnect: false
})

export const connectSocketSubasta = ({ id_subasta }) => {
    socketBusbasta = io(BASE_URI+'subasta', {
        reconnectionDelayMax: 1000,
        auth: {
            token: localStorage.getItem('token')
        },
        query: {
            id_subasta
        },
        autoConnect: false
    })

    socketBusbasta.connect();
}

export const resetSocket = () => {
    socket = io(BASE_URI, {
        reconnectionDelayMax: 1000,
        auth: {
            token: localStorage.getItem('token')
        },
        autoConnect: false
    })
}


socket.onAny((event, ...args) => {
    console.log(event, args)
})

socket.offAny((event, ...args) => {
    console.log(event, args)
})

socketBusbasta.offAny((event, ...args) => {
    console.log(event, args)
})

socketBusbasta.onAny((event, ...args) => {
    console.log(event, args)
})

socket.on("connect_error", (err) => {
    if (err.message === "Invalid token") {
        console.error('[FALLO AL CONECTAR CON EL SOCKET]' + err.message)
    } else {
        console.error('[FALLO AL CONECTAR CON EL SOCKET] No recibirá notificaciones y/o cambios en tiempo real')
    }
})

socketBusbasta.on("connect_error", (err) => {
    if (err.message === "Invalid token") {
        console.error('[FALLO AL CONECTAR A LA SUBASTA]' + err.message)
    } else {
        console.error('[FALLO AL CONECTAR A LA SUBASTA]')
    }
})

// EVENTOS PARA EMITIR
// # Conectarse al socket

// # subasta:join - Conectarse al socket de una subasta
// # subasta:leave - Desconectarse del socket de una subasta 

// # puja:new - Realiza una puja a una subasta
// # puja:cancel - Cancela la puja de una subasta


// # Desconectarse del socket

// EVENTOS QUE ESCUCHA
// # subasta:usuarios - Recibe todos los usuarios que están conectados a la substa 
// # subasta:new-usuario - Recibe un usuario que se acaba de conectar a la subasta
// # subasta:leave-usuario - Recibe un usuario el cual acaba de desconectar de la subasta

