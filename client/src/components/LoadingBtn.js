import React from 'react'

export const LoadingBtn = ({ tipo }) => {
    return (
        <div className={`spinner-border text-${tipo} ms-2`} role="status" style={{ width: 20, height: 20 }}>
            <span className="visually-hidden">Loading...</span>
        </div>
    )
}
