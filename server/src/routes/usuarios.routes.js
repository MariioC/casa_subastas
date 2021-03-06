import { Router } from "express";
import jwt from "jsonwebtoken";

import { hashPassword, verifyPassword } from "../helpers/authHelper";

import { UsuariosController } from "../controllers/usuarios.controllers";

import { validatorLogin, validatorUsuario } from "../middleware/validators/validatorUsuario";
import { identifyUserToken, verifyUserToken } from "../middleware/auth";

export const usuariosRoutes = Router();

usuariosRoutes.post("/registro", validatorUsuario, async (req, res) => {
    const { nombre, correo, tipo_documento, documento, fecha_nacimiento, expedicion_documento, genero, password: pass = "" } = req.body;
    
    try {
        if (await UsuariosController.getUsuarioByDocumento(documento)) {
            return res.json({
                error: "El número de documento ya se encuentra registrado en la plataforma",
            });
        }

        if (await UsuariosController.getUsuarioByCorreo(correo)) {
            return res.json({
                error: "El correo ingresado ya se encuentra registrado en la plataforma",
            });
        }
        
        const password = await hashPassword(pass);

        let tipo_usuario = "externo";

        const result = await UsuariosController.createUsuario({ nombre, correo, tipo_documento, documento, fecha_nacimiento, expedicion_documento, genero, password, tipo_usuario });

        const usuario = result.toJSON();
        delete usuario.password;

        const token = jwt.sign({ id: usuario._id, nombre: usuario.nombre, documento: usuario.documento, tipo_usuario: usuario.tipo_usuario, genero: usuario.genero }, process.env.SECRET_KEY);
        

        res.json({
            message: "Usuario registrado de manera correcta",
            usuario,
            token,
        });
    } catch (error) {
        console.log(error);
        res.json({
            error: "Ha ocurrido un error inesperado en el registro",
        });
    }
});

usuariosRoutes.post("/login", validatorLogin, async (req, res) => {
    const { documento, password } = req.body;
    
    try {
        const result = await UsuariosController.getUsuarioByDocumento(documento);

        if (!result) {
            return res.json({
                error: "El usuario no se encuentra registrado en la plataforma",
            });
        }

        const usuario = result.toJSON();

        if (!(await verifyPassword(password, usuario.password))) {
            return res.json({
                error: "Contraseña incorrecta",
            });
        }
        
        delete usuario.password;

        const token = jwt.sign({ id: usuario._id, nombre: usuario.nombre, documento: usuario.documento, tipo_usuario: usuario.tipo_usuario, genero: usuario.genero }, process.env.SECRET_KEY);

        res.json({
            usuario,
            token,
        });
    } catch (error) {
        console.log(error);
        res.json({
            error: "Ha ocurrido un error inesperado al iniciar sesión",
        });
    }
});

usuariosRoutes.post("/is_logged", verifyUserToken, async (req, res) => {
    const { documento } = req.body.data_token;

    try {
        const result = await UsuariosController.getUsuarioByDocumento(documento);

        if (!result) {
            return res.json({
                error: "El usuario no se encuentra registrado en la plataforma",
            });
        }

        const usuario = result.toJSON()        
        delete usuario.password;

        res.json({
            usuario,
            logged: true
        });
    } catch (error) {
        console.log(error);
        res.json({
            error: "Ha ocurrido un error al comprobar su sesión",
        });
    }
});

usuariosRoutes.get("/", async (req, res) => {
    res.json({
        message: "Hola desde el ENDPOINT usuarios",
    });
});

usuariosRoutes.get("/:documento", async (req, res) => {
    const { documento } = req.params;
    try {
        const usuario = await UsuariosController.getUsuarioByDocumento(documento);
    
        res.json({
            message: "Se muestra la información del usuario deseado",
            usuario,
        });
    } catch (error) {
        console.log(error);
        res.json({
            error: "Ha ocurrido un error al obtener la información del usuario",
        });
    }
});
