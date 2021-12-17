import React from 'react'

import Visitar from '../../assets/img/go.png';

import { Link } from 'react-router-dom';


export const ReportesExterno = () => {
    return (
        <div className="reportes-externo mb-5">
            <div className="d-flex justify-content-center mb-4">
                <div className="btn-group" role="group">
                    <button type="button" className="btn btn-outline-primary border-2 fw-bolder py-2 px-3 shadow">
                        Pujas realizadas
                    </button>
                    <button type="button" className="btn btn-outline-primary border-2 fw-bolder py-2 px-3 shadow">
                        Pujas ganadas
                    </button>
                    <button type="button" className="btn btn-outline-primary border-2 fw-bolder py-2 px-3 shadow">
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
                            <tr className="table-success">
                                <td className="text-success fw-bolder">Ganada</td>
                                <td className="fw-bolder">$ 3.000.000</td>
                                <td>21 nov 2021 a las 17:50</td>
                                <td>
                                    <Link to="/subasta" className="hint--left" aria-label="Ir a la subasta">
                                        <img src={ Visitar } alt="Ir" width={40} height={40} />
                                    </Link>
                                </td>
                            </tr>
                            <tr className="table-danger">
                                <td className="text-danger fw-bolder">Perdida</td>
                                <td className="fw-bolder">$ 3.000.000</td>
                                <td>21 nov 2021 a las 17:50</td>
                                <td>
                                    <Link to="/subasta" className="hint--left" aria-label="Ir a la subasta">
                                        <img src={ Visitar } alt="Ir" width={40} height={40} />
                                    </Link>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="d-flex justify-content-center my-3">
                    <button type="button" className="btn btn-outline-success border-2 mx-auto fw-bolder">
                        Generar reporte
                    </button>
                </div>
            </div>
        </div>
    )
}
