import React, { useContext, useEffect } from 'react'
import { SubastaContext } from '../../context/SubastaContext';
import { prettierValorCOP } from '../../helpers/format';

export const ToastCancelPuja = () => {

    // console.log( puja )
    const { puja_cancelada, setCancelPuja } = useContext(SubastaContext)

    useEffect(() => {
        const clear = setTimeout(() => {
            setCancelPuja(null)
        }, 5000);

        return () => {
            clearTimeout(clear);
        }
    }, [ setCancelPuja ])
    
    return (
        <>
            {
                puja_cancelada &&
                <div key={puja_cancelada._id} className="toast position-fixed bg-white border-primary animated fadeInRight show fast" style={{ top: '15px', right: '15px', zIndex: 2}}>
                    <div className="toast-header border-primary">
                        <svg className="bd-placeholder-img rounded me-2" width="15" height="15" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" preserveAspectRatio="xMidYMid slice" focusable="false">
                            <rect width="100%" height="100%" fill="#f04e4e"></rect>
                        </svg>
                        <strong className="me-auto text-primary">@PujasBoot</strong>
                        <small className="text-muted">Ahora mismo</small>
                        <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                    </div>
                    <div className="toast-body text-secondary text-center">
                        <strong>{ puja_cancelada.nombre_pujador }</strong> ha <span className="text-primary fw-bolder">cancelado</span> su puja por el valor de <strong>{ prettierValorCOP(puja_cancelada.valor) }</strong>
                    </div>
                </div>
            }
        </>
    )
}
