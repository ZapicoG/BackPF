const { Router } = require('express');
const { Op } = require("sequelize")
const axios = require("axios");
const { User, Cart, Category, Color, Image, Order, Product, Favorite, Review, conn, ProductCategory} = require('../db'); 
const router = Router();
module.exports = router;


router.get("/", async (req, res) => {
    const { userNameFavorite } = req.body;
    if (!userNameFavorite) return res.send("Missing Username")
    try {
        const favorites = await Favorite.findAll({where: {userNameFavorite}, include: Product})
        res.send(favorites)
    } catch (err) {
        res.status(500).send({error: err.message})
    }
})

router.post("/add", async (req, res) => {
    const { userNameFavorite, productIdFavorite } = req.body;
    try {
        const favorite = await Favorite.create({userNameFavorite, productIdFavorite});
        res.send(favorite)
    } catch (err) {
        res.status(500).send({error: err.message})
    }
})

router.delete("/delete", async (req, res) => {
    const { userNameFavorite, productIdFavorite } = req.body;
    try {
        const favorite = await Favorite.findOne({userNameFavorite, productIdFavorite});
        favorite.destroy()
        res.send("Eliminated")
    } catch (err) {
        res.status(500).send({error: err.message})
    }
})