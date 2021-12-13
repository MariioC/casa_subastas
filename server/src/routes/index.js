import { Router } from 'express'
import { usuariosRoutes } from './usuarios.routes'
import { subastasRoutes } from './subastas.routes'
import { pujasRoutes } from './pujas.routes'
import { imgRoutes } from './images.routes'
import { notificacionesRoutes } from './notificaciones.routes'

export const apiRoutes = Router()

apiRoutes.use('/usuarios', usuariosRoutes)
apiRoutes.use('/notificaciones', notificacionesRoutes)
apiRoutes.use('/subastas', subastasRoutes)
apiRoutes.use('/pujas', pujasRoutes)

apiRoutes.use('/img', imgRoutes)