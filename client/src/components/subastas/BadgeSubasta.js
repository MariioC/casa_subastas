import React from 'react'

export const BadgeSubasta = ({ finalizada, online }) => {
    return (
        <>
            { finalizada && <span className="badge-subasta position-absolute badge rounded-pill bg-danger p-2 px-3">Finalizada</span> }
            { !finalizada && online && <span className="badge-subasta position-absolute badge rounded-pill bg-success p-2 px-3">Online</span> }
            { !finalizada && !online && <span className="badge-subasta position-absolute badge rounded-pill bg-primary p-2 px-3">Offline</span> }
        </>
    )
}
