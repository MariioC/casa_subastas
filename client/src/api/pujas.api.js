import { api } from './config.api'

export const _newPuja = async ( id_subasta, puja ) => {
    return await api.post(`pujas/new/${id_subasta}`, puja)
}

export const _cancelPuja = async ( id_puja ) => {
    return await api.delete(`pujas/${id_puja}`)
}