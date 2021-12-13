import React, { useEffect, useState } from 'react'
import { prettierValorCOP } from '../../helpers/format'

import PujaMayor from '../../assets/img/puja-mayor.png'
import soundPuja from '../../assets/audio/puja.mp3'
import { showSuccess } from '../../actions/ui'
import { useDispatch } from 'react-redux'


export const BestPuja = ({ online, finalizada, puja_mayor }) => {

    const dispatch = useDispatch();

    const { valor, nombre_pujador, documento_pujador } = puja_mayor

    const [ temporizador, setTemporizador ] = useState(30)

    useEffect(() => {

        let tick;
        if(documento_pujador) {
            tick = setInterval(() => {
                setTemporizador(previousState => previousState - 1)
            }, 1000);

            if(temporizador === 0) {
                clearInterval(tick)
                dispatch( showSuccess(`No se han recibido mas subastas, el ganador de la subasta es: ${ nombre_pujador }`) )
            }
        }
        return () => {
            clearInterval(tick)
        }

    }, [ documento_pujador, temporizador, dispatch, nombre_pujador ])

    return (
        <>
            <p className="px-4 text-center text-muted lh-sm small">
                A continuación, aparece la puja ganadora actual de la subasta y el historial de todas las pujas que se han realizado durante la subasta                
            </p>
            {
                documento_pujador && !finalizada &&
                <div className="alert alert-warning mb-0 col-10 mx-auto text-center mb-4">
                    <p className="small mb-0 text-muted">Se ha realizado una nueva puja</p>
                    <p className="mb-0">Tiempo restante para realizar una puja</p>
                    <p className="fs-3 mb-0 fw-bolder">{ temporizador }</p>
                </div>
            }

            <div className="puja-mayor col-md-8 px-md-4 px-3 mx-auto" style={{ maxWidth: '350px'}}>
                <div className="puja-ganadora card mx-auto shadow border-success border-2 animated bounceIn">
                    <h4 className="text-center fw-bolder py-2 text-white bg-success mb-0">{ !finalizada ? 'Ganador temporal' : 'GANADOR'}</h4>
                    <div className="card-body">
                        <div className="d-flex align-items-center justify-content-evenly">
                            <div className="flex-shrink-0 mx-2">
                                <img src={ PujaMayor } width={60} height={60} alt="Puja mayor" />
                            </div>
                            <div>
                                <h4 className="fw-normal text-success text-center mb-1 fw-bolder">{ prettierValorCOP(valor) }</h4>
                                <p className="text-muted mb-0 fw-bolder text-center lh-1 text-uppercase">{ nombre_pujador }</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {
                !finalizada && online &&
                <audio className="visually-hidden" autoPlay="autoplay">
                    <source src={soundPuja}></source>
                </audio>
            }
        </>
    )
}
