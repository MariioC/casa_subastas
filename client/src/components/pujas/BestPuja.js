import React, { useContext, useEffect, useState } from 'react'
import { prettierValorCOP } from '../../helpers/format'

import PujaMayor from '../../assets/img/puja-mayor.png'
import soundPuja from '../../assets/audio/puja.mp3'
import { useDispatch, useSelector } from 'react-redux'
import { SubastaContext } from '../../context/SubastaContext'
import { ModalGanadorSubasta } from './ModalGanadorSubasta'
import { _finishSubasta } from '../../api/subastas.api'
import { finishLoading, showError, startLoading } from '../../actions/ui'
import { socket } from '../../sockets/socket'


export const BestPuja = () => {

    const dispatch = useDispatch();

    const { documento } = useSelector( state => state.auth )

    const { subasta, puja_mayor, sonido, setSubasta } = useContext(SubastaContext)

    const { online, finalizada, _id } = subasta

    const { valor, nombre_pujador, documento_pujador } = puja_mayor

    const [ temporizador, setTemporizador ] = useState(10)

    const [ modalGanador, setModalGanador ] = useState(false)

    const copyInfoSubasta = JSON.parse(JSON.stringify(subasta))

    useEffect(() => {
        let tick;

        if(!finalizada && online && documento_pujador) {

            tick = setInterval(() => {
                setTemporizador(previousState => previousState - 1)
            }, 950);

            if(temporizador === 0) {
                clearInterval(tick)
                if(documento === documento_pujador) {

                    const finishSubasta = async () => {
                        dispatch( startLoading() )
                        try {
                            const { data } = await _finishSubasta(_id)
                            dispatch( finishLoading() )
    
                            if(data.error) {
                                dispatch(showError( data.error ))
                                return
                            }

                            const { notificacion } = data
                            socket.emit('usuario:notificacion', { notificacion })

                        } catch (error) {
                            console.error(error)
                            dispatch(showError())
                        }
                    }
                    finishSubasta();
                }

                copyInfoSubasta['finalizada'] = true
                setSubasta(copyInfoSubasta)
                setModalGanador(true)
            }
        }
        return () => {
            clearInterval(tick)
        }

    }, [ documento, documento_pujador, temporizador, dispatch, nombre_pujador, finalizada, online, subasta, setSubasta, copyInfoSubasta, _id])

    return (
        <>
            {
                modalGanador && <ModalGanadorSubasta ganador={puja_mayor} setModalGanador={setModalGanador} />
            }
            <p className="px-4 text-center text-muted lh-sm small">
                A continuación, aparece la puja ganadora actual de la subasta y el historial de todas las pujas que se han realizado durante la subasta                
            </p>

            {
                documento_pujador && !finalizada && online &&
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
                !finalizada && online && sonido &&
                <audio className="visually-hidden" autoPlay="autoplay">
                    <source src={soundPuja}></source>
                </audio>
            }
        </>
    )
}
