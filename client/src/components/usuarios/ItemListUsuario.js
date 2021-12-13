import React from 'react'
import { useSelector } from 'react-redux'

import Hombre from '../../assets/img/hombre.png'
import Mujer from '../../assets/img/mujer.png'
import Otro from '../../assets/img/otro.png'

export const ItemListUsuario = ({ usuario }) => {

    const { documento } = useSelector( state => state.auth )

    const { nombre, documento: documento_usuario, genero } = usuario

    const nombre_usuario = documento === documento_usuario ? 'Tú' : nombre

    return (
        <div className="usuario d-flex justify-content-start align-items-center p-3 py-2 border-bottom animated fadeInLeft fast">
            <div className="img-usuario border border-2 rounded-circle d-flex justify-content-center align-items-center overflow-hidden">
                <img src={ genero === 'Hombre' ? Hombre : genero === 'Mujer' ? Mujer : Otro } alt="hombre" width={40} height={40} className="d-block" />
            </div>
            <h6 className="mx-2 text-muted fw-bold mb-0">{ nombre_usuario }</h6>
        </div>
    )
}
