import React from 'react'

export const LoadingPage = () => {
    return (
        <div className="bg-light d-flex align-items-center flex-column w-100 animated fadeIn faster"  style={{height: "90vh"}}>
            <div className="d-flex justify-content-center align-items-center flex-column bg-white shadow-lg border border-1 mt-5 py-2 px-4 rounded-2">
                <div className="spinner-border text-primary mt-4 mx-4" style={{width: "150px", height: "150px", borderWidth: "6px"}}></div>
                <p className="text-primary fw-bolder text-center mt-2 mb-3 fs-5">Cargando...</p>
            </div>
        </div>
    )
}
