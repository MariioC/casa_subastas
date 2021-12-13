import { Navigate, useLocation } from "react-router";
import { useSelector } from "react-redux";

export const RequireAuth = ({ children, interno }) => {
    
    let location = useLocation();

    const { documento, tipo_usuario} = useSelector( state => state.auth );

    if (!documento) {
        return <Navigate to="/login" state={{ from: location }} />;
    }

    if(interno) {
        if(tipo_usuario !== 'interno') {
            return <Navigate to="/" state={{ from: location }} />;
        }
    }

    return children;
};
