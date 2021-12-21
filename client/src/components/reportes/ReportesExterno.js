import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { finishLoading, showError, startLoading } from '../../actions/ui';
import { _getAllPujas } from '../../api/pujas.api';

import { TrItemPuja } from './TrItemPuja';

export const ReportesExterno = () => {

    const dispatch = useDispatch();

    const [filtro, setFiltro] = useState('all')

    const [pujas, setPujas] = useState([])
    const [pujasFiltradas, setPujasFiltradas] = useState([])

    useEffect(() => {
        
        const getPujas = async () => {
            dispatch(startLoading())
            try {
                const { data } = await _getAllPujas()
                dispatch(finishLoading())

                if(data.error) {
                    dispatch(showError( data.error ))
                    return
                }
    
                const { pujas } = data
                setPujas(pujas);
                
            } catch (error) {
                dispatch(finishLoading())
                console.error(error)
                setPujas([])
            }
        }

        getPujas()

    }, [ dispatch ])

    useEffect(() => {

        if(!pujas.length) return setPujasFiltradas([]);

        if(filtro === 'winners') {
            setPujasFiltradas(pujas.filter( p => p.ganadora === true))
        } else if(filtro === 'losers') {
            setPujasFiltradas(pujas.filter( p => p.ganadora === false))
        } else {
            // ALL
            setPujasFiltradas(pujas)
        }

    }, [ filtro, pujas ])

    return (
        <div className="reportes-externo mb-5">

            <div className="d-flex justify-content-center mb-4">
                <div className="btn-group" role="group">

                    <button type="button" onClick={() => setFiltro('all')} className={`btn btn-outline-primary border-2 fw-bolder py-2 px-3 shadow ${filtro === 'all' && 'active'}`}>
                        Pujas realizadas
                    </button>

                    <button type="button" onClick={() => setFiltro('winners')} className={`btn btn-outline-primary border-2 fw-bolder py-2 px-3 shadow ${filtro === 'winners' && 'active'}`}>
                    Pujas ganadas
                    </button>

                    <button type="button" onClick={() => setFiltro('losers')} className={`btn btn-outline-primary border-2 fw-bolder py-2 px-3 shadow ${filtro === 'losers' && 'active'}`}>
                        Pujas perdidas
                    </button>

                </div>
            </div>

            <div className="resultados-reporte col-12 mb-5">
                <h3 className="fw-bolder text-center mb-2 col-10 mx-auto">Resultados</h3>
                <div className="container-tabla rounded border border-2 border-primary" style={{ overflowX: "auto" }}>
                    <table className="table mb-0 table-hover table-responsive text-center rounded table-borderless" style={{ minWidth: 700 }}>
                        <thead className="bg-primary text-white">
                            <tr>
                                <th scope="col">Estado</th>
                                <th scope="col">Valor</th>
                                <th scope="col">Fecha</th>
                                <th scope="col">Ver</th>
                            </tr>
                        </thead>
                        <tbody className="border-0">

                            {
                                !pujasFiltradas.length && <tr><td colSpan={4} className="alert alert-danger text-center border-0 fw-bolder animated fadeIn fast">No se han encontrado registros</td></tr>
                            }

                            {
                                pujasFiltradas.map( puja => (
                                    <TrItemPuja key={puja._id} puja={puja} />
                                ))
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
