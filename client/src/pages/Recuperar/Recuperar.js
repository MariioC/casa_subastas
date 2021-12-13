import React, { useState } from 'react';
import { useParams } from 'react-router-dom';


const Recuperar = () => {

    const { token } = useParams();

    const [loading, setLoading] = useState(false)
    console.log(setLoading);


    return (
        <div className="login container my-4">
            <form className="col-lg-4 col-md-6 mx-auto d-flex flex-column border rounded-3 py-3 px-4 shadow animated fadeIn">
                {
                    !token ?
                    <>
                        <h3 className="text-center mb-4 fw-bolder">Restablecer contraseña</h3>
                        <div className="form-floating mb-3">
                            <input type="text" className="form-control" id="documento" placeholder="Documento o correo" />
                            <label htmlFor="documento">Documento o correo</label>
                        </div>
                    </>
                    :
                    <>
                        <h3 className="text-center mb-4 fw-bolder">Cambiar contraseña</h3>
                        <div className="form-floating mb-3">
                            <input type="password" className="form-control" id="password" placeholder="Contraseña nueva" />
                            <label htmlFor="password">Contraseña nueva</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="password" className="form-control" id="re-password" placeholder="Confirmar contraseña" />
                            <label htmlFor="re-password">Confirmar contraseña</label>
                        </div>
                    </>
                }

                <div className="d-flex align-items-center justify-content-center flex-column">
                    <button type="submit" className="btn btn-outline-primary d-flex align-items-center fw-bolder border-2">

                        { !token ? 'Recuperar contraseña' : 'Cambiar contraseña' }

                        { loading &&
                            <div className="spinner-border text-primary ms-2" role="status" style={{ width: 20, height: 20 }}>
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        }

                    </button>
                </div>
            </form>
        </div>
    );
};

export default Recuperar;
