import React from 'react'

import Visitar from '../../assets/img/go.png'

import { Link } from 'react-router-dom'
import { prettierFecha, prettierValorCOP } from '../../helpers/format'

export const TrItemPuja = ({ puja }) => {

    const { ganadora, valor, fecha_puja, id_subasta} = puja

    return (
        <tr className={`${ganadora ? 'table-success': ''} animated zoomIn faster`}>
            <td className={`${ ganadora ? 'text-success' : '' } fw-bolder`}>{ ganadora ? 'Ganada' : 'Perdida' }</td>
            <td className="fw-bolder">{ prettierValorCOP(valor) }</td>
            <td>{ prettierFecha(fecha_puja) }</td>
            <td>
                <Link to={`/subasta/${id_subasta}`} className="hint--left" aria-label="Ir a la subasta">
                    <img src={ Visitar } alt="Ir" width={40} height={40} />
                </Link>
            </td>
        </tr>
    )
}
