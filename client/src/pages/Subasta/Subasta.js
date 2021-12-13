import React, { useEffect, useState } from 'react';

import { InfoSubasta } from '../../components/subastas/InfoSubasta'
import { PanelPujas } from '../../components/pujas/PanelPujas';
import { PanelUsuarios } from '../../components/usuarios/PanelUsuarios';

import { _getSubasta } from '../../api/subastas.api';
import { useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import { finishLoading, showError, startLoading } from '../../actions/ui';
import { SubastaProvider } from '../../context/SubastaContext';
import { LoadingPage } from '../../components/LoadingPage';
import { connectSocketSubasta, socketBusbasta } from '../../sockets/socket';
import { ToastCancelPuja } from '../../components/subastas/ToastCancelPuja';

import './Subasta.css';
import { InstruccionesSubasta } from '../../components/subastas/InstruccionesSubasta';


const Subasta = () => {

    const { id } = useParams();

    const [loading, setLoading] = useState(true)

    const dispatch = useDispatch();
    
    const [ subastaInfo, setSubastaInfo ] = useState({
        subasta: null,
        pujas: null
    })

    const ocultarInstruccionesAlIniciar = localStorage.getItem('ocultarInstruccionesAlIniciar');

    const [ verCondiciones, setVerCondiciones ] = useState(!ocultarInstruccionesAlIniciar)

    // const toggleVerCondiciones = () => {
    //     setVerCondiciones(true)
    // }

    //TODO: Hacer que cuando el usuario vaya a salir de la subasta y si esta es online y no ha finalizado y si la mejor puja es de el, informarle que esta será eliminada y ya no se tendrá en cuenta si no hasta que finalice la subasta

    // Hacer una especie de contador, cada vez que haya una nueva puja haya un contador de 20 - 30 seg y que si este termina, la subasta se dará por finalizada y el ganador sera el usuario que hizo la ultima puja

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
                
                const fechaActual = new Date()

                const finalizada = fechaActual.getTime() >= fechaFin.getTime() ? true : false

                subasta['finalizada'] = finalizada;

                setSubastaInfo({
                    subasta,
                    pujas
                });

                if(!finalizada && subasta.online)
                    connectSocketSubasta({ id_subasta: id })

                setLoading(false)
            } catch (error) {
                console.error(error)
                dispatch(showError())
            }
        }

        getSubastas();

        return () => {
            socketBusbasta.disconnect();
        }
        
    }, [ dispatch, id ])


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