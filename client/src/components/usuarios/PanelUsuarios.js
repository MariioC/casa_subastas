import React, { useContext, useEffect } from 'react'
import { NotiUsuarios } from './NotiUsuarios'
import { ListUsuarios } from './ListUsuarios'
import { SubastaContext } from '../../context/SubastaContext'

import { socketBusbasta } from '../../sockets/socket'

// import notificacion from '../../assets/audio/notificacion.mp3'

export const PanelUsuarios = React.memo(() => {

    const { subasta: { online, finalizada }, setParticipantes, addParticipante, removeParticipante } = useContext(SubastaContext)

    useEffect(() => {

        if(!finalizada && online ){
            socketBusbasta.on('subasta:usuarios', ({ usuarios }) => {
                console.log('usuarios', usuarios)
                setParticipantes( usuarios )
            })
    
            socketBusbasta.on('subasta:new-usuario', ({ usuario }) => {
                console.log('new-usuario', usuario)
                addParticipante( usuario )
            })
    
            socketBusbasta.on('subasta:leave-usuario', ({ usuario }) => {
                console.log('leave-usuario', usuario)
                removeParticipante( usuario )
            })
        }

        return () => {
            socketBusbasta.off('subasta:usuarios')
            socketBusbasta.off('subasta:new-usuario')
            socketBusbasta.off('subasta:leave-usuario')
        }
    }, [ finalizada, online, setParticipantes, addParticipante, removeParticipante ])

    return (
        <>
            {
                !finalizada && online &&
                <div className="usuarios rounded-1 mb-4 shadow p-0 position-relative border border-success">
                    <h3 className="titulo text-center text-white py-2 mb-0">Usuarios</h3>
                    
                    { online && <NotiUsuarios /> }
                    <ListUsuarios />

                </div> 
            }
        </>
    )
})
