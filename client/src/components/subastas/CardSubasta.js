import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { URI_IMGS } from '../../api/config.api'
import { prettierFecha, prettierValorCOP } from '../../helpers/format'
import { BadgeSubasta } from './BadgeSubasta'

// import Reliquia from '../../assets/img/reliquia.jpg'


export const CardSubasta = ( { subasta } ) => {

    const img = require('../../assets/img/notFound.png')

    const { _id, nombre, foto, descripcion, fecha_inicio, fecha_fin, online, monto_inicial } = subasta

    const [iniciada, setIniciada] = useState(false)

    const [ temporizador, setTemporizador ] = useState(null)

    // const fechaActual = new Date()
    const fechaActual = useMemo(() => new Date(), [ ]);

    // Compruebo si la subasta ya finalizó mediante las fechas
    const dateFin = new Date(fecha_fin)
    const fechaFin = new Date(dateFin.getTime() + dateFin.getTimezoneOffset() * 60000)
    
    const finalizada = fechaActual.getTime() >= fechaFin.getTime() ? true : false

    // const dateInicio = new Date(fecha_inicio)
    const dateInicio = useMemo(() => new Date(fecha_inicio), [ fecha_inicio ]);
    // const fechaInicio = new Date(dateInicio.getTime() + dateInicio.getTimezoneOffset() * 60000)

    const fechaInicio = useMemo(() => new Date(dateInicio.getTime() + dateInicio.getTimezoneOffset() * 60000), [ dateInicio ]);

    useEffect(() => {

        let tickCardSubasta;

        if (!finalizada && online) {
            //Compruebo si la subasta ya inicio 
            const subastaIniciada = new Date().getTime() >= fechaInicio.getTime() ? true : false
    
            if(subastaIniciada) {
                setIniciada(true)
                setTemporizador(null)
                
                clearInterval(tickCardSubasta);

            } else {
                const diferencia = fechaInicio - fechaActual;
                const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));        

                if(minutos >= 0 && minutos < 10) {
                    tickCardSubasta = setInterval(() => {
                        const now = new Date();
                        const diferencia = fechaInicio - now;
            
                        const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
                        const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

                        let strMinutos = `0${minutos}`
                        let strSegundos = `${segundos <= 9 ? '0' : ''}${segundos}`
                        
                        setTemporizador({
                            minutos: strMinutos, 
                            segundos: strSegundos
                        })
                    }, 1000);
                }
            }
    
        }

        return () => {
            clearInterval(tickCardSubasta);
        }

    }, [ finalizada, online, fechaActual, fechaInicio, temporizador ])

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
                
                { temporizador &&
                    <p className="card-text text-success mb-2 fw-bolder text-center">Iniciará en: { temporizador.minutos} : { temporizador.segundos }</p>
                }

                {
                    iniciada 
                    ?
                        <button type="button" className="stretched-link btn btn-success mt-auto fw-bold" disabled>
                            La subasta se encuentra en curso
                        </button>
                    : 
                        <Link to={`/subasta/${_id}`} className="stretched-link btn btn-outline-primary mt-auto fw-bold">
                            Ir a la subasta
                        </Link>
                }
            </div>
            <div className="img-subasta col-auto d-flex justify-content-center align-items-center overflow-hidden">
                <img className="imagen-subasta animated fadeIn d-block" onError={ errorImg } src={ URI_IMGS + foto } alt={ nombre } width={200} height={250} />
            </div>
        </div>
    )
}
