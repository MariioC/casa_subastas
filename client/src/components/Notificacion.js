import React from 'react'
import { Link } from 'react-router-dom'
import { prettierFecha } from '../helpers/format'

import Trash from '../assets/img/eliminar.png'
import { _deleteNotificacion, _readNotificacion } from '../api/notificaciones.api'
import { useDispatch } from 'react-redux'
import { readNotificacion, removeNotificacion } from '../actions/notificaciones'


export const Notificacion = ({ notificacion }) => {
    
    const { _id, notificacion: { usuario, id_subasta, nombre_subasta }, tipo_notificacion, view, fecha_notificacion } = notificacion

    const dispatch = useDispatch();

    const eliminarNotificacion = async (e) => {
        e.preventDefault();
        try {
            const { data} = await _deleteNotificacion(_id)

            if( data.error ) return 

            dispatch( removeNotificacion(notificacion) )

        } catch (error) {
            console.error(error);
            console.log('No se pudo eliminar la notificación');
        }
    }

    const markAsReadNotificacion = async () => {
        if( view ) return
        try {
            const { data } = await _readNotificacion(_id)

            if( data.error ) return 

            dispatch( readNotificacion(data.notificacion) )
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="position-relative">

            <Link to={`/subasta/${id_subasta}`} onClick={ markAsReadNotificacion } className={`notificacion list-group-item list-group-item-action py-3 lh-tight ${ view && 'active'}`} aria-current="true">
                <div className="d-flex w-100 align-items-center justify-content-between">
                    <strong className={`mb-1 ${ view ? 'text-muted' : 'text-primary'}`}>@NotiBoot</strong>
                    <small className="text-muted mb-1">{ prettierFecha( fecha_notificacion) }</small>
                </div>
                <hr className="dropdown-divider mt-0" />
                <div className="col-12 mb-1 small px-2" style={{ textAlign: "justify" }}>
                    { tipo_notificacion === 'temporal' ?
                        <>
                            <strong className={view ? 'text-muted' : 'text-primary'}>{ usuario }</strong> canceló su puja, ahora eres el ganador temporal de la subasta <strong className={view ? 'text-muted' : 'text-primary'}>{ nombre_subasta }</strong>
                        </>
                        :
                        <>
                            La subasta <strong>{ nombre_subasta }</strong> ha finalizado y tu has sido el <strong className="text-success">GANADOR</strong> de la subasta
                        </>
                    }
                </div>

            </Link>

            <span onClick={ eliminarNotificacion } className="delete-notificacion position-absolute hint--left" aria-label="Eliminar" style={{ bottom: '5px', right:'12px', zIndex: 2, cursor: 'pointer'}}>
                <img className="img-fluid" src={ Trash } alt="mdo" width={18} height={18} />
            </span>
        </div>
    )
}
