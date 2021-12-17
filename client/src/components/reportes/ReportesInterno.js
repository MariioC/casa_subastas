import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';

import { finishLoading, showError, startLoading } from '../../actions/ui';

import { _getSubastas } from '../../api/subastas.api';

import { TrItemSubasta } from './TrItemSubasta';


export const ReportesInterno = () => {

    const dispatch = useDispatch();

    const [filtro, setFiltro] = useState('all')

    const [subastas, setSubastas] = useState([])

    const [subastasFiltradas, setSubastasFiltradas] = useState([])
    
    useEffect(() => {
        
        const getSubastas = async () => {
            dispatch(startLoading())
            try {
                const { data } = await _getSubastas()
                dispatch(finishLoading())

                if(data.error) {
                    dispatch(showError( data.error ))
                    return
                }
    
                const { subastas } = data
                setSubastas(subastas);
                
            } catch (error) {
                console.error(error)
                setSubastas([])
            }
        }

        getSubastas()

    }, [ dispatch ])

    useEffect(() => {

        if(!subastas.length) return;

        const subastasMaped = subastas.map( subasta => {
            const dateFin = new Date(subasta.fecha_fin)
            const fechaFin = new Date(dateFin.getTime() + dateFin.getTimezoneOffset() * 60000)

            const fechaActual = new Date()

            const finalizada = fechaActual.getTime() >= fechaFin.getTime() ? true : false

            return {
                ...subasta,
                finalizada
            }
        })

        if(filtro === 'available') {
            // console.log(f);
            setSubastasFiltradas(subastasMaped.filter( s => s.finalizada === false))
        } else if(filtro === 'finished') {
            setSubastasFiltradas(subastasMaped.filter( s => s.finalizada === true))
        } else {
            // ALL
            setSubastasFiltradas(subastasMaped)
        }

    }, [ filtro, subastas ])

    return (
        <div className="reportes-interno mb-5">
            <div className="d-flex justify-content-center mb-4">
                <div className="btn-group" role="group">
                    <button type="button" onClick={() => setFiltro('all')} className={`btn btn-outline-primary border-2 fw-bolder py-2 px-3 shadow ${filtro === 'all' && 'active'}`}>
                        Subastas - Todas
                    </button>
                    <button type="button" onClick={() => setFiltro('available')} className={`btn btn-outline-primary border-2 fw-bolder py-2 px-3 shadow ${filtro === 'available' && 'active'}`}>
                        Subastas - Disponibles
                    </button>
                    <button type="button" onClick={() => setFiltro('finished')} className={`btn btn-outline-primary border-2 fw-bolder py-2 px-3 shadow ${filtro === 'finished' && 'active'}`}>
                        Subastas - Finalizadas
                    </button>
                </div>
            </div>
            <div className="resultados-reporte col-12">
                <h3 className="fw-bolder text-center mb-2 col-10 mx-auto">Resultados</h3>
                <div className="container-tabla rounded border border-2 border-primary" style={{ overflowX: "auto" }}>
                    <table className="table mb-0 table-hover table-responsive text-center table-borderless" style={{ minWidth: 700 }}>
                        <thead className="bg-primary text-white">
                            <tr>
                                <th scope="col">Foto</th>
                                <th scope="col">Nombre subasta</th>
                                <th scope="col">Monto inicial</th>
                                <th scope="col">Fecha inicio</th>
                                <th scope="col">Fecha fin</th>
                                <th scope="col">Ver</th>
                                <th scope="col">Editar</th>
                                <th scope="col">Eliminar</th>
                            </tr>
                        </thead>
                        <tbody className="border-0">
                            {
                                !subastasFiltradas.length && <tr><td colSpan={8} className="alert alert-danger text-center border-0 bolder">No se han encontrado registros</td></tr>
                            }
                            {
                                subastasFiltradas.map( subasta => (
                                    <TrItemSubasta key={subasta._id} subasta={subasta} />
                                ))
                            }
                            {/* <tr className="border-secondary">
                                <td>
                                    { img ? 
                                        <img className="foto animated fadeIn" src="@/assets/img/reliquia3.jpg" alt="Ir" width={100} height={100} />
                                        :
                                        <svg className="animated fadeIn" width={100} height={100}>
                                            <rect x="0" y="0" width={100} height={100} style={{ fill: "#CCC" }} />
                                        </svg>
                                    }
                                </td>
                                <td className="fw-bolder">Subasta Numero 1</td>
                                <td>$ 1.500.000</td>
                                <td>$ 3.000.000</td>
                                <td>7</td>
                                <td>
                                    <Link to="/subasta" className="hint--left" aria-label="Ir a la subasta">
                                        <img src={ Visitar } alt="Ir" width={40} height={40} />
                                    </Link>
                                </td>
                                <td>
                                    <Link to="/" className="hint--left" aria-label="Editar subasta">
                                        <img src={ Editar } alt="Ir" width={40} height={40} />
                                    </Link>
                                </td>
                                <td>
                                    <Link to="/" className="hint--left" aria-label="Eliminar subasta">
                                        <img src={ Eliminar } alt="Ir" width={40} height={40} />
                                    </Link>
                                </td>
                            </tr> */}
                        </tbody>
                    </table>
                </div>
            </div>
            {/* <div className="d-flex justify-content-center my-4">
                <button type="button" className="btn btn-outline-success border-2 mx-auto fw-bolder">
                    Generar reporte
                </button>
            </div> */}
        </div>
    )
}
