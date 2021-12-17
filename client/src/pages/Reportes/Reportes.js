import React from 'react';
import { useSelector } from 'react-redux';
import { ReportesAdmin } from '../../components/reportes/ReportesAdmin';

import { ReportesExterno } from '../../components/reportes/ReportesExterno';
import { ReportesInterno } from '../../components/reportes/ReportesInterno';

import './Reportes.css';

const Reportes = () => {
    
    const { tipo_usuario } = useSelector( state => state.auth )

    return (
        <div className="about container animated fadeIn">
            <h1 className="fw-bolder mt-2 text-center">Consultas generales</h1>
            <p className="text-muted text-center">A continuación, seleccione la opción que desea consultar para generar el reporte respectivo</p>

            { tipo_usuario === 'externo' && <ReportesExterno /> }
            { tipo_usuario === 'interno' && <ReportesInterno /> }
            { tipo_usuario === 'admin' && <ReportesAdmin /> }
            
        </div>
    );
};

export default Reportes;