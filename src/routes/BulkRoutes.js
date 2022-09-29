const { Router } = require('express');
const { Op } = require("sequelize")
const axios = require("axios");
const { User, Cart, Category, Color, Image, Order, Product, Review, conn, ProductCategory} = require('../db'); 
const router = Router();
module.exports = router;



router.post("/user", async (req, res) => {
    const { users } = req.body;

    try {
        // console.log(users)
        await User.bulkCreate(users)
        res.send("Users created")
    } catch (err) {
        res.status(500).send({error: err.message})
    }
});


router.post("/products", async (req, res) => {
    const { products } = req.body;

    try {
        // console.log(users)
        await User.bulkCreate(products)
        res.send("Products created")
    } catch (err) {
        res.status(500).send({error: err.message})
    }
});


router.post("/categories", async (req, res) => {
    const { categories } = req.body;

    try {
        console.log(categories)
        await User.bulkCreate(categories)
        res.send("Categories created")
    } catch (err) {
        res.status(500).send({error: err.message})
    }
});