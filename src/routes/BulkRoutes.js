const { Router } = require('express');
const { Op } = require("sequelize")
const axios = require("axios");
const { User, Cart, Category, Color, Image, Order, Product, Review, conn, ProductCategory} = require('../db'); 
const router = Router();
module.exports = router;



router.post("/user", async (req, res) => {
    const { users } = req.body;

    try {
        await User.bulkCreate(users)
        res.send("Users created")
    } catch (err) {
        res.status(500).send({error: err.message})
    }
})