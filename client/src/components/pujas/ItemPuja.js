import React from 'react'
import { useSelector } from 'react-redux'
import Puja from '../../assets/img/puja.png'
import { prettierFecha, prettierValorCOP } from '../../helpers/format'
import { BtnCancelPuja } from './BtnCancelPuja'

export const ItemPuja = ( { puja, online, finalizada } ) => {

    const { documento } = useSelector( state => state.auth )

    const nombre = documento === puja.documento_pujador ? 'Usted' : puja.nombre_pujador

    return (
        <div className={`notificacion d-flex text-muted pt-2 px-3 border-top ${ documento === puja.documento_pujador ? 'bg-primary' : 'bg-white'} border-primary bg-opacity-10 position-relative animated fadeInLeft fast`}>
            
            { documento === puja.documento_pujador && !finalizada && <BtnCancelPuja id_puja={puja._id}/> }

            <img src={ Puja } className="mt-1 bd-placeholder-img flex-shrink-0 me-2 rounded" width={35} height={35} alt="Puja" />
            
            <div className="pb-2 mb-0 small lh-sm w-100">
                <strong className="d-block mb-1 text-primary">@PujasBoot:</strong>
                <strong className="text-success">
                    { nombre }
                </strong> ha realizado una puja por el valor de: <strong className="text-success">
                    { prettierValorCOP(puja.valor) }
                </strong>
                <div className="small mb-0 mt-2 text-primary opacity-75 text-end">
                    { prettierFecha(puja.fecha_puja) }
                </div>
            </div>
        </div>
    )
}
