import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { finishLoading, showError, showSuccess, startLoading } from '../../actions/ui';
import { _newSubasta } from '../../api/subastas.api';
import { LoadingBtn } from '../../components/LoadingBtn';
import { useForm } from '../../hooks/useForm';

import './NewSubasta.css';

const NewSubasta = () => {

    const dispatch = useDispatch()
    const { loading } = useSelector( state => state.ui )

    const [previewImg, setPreviewImg] = useState(null)

    const { state: dataSubasta } = useLocation()
    
    let initDataForm = dataSubasta ? dataSubasta : {
        nombre: '',
        descripcion: '',
        fecha_cancelacion: '',
        fecha_inicio: '',
        hora_inicio: '',
        fecha_fin: '',
        hora_fin: '',
        monto_inicial: '',
        online: ''
    }

    console.log(dataSubasta);

    const [ subasta, handleInputChange, resetData ] = useForm(initDataForm)

    const {
        nombre,
        descripcion,
        fecha_cancelacion,
        fecha_inicio,
        hora_inicio,
        fecha_fin,
        hora_fin,
        monto_inicial,
        online } = subasta

    const onChangeFile = ( e ) => {
        const file = e.target.files[0];
        if(!file) {
            return setPreviewImg(null)
        }
        setPreviewImg(URL.createObjectURL(file))

    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const formSubasta = document.querySelector('#form-subasta');

        const formData = new FormData(formSubasta);

        dispatch(startLoading())

        try {
            
            const { data } = await _newSubasta( formData ) 
            dispatch(finishLoading())

            if(data.error) {
                dispatch(showError( data.error ))
                return
            }

            dispatch(showSuccess( data.message ))

            resetData();
            formSubasta.reset();
            setPreviewImg(null);

        } catch (error) {
            dispatch(showError())
        }


    }

    return (
        <div className="crear-subasta container my-4">
            <form id="form-subasta" onSubmit={ handleSubmit } className="col-md-6 mx-auto d-flex flex-column border rounded-3 py-3 px-4 shadow animated fadeIn">
                <h2 className="text-center mb-4 fw-bolder">Nueva subasta</h2>
                <div className="group-subasta d-flex align-items-center flex-wrap">
                    <div className="form-floating mb-3">
                        <input type="text" 
                            className="form-control" 
                            id="nombre"
                            name="nombre"
                            value={ nombre }
                            onChange={ handleInputChange }
                            placeholder="Nombre subasta"
                        />
                        <label htmlFor="nombre">Nombre subasta</label>
                    </div>
                    <div className="form-floating mb-3">
                        <select className="form-select"
                            id="online"
                            name="online"
                            value={ online }
                            onChange={ handleInputChange }
                        >
                            <option value="" defaultValue>Seleccione...</option>
                            <option value="true">Online</option>
                            <option value="false">Offline</option>
                        </select>
                        <label htmlFor="online">Tipo subasta</label>
                    </div>
                </div>
                <div className="form-floating mb-3">
                    <textarea type="text" 
                        className="form-control"
                        id="descripcion"
                        name="descripcion"
                        defaultValue={ descripcion }
                        onChange={ handleInputChange }
                        placeholder="Descripción subasta"
                    />
                    <label htmlFor="descripcion">Descripción subasta</label>
                </div>
                <div className="group-subasta d-flex align-items-center flex-wrap">
                    <div className="form-floating mb-3">
                        <input type="date" 
                            className="form-control"
                            id="fecha-inicio"
                            name="fecha_inicio"
                            value={ fecha_inicio }
                            onChange={ handleInputChange }
                            placeholder="Fecha inicio"
                        />
                        <label htmlFor="fecha-inicio">Fecha inicio</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="time"
                            className="form-control"
                            id="hora-inicio"
                            name="hora_inicio"
                            value={ hora_inicio }
                            onChange={ handleInputChange }
                            placeholder="Hora inicio"
                        />
                        <label htmlFor="hora-inicio">Hora inicio</label>
                    </div>
                </div>
                <div className="group-subasta d-flex align-items-center flex-wrap">
                    <div className="form-floating mb-3">
                        <input type="date"
                            className="form-control"
                            id="fecha-fin"
                            name="fecha_fin"
                            value={ fecha_fin }
                            onChange={ handleInputChange }
                            placeholder="Fecha fin"
                        />
                        <label htmlFor="fecha-fin">Fecha fin</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="time"
                            className="form-control"
                            id="hora-fin"
                            name="hora_fin"
                            value={ hora_fin }
                            onChange={ handleInputChange }
                            placeholder="Hora fin"
                        />
                        <label htmlFor="hora-fin">Hora fin</label>
                    </div>
                </div>
                <div className="group-subasta d-flex align-items-center flex-wrap">
                    <div className="form-floating mb-3">
                        <input type="date"
                            className="form-control"
                            id="fecha-cancelacion"
                            name="fecha_cancelacion"
                            value={ fecha_cancelacion }
                            onChange={ handleInputChange }
                            placeholder="Fecha límite cancelación"
                        />
                        <label htmlFor="fecha-cancelacion">Fecha límite cancelación</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="number"
                            className="form-control"
                            id="monto"
                            name="monto_inicial"
                            value={ monto_inicial }
                            onChange={ handleInputChange }
                            placeholder="Monto inicial"
                        />
                        <label htmlFor="monto">Monto inicial</label>
                    </div>
                </div>
                <div className="group-subasta d-flex align-items-center flex-wrap mb-3">
                    <input type="file"
                        className="form-control"
                        id="foto"
                        name="foto"
                        onChange={ onChangeFile }
                        placeholder="Foto"
                        accept="image/png, image/jpeg, image/jpg, image/gif, image/webp"
                    />
                </div>
                
                { previewImg && 
                    <div className="preview-img col-md-6 mx-auto mb-3">
                        <img className="img-fluid d-block img-thumbnail shadow border-2 animated fadeIn mx-auto" src={ previewImg } alt ="Foto subasta"/>
                    </div>
                }
                <div className="d-flex align-items-center justify-content-center mb-2">
                    <button type="submit" className="btn btn-outline-primary d-flex align-items-center fw-bolder border-2">
                        Crear subasta
                        { loading && <LoadingBtn tipo="primary" /> }
                    </button>
                </div>
            </form>
        </div>
    );
};

export default NewSubasta;