const { Router } = require('express');
const { Op } = require("sequelize")
const axios = require("axios");
const { User, Cart, Category, Color, Image, Order, Product, Review, conn, ProductCategory} = require('../db'); 
const router = Router();
module.exports = router;



// Ruta:./bulk/users
// Nombre:
// Input
// Descricion:
// Output:


router.post("/users", async (req, res) => {
    const { users } = req.body;

    try {
        // console.log(users)
        await User.bulkCreate(users)
        res.send("Users created")
    } catch (err) {
        res.status(500).send({error: err.message})
    }
});




// Ruta:./bulk/products
// Nombre:
// Input
// Descricion:
// Output:

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



// Ruta:./bulk/categories
// Nombre:
// Input
// Descricion:
// Output:


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


// Ruta:./bulk/reviews
// Nombre:
// Input
// Descricion:
// Output:


router.post("/reviews", async (req, res) => {
    const { reviews } = req.body;
    try {
        // console.log(1, req.body)
        for (let review of reviews) {
            let { productId, userName, description, stars } = review
            const user = await User.findByPk(userName);
            const product = await Product.findByPk(productId);
            // console.log(2, user, product)
            await user.addProduct(product, { through: { description: description, stars: stars } })
            // console.log(3)
        }
        res.send("Reviews added")
    } catch (err) {
        res.status(500).send({error: err.message})
    }
});