import { types } from '../types/types'

import Swal from 'sweetalert2' 


export const showError = ( error = false ) => {
    
    Swal.fire({
        icon: 'error',
        title: '¡Upss!',
        confirmButtonColor: '#2b78bc',
        confirmButtonText: 'Aceptar',
        html: !error ? 'Ah ocurrido un error inesperado. \nInténtelo más tarde' : error
    });

    return {
        type: types.uiShowError,
        payload: error
    }
}

export const showSuccess = ( message = false ) => {
    
    Swal.fire({
        icon: 'success',
        title: '¡Correcto!',
        confirmButtonColor: '#2b78bc',
        confirmButtonText: 'Aceptar',
        html: !message ? 'Operación realizada correctamente' : message
    })

    return {
        type: types.uiShowSuccess,
        payload: message
    }
}
export const removeError = ( ) => {

    return {
        type: types.uiRemoveError
    }
}

export const startLoading = ( ) => {
    Swal.fire({
        title: '¡Cargando!',
        text: 'Por favor, espere...',
        allowOutsideClick: false
    })
    Swal.showLoading()
    return {
        type: types.uiStartLoading
    }
}

export const finishLoading = ( ) => {
    Swal.close()
    return {
        type:types.uiFinishLoading
    }
}