import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'

import { CardSubasta } from "../../components/subastas/CardSubasta";

import Logo from '../../assets/img/logo.png'
import "./Home.css";
import { _getSubastas } from "../../api/subastas.api";
import { finishLoading, showError, startLoading } from "../../actions/ui";

const Home = () => {

    const dispatch = useDispatch();

    const { tipo_usuario } = useSelector( state => state.auth )
    
    const [subastas, setSubastas] = useState([])

    useEffect(() => {

        const getSubastas = async () => {
            dispatch( startLoading() )
            try {
                const { data } = await _getSubastas()
                dispatch( finishLoading() )
    
                if(data.error) {
                    dispatch(finishLoading())
                    dispatch(showError( data.error ))
                    return
                }
    
                const { subastas } = data
                setSubastas(subastas);
    
            } catch (error) {
                console.error(error)
                dispatch(showError())
            }
        }

        getSubastas();

    }, [ dispatch ])

    return (
        <div className="home container-fluid animated fadeIn">
            <div className="home-subsatas container">
                <h1 className="text-center mt-2 fw-bolder">Subastas disponibles</h1>
                
                {   tipo_usuario === 'interno' &&
                    <div className="d-flex justify-content-center">
                        <Link to="/new/subasta" className="btn btn-lg btn-outline-success mx-auto mb-4 fw-bolder border-2">
                            <img className="me-1" src={ Logo } alt="Subasta" width={30} height={30} /> Crear subasta
                        </Link>
                    </div>
                }

                <div className="d-flex justify-content-between flex-wrap mb-5">
                    { !subastas.length && <div className="alert alert-danger text-center mx-auto fw-bolder border-2">Aún no se han creado subastas</div>  }
                    { subastas.length > 0 && subastas.map( subasta => (<CardSubasta subasta={subasta} key={ subasta._id } />)) }
                </div>
            </div>
        </div>
    );
};

export default Home;