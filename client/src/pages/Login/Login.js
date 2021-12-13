import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from '../../hooks/useForm'

import { useDispatch, useSelector } from 'react-redux'

import { startLogin } from '../../actions/auth'

import { LoadingBtn } from '../../components/LoadingBtn'

const Login = () => {

    const dispatch = useDispatch()

    const { loading } = useSelector( state => state.ui )

    const [ formaData, handleInputChange ] = useForm({
        documento: 1085338002,
        password: '12345678'
    })

    const { documento, password } = formaData

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(startLogin(documento, password))
    }

    return (
        <div className="login container my-4">
            <form onSubmit={ handleSubmit } className="col-lg-4 col-md-6 mx-auto d-flex flex-column border rounded-3 py-3 px-4 shadow animated fadeIn">
                <h2 className="text-center mb-4 fw-bolder">Iniciar sesión</h2>
                <div className="form-floating mb-3">
                    <input 
                        type="text" 
                        className="form-control" 
                        name="documento" 
                        id="documento" 
                        placeholder="Documento"
                        value={ documento }
                        onChange={ handleInputChange } 
                        />
                    <label htmlFor="documento">Documento</label>
                </div>
                <div className="form-floating mb-3">
                    <input 
                        type="password" 
                        className="form-control" 
                        name="password" 
                        id="password" 
                        placeholder="Password"
                        value={ password }
                        onChange={ handleInputChange } 
                        />
                    <label htmlFor="password">Contraseña</label>
                </div>
                <div className="d-flex align-items-center justify-content-center flex-column">
                    <button 
                        type="submit"
                        disabled={ loading }
                        className="btn btn-outline-primary d-flex align-items-center fw-bolder border-2"
                    >
                        Iniciar sesión
                        { loading && <LoadingBtn tipo="primary" /> }

                    </button>
                    <Link to="/recuperar" className="link-primary small mt-2 text-decoration-none">
                        ¿Olvidó su contraseña?
                    </Link>
                </div>
                <p className="text-secondary d-flex mx-auto mt-4">
                    ¿Aún no tiene una cuenta?
                    <Link to="/registro" className="ms-2 fw-bolder">
                        Registrarse
                    </Link>
                </p>
            </form>
        </div>
    )
}

export default Login
