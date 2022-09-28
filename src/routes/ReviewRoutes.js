const { Router } = require('express');
const { Op } = require("sequelize")
const axios = require("axios");
const { User, Cart, Category, Color, Image, Order, Product, Review, conn, ProductCategory} = require('../db'); 
const router = Router();
module.exports = router;



router.post("/add", async (req, res) => {
    const { productId, userUserName, description, stars } = req.body;
    try {
        console.log(1, req.body)
        // const review = await Review.create({productId: productId, userUserName: userUserName, description: description, stars: stars});
        const user = await User.findByPk(userUserName);
        const product = await Product.findByPk(productId);
        console.log(2)
        await user.addProduct(product, { through: {description: description, stars: stars}})
        console.log(3)
        res.send("Review added")
    } catch (err) {
        res.send(500).send({error: err.message})
    }
})







// Crear ruta para crear/agregar Review
// Crear Ruta para obtener todas las reviews de un producto.
// Crear ruta para Modificar Review
// Crear Ruta para eliminar Review