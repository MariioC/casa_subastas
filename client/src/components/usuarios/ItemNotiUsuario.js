import React, { useContext } from 'react'

import soundJoin from '../../assets/audio/joinSubasta.mp3'
import soundLeave from '../../assets/audio/leaveSubasta.mp3'
import { SubastaContext } from '../../context/SubastaContext'

export const ItemNotiUsuario = ({ notificacion }) => {

    const { subasta: { online, finalizada }, sonido } = useContext(SubastaContext)


    const { usuario, mensaje, join } = notificacion
    
    return (
        <div className="notificacion d-flex text-muted pt-2 mx-3 border-top animated fadeInLeft fast">
            <svg
                className="bd-placeholder-img flex-shrink-0 me-2 rounded"
                width={17}
                height={17}
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="Placeholder: 32x32"
                preserveAspectRatio="xMidYMid slice"
                focusable="false"
            >
                <title>Placeholder</title>
                <rect width="100%" height="100%" fill={`${join ? '#28B463' : '#f04e4e'}`} />
            </svg>
            <p className="pb-2 mb-0 small lh-sm">
                <strong className="d-block mb-1 text-primary">@UsersBoot:</strong>
                <strong>{ usuario.nombre }</strong> <span className={`${!join && 'text-danger opacity-75'}`}>{ mensaje }</span>
            </p>

            {
                !finalizada && online && sonido &&
                <audio className="visually-hidden" autoPlay="autoplay">
                    <source src={join ? soundJoin : soundLeave}></source>
                </audio>
            }
        </div>
    )
}
