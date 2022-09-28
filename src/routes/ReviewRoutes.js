const { Router } = require('express');
const { Op } = require("sequelize")
const axios = require("axios");
const { User, Cart, Category, Color, Image, Order, Product, Review, conn, ProductCategory} = require('../db'); 
const router = Router();



router.post("/add", async (req, res) => {
    const { id, userName, description, stars } = req.body;
    try {
        const review = await Review.create({productId: id, userUserName: userName, description: description, stars: stars});
        res.send(review)
    } catch (err) {
        res.send(500).send({error: err.message})
    }
})







// Crear ruta para crear/agregar Review
// Crear Ruta para obtener todas las reviews de un producto.
// Crear ruta para Modificar Review
// Crear Ruta para eliminar Review