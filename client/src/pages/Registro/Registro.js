import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { login } from '../../actions/auth'
import { finishLoading, showError, showSuccess, startLoading } from '../../actions/ui'
import { _registerUser } from '../../api/usuarios.api'
import { LoadingBtn } from '../../components/LoadingBtn'

import { useForm } from '../../hooks/useForm'

import './Registro.css'

const Registro = () => {

    const dispatch = useDispatch()
    const { loading } = useSelector( state => state.ui )

    const dataUsuario = useSelector( state => state.auth )

    // const dataUsuario = {
    //     nombre: usuario.nombre, 
    //     tipo_documento: usuario.tipo_documento,
    //     documento: usuario.documento,
    //     correo: usuario.correo,
    //     fecha_nacimiento: usuario.fecha_nacimiento,
    //     expedicion_documento: usuario.expedicion_documento,
    //     genero: usuario.genero
    // }

    const [ usuario, handleInputChange ] = useForm(dataUsuario?.documento ? dataUsuario : {
        nombre: '',
        tipo_documento: '',
        documento: '',
        correo: '',
        fecha_nacimiento: '',
        expedicion_documento: '',
        genero: '',
        password: '',
        re_password: '',
        tipo_usuario: ''
    })

    const {
        nombre,
        tipo_documento,
        documento,
        correo,
        fecha_nacimiento,
        expedicion_documento,
        genero,
        password,
        re_password,
        tipo_usuario } = usuario

    const handleSubmit = async (e) => {
        e.preventDefault()

        dispatch(startLoading())

        try {
            
            const { data } = await _registerUser( usuario ) 
            dispatch(finishLoading())

            if(data.error) {
                dispatch(showError( data.error ))
                return
            }

            const user = data.usuario

            localStorage.setItem('token', data.token)
            dispatch(login( user ))

            dispatch(showSuccess( data.message ))

        } catch (error) {
            console.error(error)
            dispatch(showError())
        }


    }

    return (
        <div className="login container my-4">
            <form className="col-md-6 mx-auto d-flex flex-column border rounded-3 py-3 px-4 shadow animated fadeIn" onSubmit={ handleSubmit }>
                <h2 className="text-center mb-4 fw-bolder">Registrarse</h2>
                <div className="group-registro d-flex align-items-center flex-wrap">
                    <div className="form-floating mb-3">
                        <input 
                            type="text" 
                            className="form-control" 
                            placeholder="Nombre completo"
                            id="nombre"
                            name="nombre" 
                            value={ nombre } 
                            onChange={ handleInputChange }
                        />
                        <label htmlFor="nombre">Nombre completo</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input 
                            type="email" 
                            className="form-control"
                            placeholder="Correo electr??nico"
                            id="correo"
                            name="correo"
                            value={ correo }
                            onChange={ handleInputChange }
                        />
                        <label htmlFor="correo">Correo electr??nico</label>
                    </div>
                </div>
                <div className="group-registro d-flex align-items-center flex-wrap">
                    <div className="form-floating mb-3">
                        <select 
                            className="form-select"
                            id="tipo_documento"
                            name="tipo_documento"
                            value={ tipo_documento }
                            onChange={ handleInputChange }
                        >
                            <option value="" defaultValue>Seleccione...</option>
                            <option value="CC">C??dula de ciudadan??a</option>
                            <option value="CE">C??dula de extranjer??a</option>
                            <option value="PS">Pasaporte</option>
                        </select>
                        <label htmlFor="tipo_documento">Tipo de documento</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input 
                            type="text"
                            className="form-control"
                            placeholder="N??mero de identificai??n"
                            id="num-documento"
                            name="documento"
                            value={ documento }
                            onChange={ handleInputChange }
                        />
                        <label htmlFor="num-documento">N??mero de identificai??n</label>
                    </div>
                </div>
                <div className="group-registro d-flex align-items-center flex-wrap">
                    <div className="form-floating mb-3">
                        <input 
                            type="date"
                            className="form-control"
                            placeholder="Fecha de expedici??n documento"
                            id="expedicion_documento"
                            name="expedicion_documento"
                            value={ expedicion_documento }
                            onChange={ handleInputChange }
                        />
                        <label htmlFor="expedicion_documento">Fecha de expedici??n documento</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input 
                            type="date"
                            placeholder="Fecha de nacimiento"
                            className="form-control"
                            id="fecha_nacimiento"
                            name="fecha_nacimiento"
                            value={ fecha_nacimiento }
                            onChange={ handleInputChange }
                        />
                        <label htmlFor="fecha_nacimiento">Fecha de nacimiento</label>
                    </div>
                </div>
                <div className="group-registro d-flex  align-items-center flex-wrap">
                    <div className="form-floating mb-3">
                        <select 
                            className="form-select"
                            id="genero"
                            name="genero"
                            value={ genero }
                            onChange={ handleInputChange }
                        >
                            <option value="" defaultValue>Seleccione...</option>
                            <option value="Hombre">Hombre</option>
                            <option value="Mujer">Mujer</option>
                            <option value="Otro">Otro</option>
                        </select>
                        <label htmlFor="genero">G??nero</label>
                    </div>
                    <div className="form-floating mb-3 d-none">
                        <select 
                            className="form-select"
                            id="tipo_usuario"
                            name="tipo_usuario"
                            value={ tipo_usuario }
                            onChange={ handleInputChange }
                        >
                            <option value="" defaultValue>Seleccione...</option>
                            <option value="externo">Externo</option>
                            <option value="interno">Interno</option>
                            <option value="admin">Administrador</option>
                        </select>
                        <label htmlFor="tipo_usuario">Tipo de usuario</label>
                    </div>
                </div>
                <div className="group-registro d-flex align-items-center flex-wrap">
                    <div className="form-floating mb-3">
                        <input 
                            type="password"
                            className="form-control"
                            placeholder="Contrase??a"
                            id="password"
                            name="password"
                            value={ password }
                            onChange={ handleInputChange }
                        />
                        <label htmlFor="password">Contrase??a</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input 
                            type="password" 
                            className="form-control"
                            placeholder="Confirmar contrase??a"
                            id="re_password"
                            name="re_password"
                            value={ re_password }
                            onChange={ handleInputChange }
                        />
                        <label htmlFor="re_password">Confirmar contrase??a</label>
                    </div>
                </div>
                <div className="d-flex align-items-center justify-content-center">
                    <button 
                        type="submit"
                        disabled={ loading }
                        className="btn btn-outline-primary d-flex align-items-center fw-bolder border-2">
                        Registrarse
                        { loading && <LoadingBtn tipo="primary" /> }
                    </button>
                </div>
                <p className="text-secondary d-flex mx-auto mt-3">
                    ??Ya tiene una cuenta?
                    <Link to="/login" className="ms-2 fw-bolder">
                        Iniciar sesi??n
                    </Link>
                </p>
            </form>
        </div>
    )
}

export default Registro