import { useSelector } from "react-redux";
import { Navigate } from "react-router";

export const RequireLogout = ({ children }) => {

    const { documento } = useSelector( state => state.auth );

    if (documento) {
        return <Navigate to="/" />;
    }

    return children;
};
