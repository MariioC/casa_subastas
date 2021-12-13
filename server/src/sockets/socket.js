import SocketIO from 'socket.io';
import { identifyUserWithToken } from '../helpers/authHelper';

class Socket {
    constructor(server) {
        this.io = SocketIO(server, {
            cors: {
                origin: '*',
                credentials: true,
            },
            // allowEIO3: true,
        });
    }

    middlewareSocket(socket, next) {
        const token = socket.handshake.auth.token;

        if (!token)
            return next(new Error('Invalid token'));

        const usuario = identifyUserWithToken(token);
        
        if (!usuario) 
            return next(new Error('Invalid token'));

        socket._id = usuario.id;
        socket.documento = usuario.documento;
        socket.nombre = usuario.nombre;
        socket.genero = usuario.genero;
        
        next();
    }
    
    start() {
        this.io.use((socket, next) => this.middlewareSocket(socket, next));
        this.io.of('/subasta').use((socket, next) => this.middlewareSocket(socket, next))

        this.io.on('connection', (socket) => {
            // Cuando se conecta un cliente
            console.log(`${socket.nombre} se ha CONECTADO al servidor`);
            
            socket.join(socket.documento);

            socket.on('usuario:notificacion', ( { notificacion } ) => {
                const { documento_usuario } = notificacion
                this.io.to(documento_usuario).emit('usuario:notificacion', { notificacion })
            });

            socket.on('disconnect', async () => {

                socket.leave(socket.documento);

                const matchingSockets = await this.io.in(socket.documento).allSockets();

                const isDisconnected = matchingSockets.size === 0;
                if (isDisconnected) {
                    console.log(`${socket.nombre} se ha DESCONECTADO del servidor`);
                }
            });
        });

        this.io.of("/subasta").on("connection", (socket) => {

            const { id_subasta }  = socket.handshake.query

            console.log(`${socket.nombre} se ha UNIDO a la subasta: ${id_subasta}`);

            // Antes de notificar que un usuario a ingresado a la substa, compruebo que ese usuario no este conectado a la subasta desde otra pestaña u otro navegdor
            const clientesSubasta = this.io.of("/subasta").adapter.rooms.get(id_subasta);

            let usuario_conectado = false;

            if(clientesSubasta) {
                for (const clientId of clientesSubasta ) {
                    const clientSocket = this.io.of('/subasta').sockets.get(clientId);
                    if( clientSocket._id === socket._id) {
                        usuario_conectado = true;
                    }
                }
            }

            // Si no esta conectado, emito el evento para notificar que se ha conectdo un usuario
            if(!usuario_conectado) {
                socket.broadcast.to(id_subasta).emit('subasta:new-usuario', {
                    usuario: {
                        _id: socket._id,
                        nombre: socket.nombre,
                        documento: socket.documento,
                        genero: socket.genero
                    },
                });
            }

            // Conecto al usuario a la sala de la subasta
            socket.join(id_subasta);

            
            // Ahora al usuario que acaba de conectarse le devuelvo un arreglo de todos los participantes que estan actualmente conectado a la subasta
            // Consulto los usuarios conectados a la subasta
            const clients = this.io.of('/subasta').adapter.rooms.get(id_subasta);
            const participantes = [];

            if(clients) {
                for (const clientId of clients ) {
                    const clientSocket = this.io.of('/subasta').sockets.get(clientId);
                    const usuario = {
                        _id: clientSocket._id,
                        documento: clientSocket.documento,
                        nombre: clientSocket.nombre,
                        genero: clientSocket.genero
                    }
    
                    const existente = participantes.filter( p => p._id === usuario._id)
                    if (!existente.length) {
                        participantes.push(usuario)
                    }
                }
    
            }
            
            socket.emit('subasta:usuarios', {
                usuarios: participantes
            });

            socket.on('subasta:new-puja', ({ puja }) => {

                this.io.of('/subasta').to(puja.id_subasta).emit('subasta:new-puja', { puja });

            });

            socket.on('subasta:cancel-puja', ({ id_puja }) => {

                this.io.of('/subasta').to(id_subasta).emit('subasta:cancel-puja', { id_puja });

            });

            socket.on('disconnect', () => {
                socket.leave(id_subasta);

                // Antes de notificar que un usuario abandonó la subasta, compruebo que ese usuario no este conectado a la subasta desde otra pestaña u otro navegdor
                const clientesSubasta = this.io.of('/subasta').adapter.rooms.get(id_subasta);
                let usuario_conectado = false;

                if(clientesSubasta) {
                    for (const clientId of clientesSubasta ) {
                        const clientSocket = this.io.of('/subasta').sockets.get(clientId);
                        if( clientSocket._id === socket._id) {
                            usuario_conectado = true;
                        }
                    }
                }

                // Si no esta conectado, emito el evento para notificar que se ha conectdo un usuario
                if(!usuario_conectado) {

                    console.log(`${socket.nombre} ha ABANDONADO la subasta`);

                    socket.broadcast.to(id_subasta).emit('subasta:leave-usuario', {
                        usuario: {
                            _id: socket._id,
                            nombre: socket.nombre,
                            documento: socket.documento,
                            genero: socket.genero
                        },
                    });
                }
            })
        });
    }
}

module.exports = Socket;
