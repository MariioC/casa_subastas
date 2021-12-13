import React, { lazy, Suspense, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Routes, Navigate } from 'react-router'

// Actions
import { login, logout } from '../actions/auth'

// Service API
import { _is_logged } from '../api/usuarios.api'

//Componentes
import { Header } from '../components/Header'
import { LoadingPage } from '../components/LoadingPage'

// Guards
import { RequireAuth } from './RequireAuth'
import { RequireLogout } from './RequireLogout'


const Login = lazy( () => import(/* webpackChunkName: "login" */ '../pages/Login/Login'))
const Registro = lazy( () => import(/* webpackChunkName: "registro" */ '../pages/Registro/Registro'))
const Recuperar = lazy( () => import(/* webpackChunkName: "recuperar" */ '../pages/Recuperar/Recuperar'))
const Home = lazy( () => import(/* webpackChunkName: "home" */ '../pages/Home/Home'))
const NewSubasta = lazy( () => import(/* webpackChunkName: "newsubasta" */ '../pages/NewSubasta/NewSubasta'))
const Subasta = lazy( () => import(/* webpackChunkName: "subasta" */ '../pages/Subasta/Subasta'))
const Reportes = lazy( () => import(/* webpackChunkName: "reportes" */ '../pages/Reportes/Reportes'))


export const IndexRouter = () => {

    const [checking, setChecking] = useState(true)
    const dispatch = useDispatch()
    
    useEffect(() => {

        if(!localStorage.getItem('token')) {
            setChecking(false)
        } else {

            _is_logged().then( ({ data }) => {
                if(data.error) {
                    localStorage.removeItem('token')
                    dispatch( logout() )
                    return
                }

                const { usuario } = data

                dispatch( login(usuario) )

                // FINALIZO LA CARGA
                setChecking(false)

            }).catch( error => {
                localStorage.removeItem('token')
                dispatch( logout() )
                setChecking(false)
            })
        }

    }, [ setChecking, dispatch])


    if(checking) {
        return (
            <LoadingPage />
        )
    }

    return (
        <>
            <Header />
            <Suspense fallback={ <LoadingPage /> }>
                <Routes>

                    <Route path="/login" element={ 
                        <RequireLogout>  
                            <Login />
                        </RequireLogout> }
                    />

                    <Route path="/registro" element={ 
                        <RequireLogout> 
                            <Registro /> 
                        </RequireLogout> } 
                    />

                    <Route path="/recuperar" element={ 
                        <RequireLogout> 
                            <Recuperar /> 
                        </RequireLogout> } 
                    />

                    <Route path="/recuperar/:token" element={ 
                        <RequireLogout> 
                            <Recuperar /> 
                        </RequireLogout> } 
                    />

                    {/* <Route path="/login" element={<Login />} />
                    <Route path="/registro" element={<Registro />} />
                    <Route path="/recuperar" element={<Recuperar />} />
                    <Route path="/recuperar/:token" element={<Recuperar />} /> */}

                    <Route path="/" element={ 
                        <RequireAuth> 
                            <Home />
                        </RequireAuth> } 
                    />

                    <Route path="/perfil" element={ 
                        <RequireAuth> 
                            <Registro />
                        </RequireAuth> }
                    />

                    <Route path="/new/subasta" element={ 
                        <RequireAuth interno={true}> 
                            <NewSubasta />
                        </RequireAuth>} 
                    />

                    <Route path="/subasta/:id" element={ 
                        <RequireAuth> 
                            <Subasta />
                        </RequireAuth>} 
                    />

                    <Route path="/reportes" element={ 
                        <RequireAuth> 
                            <Reportes />
                        </RequireAuth>} 
                    />

                    <Route path="*" element={<Navigate replace to="/" />} />

                    {/* <Route path="/" element={<Home />} /> */}
                    {/* <Route path="/new/subasta" element={<NewSubasta />} />
                    <Route path="/subasta/" element={<Subasta />} />
                    <Route path="/reportes" element={<Reportes />} /> */}
                    {/* <Route path="*" element={<Navigate replace to="/" />} /> */}

                </Routes>
            </Suspense>
        </>
    )
}
