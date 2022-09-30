const { Router } = require('express');
const { Op } = require("sequelize")
const axios = require("axios");
const { User, Cart, Category, Color, Image, Order, Product, Favorite, Review, conn, ProductCategory} = require('../db'); 
const router = Router();
module.exports = router;


router.get("/", async (req, res) => {
    const { userName } = req.body;
    if (!userName) return res.send("Missing Username")
    try {
        const favorites = await Product.findAll({include: User, where: {userName: userName}})
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