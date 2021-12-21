import React, { useContext, useEffect } from 'react'
import { NotiUsuarios } from './NotiUsuarios'
import { ListUsuarios } from './ListUsuarios'
import { SubastaContext } from '../../context/SubastaContext'

import { socketSubasta } from '../../sockets/socket'

// import notificacion from '../../assets/audio/notificacion.mp3'

export const PanelUsuarios = React.memo(() => {

    const { subasta: { online, finalizada }, setParticipantes, addParticipante, removeParticipante } = useContext(SubastaContext)

    useEffect(() => {

        if(!finalizada){
            socketSubasta.on('subasta:usuarios', ({ usuarios }) => {
                setParticipantes( usuarios )
            })
    
            socketSubasta.on('subasta:new-usuario', ({ usuario }) => {
                addParticipante( usuario )
            })
    
            socketSubasta.on('subasta:leave-usuario', ({ usuario }) => {
                removeParticipante( usuario )
            })
        }

        return () => {
            socketSubasta.off('subasta:usuarios')
            socketSubasta.off('subasta:new-usuario')
            socketSubasta.off('subasta:leave-usuario')
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
