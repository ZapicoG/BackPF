const { Router } = require('express');
const { Op } = require("sequelize")
const axios = require("axios");
const { User, Cart, Category, Color, Image, Order, Product, Favorite, Review, conn, ProductCategory} = require('../db'); 
const router = Router();
module.exports = router;


router.get("/", async (req, res) => {
    const { userName } = req.body;
    try {
        const favorites = await Product.findAll({
            through: {
                model: Favorite
            },
            where: {
                userName: userName
            },
            include: {
                model: User,
                through: { attributes: [] }
            }
        })
        res.send(favorites)
    } catch (err) {
        res.status(500).send({error: err.message})
    }
})

router.post("/add", async (req, res) => {
    const { userName, productId } = req.body;
    try {

    } catch (err) {
        res.status(500).send({error: err.message})
    }
})

router.delete("/delete", async (req, res) => {
    const { userName, productId } = req.body;
    try {

    } catch (err) {
        res.status(500).send({error: err.message})
    }
})