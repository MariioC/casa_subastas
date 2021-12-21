import React from 'react'

import Swal from 'sweetalert2'
import { _cancelPuja } from '../../api/pujas.api'
import { finishLoading, showError, showSuccess, startLoading } from '../../actions/ui'
import { useDispatch } from 'react-redux'
import { socket, socketSubasta } from '../../sockets/socket'

export const BtnCancelPuja = ( { id_puja } ) => {

    const dispatch = useDispatch()
    
    const cancelarPuja = (e) => {
        e.preventDefault()

        Swal.fire({
            title: '¿Esta seguro?',
            text: "¿Esta seguro de cancelar su puja?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#0d6efd',
            cancelButtonColor: '#dc3545',
            confirmButtonText: 'Aceptar',
            cancelButtonText: 'Cancelar'
        }).then( async (result) => {
            if (result.isConfirmed) {

                dispatch( startLoading() )
                try {
                    const { data } = await _cancelPuja( id_puja )
                    dispatch( finishLoading() )

                    if(data.error) {
                        dispatch(showError( data.error ))
                        return
                    }

                    dispatch(showSuccess(data.message))

                    // Trabajar con el websocket para emitir el evento de remove puja
                    socketSubasta.emit('subasta:cancel-puja', { id_puja })

                    // Notificar al usuario que corresponda que es el nuevo ganador de la subasta
                    const { notificacion } = data
                    
                    if( notificacion ){
                        socket.emit('usuario:notificacion', { notificacion })
                    }

                } catch (error) {
                    console.error(error)
                    dispatch(showError())
                }

            }
        })
    }
    return (
        <button
            type="button"
            className="position-absolute btn btn-sm btn-danger small py-0 fw-bolder hint--bottom-left"
            aria-label="Cancelar"
            style={{ fontSize: '12px', top: 6, right: 6, padding: '0px 6px'}}
            onClick={ cancelarPuja }
        >
            X
        </button>  
    )
}
