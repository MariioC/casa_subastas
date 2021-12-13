import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { URI_IMGS } from '../../api/config.api'
import { prettierFecha, prettierValorCOP } from '../../helpers/format'
import { BadgeSubasta } from './BadgeSubasta'

// import Reliquia from '../../assets/img/reliquia.jpg'


export const CardSubasta = ( { subasta } ) => {

    const img = require('../../assets/img/notFound.png')

    const { _id, nombre, foto, descripcion, fecha_inicio, fecha_fin, online, monto_inicial } = subasta

    const [ temporizador, setTemporizador ] = useState({
        minutos: 0,
        segundos: 0
    })

    const fechaActual = new Date()

    // Compruebo si la subasta ya finalizó mediante las fechas
    const dateFin = new Date(fecha_fin)
    const fechaFin = new Date(dateFin.getTime() + dateFin.getTimezoneOffset() * 60000)
    
    const finalizada = fechaActual.getTime() >= fechaFin.getTime() ? true : false

    //Compruebo si la subasta ya inicio 
    // const dateInicio = new Date(fecha_inicio)
    const dateInicio = useMemo(() => new Date(fecha_inicio), [ fecha_inicio ]);
    // const fechaInicio = new Date(dateInicio.getTime() + dateInicio.getTimezoneOffset() * 60000)

    const fechaInicio = useMemo(() => new Date(dateInicio.getTime() + dateInicio.getTimezoneOffset() * 60000), [ dateInicio ]);

    let iniciarTemporizador = false;

    
    if (!finalizada) {

        // const iniciada = fechaActual.getTime() >= fechaInicio.getTime() ? true : false

        const diferencia = fechaInicio - fechaActual;
        const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

        console.log(minutos);

        if(minutos < 5 && minutos > 0) {
            iniciarTemporizador = true;
            console.log('Aún puedes ingresar');
        } else {
            console.log('Ya no se permit el ingreso a esta subasta');
        }
    }

    useEffect(() => {
        const tick = setInterval(() => {
            if(!iniciarTemporizador) {
                return 
            }

            const now = new Date();
            const diferencia = fechaInicio - now;

            const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
            const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

            setTemporizador({
                minutos, segundos
            })

            console.log(temporizador);

            // if(minutos <= 5 && minutos > 0) {
            //     let minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
            //     let segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

            //     // console.log(minutos, segundos);
            // }

        }, 1000);

        return () => {
            clearInterval(tick);
        }
    }, [ iniciarTemporizador, fechaInicio, temporizador ])

    const errorImg = (e) => {
        e.target.src = img.default
    }

    return (
        <div className="subasta row mb-4 g-0 border rounded overflow-hidden flex-md-row shadow-sm position-relative text-decoration-none text-dark animated fadeIn fast">
            <div className="info-subasta col p-3 d-flex flex-column position-static">

                <BadgeSubasta finalizada={finalizada} online={online}/>

                <h2 className="nombre-subasta mb-0 fw-bolder">{ nombre }</h2>
                <div className="text-muted small">
                    <strong>Inicia:</strong> { prettierFecha(fecha_inicio) }
                </div>
                <div className="text-muted small">
                    <strong>Finaliza:</strong> { prettierFecha(fecha_fin) }
                </div>
                <p className="card-text mb-auto mt-2">{ descripcion.substring(0, 50) }...</p>
                <p className="card-text mb-2 fw-bolder">Monto inicial: { prettierValorCOP(monto_inicial) }</p>
                <Link to={`/subasta/${_id}`} className="stretched-link btn btn-outline-primary mt-auto fw-bold">
                    Ver detalles de la subasta
                </Link>
            </div>
            <div className="img-subasta col-auto d-flex justify-content-center align-items-center overflow-hidden">
                <img className="imagen-subasta animated fadeIn d-block" onError={ errorImg } src={ URI_IMGS + foto } alt={ nombre } width={200} height={250} />
            </div>
        </div>
    )
}
