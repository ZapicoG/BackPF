const { Router } = require('express');
const UserRoutes = require ('./UserRoutes');
const ProductRoutes = require('./ProductRoutes');

const router = Router();
router.use('/user', UserRoutes.js)
router.use('/product', ProductRoutes.js)
/* 
    RUTAS USUARIOS
    Crear Ruta para creación de Usuario  
    Crear Ruta para traer usuarios
    Crear Ruta para modificar Usuario
    Crear Ruta para eliminar usuario
    Crear Ruta que retorne todas las Ordenes de los usuarios agregar relacion

    PRODUCTOS / CATEGORIAS

    Crear ruta para crear/agregar Categoria
    Crear ruta para mostrar todas las categorias
    Crear ruta para asociar categorias de un producto
    Crear ruta para sacar categorias de un producto
    Crear ruta para Modificar Categoria

    Crear ruta para crear/agregar Producto
    Crear ruta para Modificar Producto
    Crear ruta para ocultar producto
    Crear ruta que devuelva todos los productos
    Crear Ruta que devuelva los productos de X categoria
    Crear ruta de producto individual, pasado un ID que retorne un producto con sus detalles

    REVIEW
    Crear ruta para crear/agregar Review
    Crear Ruta para obtener todas las reviews de un producto.
    Crear ruta para Modificar Review
    Crear Ruta para eliminar Review

    Crear ruta que retorne todas las ordenes
    Crear Ruta que retorne una orden en particular
    Crear Ruta para modificar una Orden


    */



// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// router.use('/countries', countryMiddleware);
// router.use('/activities', activityMiddleware);


module.exports = router;
