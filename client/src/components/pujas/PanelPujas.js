import React, { useContext, useEffect } from 'react'
import { SubastaContext } from '../../context/SubastaContext'
import { socketBusbasta } from '../../sockets/socket'

import { BestPuja } from './BestPuja'
import { FormPuja } from './FormPuja'
import { ListPujas } from './ListPujas'

export const PanelPujas = () => {

    const { subasta: { online, finalizada }, puja_mayor, addPuja, removePuja } = useContext(SubastaContext)

    useEffect(() => {
        if(!finalizada && online) {

            socketBusbasta.on('subasta:new-puja', ({ puja }) => {
                console.log('new-puja', puja)
                addPuja(puja)
            })
    
            socketBusbasta.on('subasta:cancel-puja', ({ id_puja }) => {
                console.log('cancel-puja', id_puja)
                removePuja( id_puja )
            })

        }

        return () => {
            socketBusbasta.off('subasta:new-puja')
            socketBusbasta.off('subasta:cancel-puja')
        }
    }, [ online, finalizada, addPuja, removePuja ])
    
    return (
        <>
            <div className={`panel-pujas ${ !finalizada && online && 'online mt-4' } rounded-1 mb-4 overflow-hidden shadow-lg border border-primary p-0`}>
                <h3 className="titulo text-center bg-primary text-white py-2 mb-0 shadow">Panel de pujas</h3>
                
                {
                    !finalizada &&
                    <>
                        <FormPuja />
                        <hr className="dropdown-divider m-4 border-2" />
                    </>
                }

                <div className={`container-pujas row g-0 ${finalizada && 'mt-3'}`}>

                    <BestPuja online={online} finalizada={ finalizada } puja_mayor={puja_mayor} key={puja_mayor._id}/>

                    <hr className="dropdown-divider mt-4 border-2" />

                    <ListPujas />

                </div>
            </div>
        </>
    )
}
