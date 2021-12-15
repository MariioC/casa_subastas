import React, { useEffect, useState } from 'react';

import { InfoSubasta } from '../../components/subastas/InfoSubasta'
import { PanelPujas } from '../../components/pujas/PanelPujas';
import { PanelUsuarios } from '../../components/usuarios/PanelUsuarios';

import { _getSubasta } from '../../api/subastas.api';
import { useParams, useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { finishLoading, showError, startLoading } from '../../actions/ui';
import { SubastaProvider } from '../../context/SubastaContext';
import { LoadingPage } from '../../components/LoadingPage';
import { connectSocketSubasta, socketSusbasta } from '../../sockets/socket';
import { ToastCancelPuja } from '../../components/subastas/ToastCancelPuja';

import './Subasta.css';
import { InstruccionesSubasta } from '../../components/subastas/InstruccionesSubasta';


const Subasta = () => {


    const navigate = useNavigate();

    const { id } = useParams();

    const [loading, setLoading] = useState(true)

    const dispatch = useDispatch();
    
    const [ subastaInfo, setSubastaInfo ] = useState({
        subasta: null,
        pujas: null
    })

    const ocultarInstruccionesAlIniciar = localStorage.getItem('ocultarInstruccionesAlIniciar');
    const [ verCondiciones, setVerCondiciones ] = useState(!ocultarInstruccionesAlIniciar)

    useEffect(() => {

        const getSubastas = async () => {
            dispatch( startLoading() )
            try {
                const { data } = await _getSubasta( id )
                dispatch( finishLoading() )
    
                if(data.error) {
                    dispatch(showError( data.error ))
                    return
                }

                const { subasta, pujas } = data
                
                // Compruebo si la subasta ya finalizó mediante las fechas
                const dateFin = new Date(subasta.fecha_fin)
                const fechaFin = new Date(dateFin.getTime() + dateFin.getTimezoneOffset() * 60000)

                const dateInicio = new Date(subasta.fecha_inicio)
                const fechaInicio = new Date(dateInicio.getTime() + dateInicio.getTimezoneOffset() * 60000)
                
                const fechaActual = new Date()

                const finalizada = fechaActual.getTime() >= fechaFin.getTime() ? true : false

                subasta['finalizada'] = finalizada;

                const enCurso = fechaActual.getTime() >= fechaInicio.getTime() && !finalizada ? true : false

                subasta['en_curso'] = enCurso;

                setSubastaInfo({
                    subasta,
                    pujas
                });

                // if (enCurso) {
                //     dispatch( showError('La subasta ya inicio. No se permiten más participantes') )
                //     return navigate('/', { replace: true });
                // }

                if(!finalizada)
                    connectSocketSubasta({ id_subasta: id })

                setLoading(false)

            } catch (error) {
                console.error(error)
                dispatch(showError())
            }
        }

        getSubastas();

        return () => {
            socketSusbasta.disconnect();
        }
        
    }, [ dispatch, id, navigate ])


    if(loading) {
        return (
            <LoadingPage />
        )
    }

    return (
        <>
            <SubastaProvider info={subastaInfo}>

                <ToastCancelPuja />

                { verCondiciones && <InstruccionesSubasta setVerCondiciones={setVerCondiciones} /> }

                
                <div className="page-subasta container my-3 mb-4 animated fadeIn">
                    <div className="d-flex justify-content-between align-items-start flex-wrap">
                        
                        <InfoSubasta setVerCondiciones={setVerCondiciones} />
                        <PanelPujas />
                        <PanelUsuarios />

                    </div>
                </div>
            </SubastaProvider>
        </>
    );
};

export default Subasta;