import React, { useContext } from 'react'
import { SubastaContext } from '../../context/SubastaContext'
import { ItemNotiUsuario } from './ItemNotiUsuario'

export const NotiUsuarios = () => {

    const { noti_participantes } = useContext(SubastaContext)

    return (
        <div className="notificaciones-usuarios">
            <h6 className="mb-0 py-2 px-2 text-primary fw-bolder">Recientes</h6>
            <div className="container-notificaciones">
                
                { !noti_participantes.length &&  <div className="text-center text-black-50 pb-2 small bolder">Sin novedades</div> }

                { noti_participantes.length > 0 && 
                    noti_participantes.map( noti => (
                        <ItemNotiUsuario key={noti.id} notificacion={ noti } />
                    ))
                }
            </div>
        </div>
    )
}
