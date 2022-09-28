const { Router } = require('express');
// Importar todos los routers;
// // Ejemplo: const authRouter = require('./auth.js');
const userMiddleware = require("./User.js");
const productMiddleware = require("./Product.js")
const categoriesMiddleware = require("./Categories")


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/products', productMiddleware);
router.use('/users', userMiddleware);
router.use('/categories', categoriesMiddleware);


module.exports = router;
