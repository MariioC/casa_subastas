import React from 'react'

import Visitar from '../../assets/img/go.png';
import Editar from '../../assets/img/editar.png';
import Eliminar from '../../assets/img/eliminar.png';

import { URI_IMGS } from '../../api/config.api'

import { Link } from 'react-router-dom';
import { prettierFecha, prettierValorCOP } from '../../helpers/format';
export const TrItemSubasta = ({ subasta }) => {

    
    const { _id, nombre, foto, monto_inicial, fecha_inicio, fecha_fin, finalizada} = subasta

    return (
        <tr className={`${!finalizada ? 'table-success': 'table-danger'} border-secondary animated zoomIn faster`}>
            <td>
                <img className="foto animated fadeIn" src={ URI_IMGS + foto } alt={nombre} width={100} height={100} />
            </td>
            <td className="fw-bolder text-primary">{ nombre }</td>
            <td>{ prettierValorCOP(monto_inicial) }</td>
            <td>{ prettierFecha(fecha_inicio) }</td>
            <td>{ prettierFecha(fecha_fin) }</td>
            <td>
                <Link to={`/subasta/${_id}`} className="hint--left" aria-label="Ir a la subasta">
                    <img src={ Visitar } alt="Ir" width={40} height={40} />
                </Link>
            </td>
            <td>
                <Link to={`/edit/subasta/${_id}`} state={subasta} className="hint--left" aria-label="Editar subasta">
                    <img src={ Editar } alt="Editar" width={40} height={40} />
                </Link>
            </td>
            <td>
                <Link to="/" className="hint--left" aria-label="Eliminar subasta">
                    <img src={ Eliminar } alt="Ir" width={40} height={40} />
                </Link>
            </td>
        </tr>
    )
}
