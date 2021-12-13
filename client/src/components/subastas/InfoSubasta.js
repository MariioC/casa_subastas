import React, { useContext } from 'react'
import { URI_IMGS } from '../../api/config.api'

import { SubastaContext } from '../../context/SubastaContext'
import { prettierFecha, prettierValorCOP } from '../../helpers/format'

import Rules from '../../assets/img/rules.png'

export const InfoSubasta = ( { setVerCondiciones } ) => {

    const img = require('../../assets/img/notFound.png')

    const errorImg = (e) => {
        e.target.src = img.default
    }    

    const { subasta } = useContext(SubastaContext)
    const { nombre, descripcion, foto, fecha_inicio, fecha_fin, fecha_cancelacion, monto_inicial, online, finalizada } = subasta

    const toggleVerCondiciones = () => {
        setVerCondiciones(true)
    }

    return (
        <>
            <div className={`informacion ${ !finalizada && online && 'online' } rounded-1 shadow p-0 overflow-hidden border border-warning`}>
                <h3 className="titulo text-center text-white py-2 mb-0 shadow">Información subasta</h3>
                <div className="img-subasta">
                    <img className="img-fluid d-block" src={ URI_IMGS + foto } onError={ errorImg } height={255} alt="Foto subasta" />
                </div>
                <div className="info-subasta py-3 px-4">

                    <button type="button" onClick={toggleVerCondiciones} className="btn btn-outline-primary border-2 d-flex justify-content-center align-items-center mx-auto mb-2 fw-bolder">
                        <img className="d-block me-1" src={ Rules } height={30} alt="Foto subasta" /> Ver instrucciones
                    </button>

                    {
                        finalizada &&
                        <div className="alert alert-danger text-center py-2 px-3 mb-2">
                            <strong>La subasta ha finalizado</strong>
                        </div>
                    }
                    <h3 className="mb-0 text-center fw-bolder mb-3"> { nombre } </h3>
                    <p className="text-secondary mb-3" style={{ textAlign: "justify" }}>
                        { descripcion }
                    </p>
                    <p className="text-primary mb-0 small" style={{ textAlign: "justify" }}>
                        <strong>Fecha inicio:</strong> { prettierFecha(fecha_inicio) }
                    </p>
                    <p className="text-primary mb-0 small" style={{ textAlign: "justify" }}>
                        <strong>Fecha fin:</strong> { prettierFecha(fecha_fin) }
                    </p>
                    <p className="text-dakr mb-0 mt-3 text-center" style={{ textAlign: "justify" }}>
                        <strong>Monto inicial:</strong> { prettierValorCOP(monto_inicial) }
                    </p>
                    <div className="alert alert-info text-center small py-1 px-3 mb-0 mt-2">
                        <strong>Fecha límite de cancelación:</strong> { prettierFecha(fecha_cancelacion) }
                    </div>
                </div>
            </div>
        </>
    )
}
