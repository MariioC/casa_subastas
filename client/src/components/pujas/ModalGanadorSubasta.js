import React from 'react'
import { prettierValorCOP } from '../../helpers/format'

import Ganador from '../../assets/img/ganador.png'

export const ModalGanadorSubasta = ({ ganador, setModalGanador }) => {

    const closeModalGanador = () => {
        setModalGanador(false)
    }

    return (
        <div className="modal fade show d-block bg-black bg-opacity-25" style={{ zIndex: 3 }}>
            <div className="modal-dialog shadow-lg animated bounceIn" style={{ marginTop: '90px' }}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title fw-bolder text-success text-center col-11">LA SUBASTA HA FINALIZADO</h5>
                        <button onClick={closeModalGanador} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body py-3 px-4 text-muted text_justify">

                        <p className="mb-0 text-center small">El tiempo para realizar una nueva puja a terminado, por esta razón se ha finalizado la subasta.</p>

                        <hr className="dropdown-divider mx-3 my-2 border-1" />

                        <img src={Ganador} className="img-fluid d-block mx-auto animated fadeIn fast" height={128} width={128} alt="Ganador" />

                        <p className="mb-0 text-center">El articulo de la subasta a sido vendido a <strong className="fs-5 text-success">{ganador.nombre_pujador}</strong> por un valor final de <strong className="fs-5 text-success">{ prettierValorCOP(ganador.valor)}</strong></p>
                        
                    </div>
                    <div className="modal-footer py-1">
                        <button onClick={closeModalGanador} type="button" className="btn btn-sm btn-danger">Cerrar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
