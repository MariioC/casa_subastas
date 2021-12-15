import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

import Logo from '../assets/img/logo.png'

import Hombre from '../assets/img/hombre.png'
import Mujer from '../assets/img/mujer.png'
import Otro from '../assets/img/otro.png'

import { useDispatch, useSelector } from 'react-redux'
import { startLogout } from '../actions/auth'
import { socket } from '../sockets/socket'

import { Notificacion } from './Notificacion'
import { notificaciones, addNotificacion, startGetNotificaciones } from '../actions/notificaciones'

import './Header.css'
import { ToastNotificacion } from './ToastNotificacion'

export const Header = () => {

    const dispatch = useDispatch()
    
    const { nombre, genero } = useSelector( state => state.auth )
    const allNotificaciones = useSelector( state => state.notificaciones )

    const [newNotificacion, setNewNotificacion] = useState(null)

    const logout = (e) => {
        e.preventDefault()
        dispatch(startLogout())
        dispatch(notificaciones([]))
    }

    useEffect(() => {

        dispatch( startGetNotificaciones() )

    }, [ nombre, dispatch ])

    useEffect(() => {

        socket.on('usuario:notificacion', ({ notificacion }) => {
            dispatch(addNotificacion(notificacion))
            setNewNotificacion(notificacion)
        })

        return () => {
            socket.off('usuario:notificacion')
        }

    }, [ dispatch ])

    return (
        <>
            {
                newNotificacion &&
                <ToastNotificacion notificacion={ newNotificacion } setNewNotificacion={ setNewNotificacion } />
            }

            <nav className="header navbar navbar-expand-lg navbar-dark bg-primary py-3 border-bottom border-primary shadow animated fadeIn">
                <div className="container">
                    <NavLink to='/' className="navbar-brand fw-bolder">
                        <img className="me-1" src={ Logo } alt="Logo" width={35} height={35} /> Subastas S.A.S
                    </NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarText">
                        {
                            nombre
                                ?  <ul className="navbar-nav animated fadeIn">
                                        <li className="nav-item">
                                            <NavLink to='/' className="btn btn-primary fw-bolder mx-1">Inicio</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink to='/reportes' className="btn btn-primary fw-bolder mx-1">Reportes</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <div className="flex-shrink-0 dropdown mx-1">
                                                <a href="/"
                                                    className="d-block position-relative btn btn-primary fw-bolder dropdown-toggle d-flex align-items-center justify-content-center"
                                                    id="notificaciones"
                                                    data-bs-toggle="dropdown"
                                                    aria-expanded="false"
                                                >
                                                    {
                                                        allNotificaciones.filter(n => !n.view ).length > 0 &&
                                                        <span className="badge rounded-circle bg-danger" style={{ marginRight: 2 }}>
                                                            { allNotificaciones.filter(n => !n.view ).length }
                                                        </span>
                                                    }
                                                    Notificaciones
                                                </a>
                                                <ul className="dropdown-menu dropdown-menu-end py-0 overflow-hidden text-small shadow animated fadeIn faster" aria-labelledby="notificaciones" style={{ width: 300 }}>
                                                    <div className="container-notificaciones list-group list-group-flush border-bottom scrollarea">
                                                        {
                                                            !allNotificaciones.length &&
                                                            <div className="text-center text-muted py-3 small" style={{ marginRight: 2 }}>
                                                                Sin novedades
                                                            </div>
                                                        }
                                                        {
                                                            allNotificaciones.map( notificacion => (
                                                                <Notificacion key={notificacion._id} notificacion={notificacion} />
                                                            ))
                                                        }
                                                    </div>
                                                </ul>
                                            </div>
                                        </li>
                                        <li className="nav-item">
                                            <div className="flex-shrink-0 dropdown mx-1">
                                                <Link to="/" className=" d-block btn btn-primary fw-bolder py-1 dropdown-toggle d-flex align-items-center" id="perfil" data-bs-toggle="dropdown" aria-expanded="false">
                                                    <img className="rounded-circle img-fluid me-1" src={ genero === 'Hombre' ? Hombre : genero === 'Mujer' ? Mujer : Otro } alt="mdo" width={28} height={28} />
                                                    { nombre.split(' ')[0] }
                                                </Link>
                                                <ul className=" dropdown-menu dropdown-menu-end py-0 overflow-hidden text-small shadow animated fadeIn faster" aria-labelledby="perfil">
                                                    <li>
                                                        <NavLink to='/perfil' className="text-center dropdown-item py-2 fw-bolder">
                                                            Ver peril
                                                        </NavLink>
                                                    </li>
                                                    <li>
                                                        <hr className="dropdown-divider my-0" />
                                                    </li>
                                                    <li>
                                                        <a href="/" onClick={ logout } className=" text-center dropdown-item py-2 fw-bolder">
                                                            Cerrar sesión
                                                        </a>
                                                    </li>
                                                </ul>
                                            </div>
                                        </li>
                                    </ul>
                                :   <ul className="navbar-nav animated fadeIn fast">
                                        <li className="nav-item">
                                            <NavLink to='/login' className="btn btn-primary fw-bolder mx-1">Iniciar sesión</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink to='/registro' className="btn btn-primary fw-bolder mx-1">Registrarse</NavLink>
                                        </li>
                                    </ul>
                        }
                    </div>
                </div>
            </nav>
        </>
    )
}
