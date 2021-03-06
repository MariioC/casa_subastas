import PujaModel from "../models/puja.model";

export const PujasController = {
    async getAllPujasByUsuario( documento_pujador ) {
        return await PujaModel.find({ documento_pujador }).sort({ valor : -1 })
    },

    async getPujasBySubasta(id_subasta) {
        return await PujaModel.find({ id_subasta }).sort({ valor : -1 })
    },

    async getPujaById(id_puja) {
        return await PujaModel.findById(id_puja)
    },

    async getPujaSubastaByValor(id_subasta, valor) {
        return await PujaModel.findOne({ id_subasta, valor })
    },

    async getMaxPujaBySubasta(id_subasta) {
        // return await PujaModel.find({ id_subasta, valor })
        return await PujaModel.findOne({ id_subasta }).sort({ valor : -1 }).limit(1)
    },

    async createPuja({ valor, fecha_puja, nombre_pujador, documento_pujador, id_subasta }) {
        const puja = new PujaModel({
            valor,
            fecha_puja,
            nombre_pujador,
            documento_pujador,
            id_subasta
        })

        return await puja.save()
    },

    async deletePujaById(id_puja) {
        // return await PujaModel.find({ id_subasta, valor })
        await PujaModel.findByIdAndRemove(id_puja)
        return true
    },

    async deleteAllPujaBySubasta( id_subasta ) {
        // return await PujaModel.find({ id_subasta, valor })
        await PujaModel.deleteMany({ id_subasta })
    },
};
