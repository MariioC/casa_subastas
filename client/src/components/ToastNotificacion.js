import { useEffect } from 'react'
import { Link } from 'react-router-dom'

import SoundNotificacion from '../assets/audio/notificacionUsuario.mp3'

export const ToastNotificacion = ({ notificacion, setNewNotificacion }) => {

    const { _id, notificacion: { usuario, id_subasta, nombre_subasta }, tipo_notificacion } = notificacion
    
    const closeNotificacion = () => {
        setNewNotificacion(null)
    }

    useEffect(() => {
        const clear = setTimeout(() => {
            setNewNotificacion(null)
        }, 10000);

        return () => {
            clearTimeout(clear);
        }

    }, [ setNewNotificacion ])

    return (
        <>
            <Link to={`/subasta/${id_subasta}`} key={_id} onClick={ closeNotificacion } className="toast position-fixed bg-white border-success animated fadeInRight show fast" style={{ bottom: '15px', left: '15px', zIndex: 2, textDecoration: 'none'}}>
                <div className="toast-header border-success">
                    <svg className="bd-placeholder-img rounded me-2" width="15" height="15" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false">
                        <rect width="100%" height="100%" fill="#198754"></rect>
                    </svg>
                    <strong className="me-auto text-success">@NotiBoot</strong>
                    <small className="text-muted">Ahora mismo</small>
                    <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div className="toast-body text-secondary text-center">
                    {
                        tipo_notificacion === 'temporal'
                        ?
                            <><strong>{ usuario }</strong> ha <span className="text-primary">CANCELADO</span> su puja en la subasta <strong className="text-primary">{nombre_subasta}</strong>. Ahora eres el <strong className="text-success">Ganador temporal</strong> de la subasta</>
                        :
                            <>La subasta <strong className="text-primary">{ nombre_subasta }</strong> ha finalizado y tu has sido el <strong className="text-success">GANADOR</strong> de la subasta. <strong>¡¡FELICITACIONES!!</strong></>
                    }
                </div>

                
                <audio className="visually-hidden" autoPlay="autoplay">
                    <source src={ SoundNotificacion }></source>
                </audio>
            </Link>
        </>
    )
}
