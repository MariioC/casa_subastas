import React, { useContext } from 'react'
import { SubastaContext } from '../../context/SubastaContext'
import { ItemPuja } from './ItemPuja'


export const ListPujas = () => {

    const { subasta:{ online, finalizada }, pujas } = useContext(SubastaContext)

    return (
        <div className="pujas-hechas col-11 col-md-10 mx-auto mb-4 mt-3">
            <h4 className="text-center fw-bolder py-2 text-white bg-primary mb-0 rounded-top">
                Pujas{ pujas.length > 0 && <>:<span className="ms-1">{ pujas.length }</span></> }
            </h4>
            <div className="historial-pujas mx-auto border border-primary rounded-bottom">
                { pujas.length > 0 && pujas.map( puja => (
                        <ItemPuja key={puja._id} puja={ puja } online={online} finalizada={finalizada}/>
                    ))
                }
                { !pujas.length && <div className="notificacion text-danger py-2 px-3 border-top border-none bg-danger bg-opacity-25 fw-bolder text-center position-relative animated fadeIn fast">No se han realizado pujas en esta subasta</div>
                }
            </div>
        </div>
    )
}
