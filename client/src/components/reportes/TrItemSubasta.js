import React from 'react'

import Visitar from '../../assets/img/go.png'
import Editar from '../../assets/img/editar.png'
import Eliminar from '../../assets/img/eliminar.png'

import { URI_IMGS } from '../../api/config.api'

import { Link } from 'react-router-dom'
import { prettierFecha, prettierValorCOP } from '../../helpers/format'
import { useDispatch } from 'react-redux';
import { finishLoading, showError, showSuccess, startLoading } from '../../actions/ui'
import { _deleteSubasta } from '../../api/subastas.api'

export const TrItemSubasta = ({ subasta, setSubastas}) => {

    const dispatch = useDispatch();
    
    const { _id, nombre, foto, monto_inicial, fecha_inicio, fecha_fin, finalizada} = subasta

    const deleteSubasta = async ( e ) => {
        e.preventDefault()

        dispatch( startLoading() )

        try {
            const { data } = await _deleteSubasta(_id)
            dispatch( finishLoading() )

            if(data.error) {
                dispatch( showError(data.error) )
                return 
            }

            dispatch( showSuccess( data.message ) )
            setSubastas(subastas => (subastas.filter(s => s._id !== _id)))

        } catch (error) {
            console.log(error);
            dispatch( showError() )
        }
    }

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
                <a href="/" onClick={ deleteSubasta } className="hint--left" aria-label="Eliminar subasta">
                    <img src={ Eliminar } alt="Ir" width={40} height={40} />
                </a>
            </td>
        </tr>
    )
}
