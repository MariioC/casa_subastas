import React, { useContext, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

import { _newPuja } from '../../api/pujas.api'


import { SubastaContext } from '../../context/SubastaContext'
import { finishLoading, showError, startLoading } from '../../actions/ui'
import { socketSubasta } from '../../sockets/socket'

export const FormPuja = () => {

    const dispatch = useDispatch()

    const { id } = useParams()

    const { subasta: { finalizada }, puja_mayor: { valor } } = useContext(SubastaContext)

    const [ minValor, setMinValor ] = useState(valor)

    const [ defaultValor, setDefaultValor ] = useState(valor)

    useEffect(() => {
        setMinValor(valor + 1)
        setDefaultValor(valor + 1)
    }, [ valor ])

    const handleInputChange = (e) => {
        e.preventDefault()
        setDefaultValor(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(finalizada) return

        dispatch( startLoading() )
        try {
            const { data } = await _newPuja( id, { valor: defaultValor } )
            dispatch( finishLoading() )

            if(data.error) {
                dispatch(showError( data.error ))
                return
            }

            const { puja } = data

            if(!finalizada)
                socketSubasta.emit('subasta:new-puja', { puja })

        } catch (error) {
            console.error(error)
            dispatch(showError())
        }
    }

    return (
        <form className="form-puja my-2 px-3" onSubmit={ handleSubmit }>
            <h4 className="text-center text-dark mb-1 fw-bolder">Realizar puja</h4>
            <p className="small text-secondary mb-0 text-center">A continuacion, puede realizar pujas en esta subastas</p>
            <p className="small text-secondary mb-1 text-center">Recuerde que el valor de su puja debe superar el valor actual de la puja ganadora</p>

            <div className="input-group mb-3 mt-2 shadow" style={{ maxWidth: 350, margin: "0 auto" }}>
                <span className="input-group-text bg-success border-success text-white bg-opacity-75">$</span>
                <input 
                    type="number" 
                    min={ minValor }
                    name="valorPuja"
                    value={ defaultValor }
                    onChange={ handleInputChange }
                    className="form-control shadow-none border-success"
                    placeholder="Valor de su puja"
                    disabled={ finalizada }
                    />
                <button 
                    className="btn btn-success shadow-none" 
                    type="submit" 
                    id="button-addon2"
                    disabled={ finalizada }
                >
                    Enviar
                </button>
            </div>

            {
                finalizada &&
                <p className="small text-danger mb-1 text-center">Ya no se puede realizar pujas, la subasta ya finalizó</p>
            }
            
        </form>
    )
}
