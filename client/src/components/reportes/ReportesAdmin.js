import React, { useState } from 'react'

import Visitar from '../../assets/img/go.png';
import Editar from '../../assets/img/editar.png';
import Eliminar from '../../assets/img/eliminar.png';

import { Link } from 'react-router-dom';

export const ReportesAdmin = () => {

    const [img, setImg] = useState('');

    return (
        <div className="reportes-admin mb-5">
            <div className="d-flex justify-content-center mb-4">
                <div className="btn-group" role="group">
                    <button type="button" className="btn btn-outline-primary border-2 fw-bolder py-2 px-3 shadow">
                        Subastas - Todas
                    </button>
                    <button type="button" className="btn btn-outline-primary border-2 fw-bolder py-2 px-3 shadow">
                        Subastas - Disponibles
                    </button>
                    <button type="button" className="btn btn-outline-primary border-2 fw-bolder py-2 px-3 shadow">
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
                                <th scope="col">Puja ganadora</th>
                                <th scope="col">Pujas</th>
                                <th scope="col">Ver</th>
                                <th scope="col">Editar</th>
                                <th scope="col">Eliminar</th>
                            </tr>
                        </thead>
                        <tbody className="border-0">
                            <tr className="border-secondary">
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
                            </tr>
                            <tr className="border-secondary">
                                <td>
                                    { img ? 
                                        <img className="foto animated fadeIn" src="@/assets/img/reliquia3.jpg" alt="Ir" width={100} height={100} />
                                        :
                                        <svg className="animated fadeIn" width={100} height={100}>
                                            <rect width={100} height={100} style={{ fill: "#CCC" }} />
                                        </svg>
                                    }
                                </td>
                                <td className="fw-bolder">Subasta Numero 2</td>
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
                            </tr>
                            <tr className="border-secondary">
                                <td>
                                    { img ? 
                                        <img className="foto animated fadeIn" src="@/assets/img/reliquia3.jpg" alt="Ir" width={100} height={100} />
                                        :
                                        <svg className="animated fadeIn" width={100} height={100}>
                                            <rect x="0" y="0" width={100} height={100} style={{ fill: "#CCC" }} />
                                        </svg>
                                    }
                                </td>
                                <td className="fw-bolder">Subasta Numero 3</td>
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
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="d-flex justify-content-center my-4">
                <button type="button" className="btn btn-outline-success border-2 mx-auto fw-bolder">
                    Generar reporte
                </button>
            </div>
        </div>
    )
}
