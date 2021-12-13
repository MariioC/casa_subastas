import React, { useContext } from 'react'

import { SubastaContext } from '../../context/SubastaContext'
import { ItemListUsuario } from './ItemListUsuario'

export const ListUsuarios = () => {

    const { participantes } = useContext(SubastaContext)


    return (
        <div className="all-usuarios">
            <h6 className="mt-2 mb-0 pb-2 px-2 text-success fw-bolder border-bottom	">
                Participantes - <span className="badge rounded-pill bg-success fw-bolder small">{ participantes.length }</span>
            </h6>

            { !participantes.length &&  <div className="text-center text-black-50 py-2 small">Aún no hay participantes</div> }

            { participantes.length > 0 && 
                participantes.map( usuario => (
                    <ItemListUsuario key={usuario._id} usuario={ usuario } />
                ))
            }

        </div>
    )
}
