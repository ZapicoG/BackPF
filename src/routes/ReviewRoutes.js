const { Router } = require('express');
const { Op } = require("sequelize")
const axios = require("axios");
const { User, Cart, Category, Color, Image, Order, Product, Review, conn, ProductCategory} = require('../db'); 
const router = Router();
module.exports = router;



router.post("/add", async (req, res) => {
    const { productId, userName, description, stars } = req.body;
    try {
        // console.log(1, req.body)
        const user = await User.findByPk(userName);
        const product = await Product.findByPk(productId);
        // console.log(2, user, product)
        await user.addProduct(product, { through: { description: description, stars: stars } })
        // console.log(3)
        res.send("Review added")
    } catch (err) {
        res.status(500).send({error: err.message})
    }
})







// Crear ruta para crear/agregar Review
// Crear Ruta para obtener todas las reviews de un producto.
// Crear ruta para Modificar Review
// Crear Ruta para eliminar Review