import React from 'react'

export const InstruccionesSubasta = ({ setVerCondiciones }) => {

    const ocultarInstruccionesAlIniciar = localStorage.getItem('ocultarInstruccionesAlIniciar');


    const closeCondiciones = () => {

        if(!ocultarInstruccionesAlIniciar) {
            const NoViewMore = document.querySelector('#checkNoViewMore').checked;    
            if(NoViewMore)
                localStorage.setItem('ocultarInstruccionesAlIniciar', true)
        }

        setVerCondiciones(false)
    }

    return (
        <div className="modal fade show d-block bg-black bg-opacity-50" style={{ zIndex: 2 }}>
            <div className="modal-dialog shadow-lg animated zoomIn faster" style={{ marginTop: '90px' }}>
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title fw-bolder text-muted">Condiciones de una subasta online</h5>
                    <button onClick={closeCondiciones} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body small py-3 px-4 text-muted text_justify">
                    <p className="mb-0">A continuación, se enumeran las consideraciones que debe tener en cuenta para poder participar de una manera adecuada en una subasta online:</p>

                    <hr className="dropdown-divider mx-3 my-2 border-1" />

                    <ul className="pe-3">

                        <li className="mb-2">Cada vez que un participante realize una puja, los demás participantes tendrán un lapso de <strong>30 segundos</strong> para realizar una nueva puja que supere a la ganadora actual y de esta manera reiniciar el lapso de tiempo de 30 segundos</li>

                        <li className="mb-2">Si en el transcurso de los 30 segundos <strong>NO</strong> hay una nueva puja, Se dará por finalizada la subasta y el ganador será el usuario que realizó la ultima puja</li>

                        <li className="mb-2">NO puede realizar 2 pujas seguidas, si usted se sitúa como el <strong>"ganador temporal"</strong> de la subasta, no podrá realizar más pujas hasta que otro participante supere el valor de su puja</li>

                    </ul>
                    {   !ocultarInstruccionesAlIniciar &&
                        <div className="form-check">
                            <input className="form-check-input" type="checkbox" id="checkNoViewMore" />
                            <label className="form-check-label" htmlFor="checkNoViewMore">No volver a mostrar</label>
                        </div>
                    }
                </div>
                <div className="modal-footer">
                    <button onClick={closeCondiciones} type="button" className="btn btn-primary">Entendido</button>
                </div>
                </div>
            </div>
        </div>
    )
}
