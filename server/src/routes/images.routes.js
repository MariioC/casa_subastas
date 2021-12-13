import { Router } from 'express'
import path from 'path'
import fs from 'fs'

export const imgRoutes = Router()

imgRoutes.get('/', (req, res) => {
    const archivo = path.resolve(__dirname, `../public/img/notFound.png`)
    res.sendStatus(archivo)
})

const archivoExiste = (archivo) => {
    try {
        if (fs.existsSync(archivo)) {
            return true
        } else {
            return false
        }
    } catch (e) {
        return false
    }
}

imgRoutes.get('/:img', (req, res) => {
    const { img } = req.params
    
    const archivo = path.resolve(__dirname, `../public/img/${img}`)

    if (archivoExiste(archivo)) {
        return res.sendFile(archivo)
    } else {
        const archivo = path.resolve(__dirname, `../public/img/notFound.png`)
        return res.sendFile(archivo)
    }
})
