const { Router } = require('express');
const { Op } = require("sequelize")
const axios = require("axios");
const { User, Cart, Category, Color, Image, Orders, Product, Reviews, conn} = require('../db'); 


const router = Router();



router.post("/create", async (req, res) => {
    const { name, model, brand, description, thumbnail, price, categories } = req.body;
    // console.log(req.body);
    try {
        const newProduct = await Product.create({
            name,
            model,
            brand,
            description,
            thumbnail,
            price     
    }) 
    if (categories.length) {
        for (let category of categories) {
            let addCategory = Category.findOne({where: {name: category}})
            await newProduct.addCategory(addCategory)
        }
    } 
    res.send(newProduct);
} catch (err) {
    // console.log(err);   
    res.status(500).send({error: err.message})
}
});


// Cualquier llamada a esta ruta no puede tener un valor como null
// Puede tener valores que no se manden pero nunca que mandes {key: null}
router.put("/modify", async (req, res) => {
    // console.log(req.body)
    const { id, name, model, brand, description, thumbnail, price } = req.body;
    console.log(req.body)
    try { 
        Product.update(
            { name: name && name, model, brand, description, thumbnail, price },
            {
                where: {id: id}
            }
        )
        return res.send("Producto modificado");
    } catch(err){
        return res.status(400).send({error: err.message});
    }
});


router.put("/hide", async (req, res) => {
    // console.log(req.body)
    const { id } = req.body;
    try {
        const product = await Product.findByPk(id);
        product.update({hidden: true});
        await product.save();
        res.send("Product hidden");
    } catch (err) {
        res.status(500).send({error: err.message})
    }
});


router.get("/all", async (req, res) => {
    try {
        const products = await Product.findAll();
        res.send(products)
    } catch (err) {
        res.status(500).send({error: err.message})
    }
});

router.get("/byCategory/:category", async (req, res) => {
    const { category } = req.params;
    try {
        const products = await Product.findAll({include: {
            model: Category,
            required: true,
            where: {
                name: category
            }
        }});
        res.send(products);
    } catch (err) {
        res.status(500).send({error: err.message})
    }
});

router.get("/ID/:ID", async (req, res) => {
    const { ID } = req.params;
    try {
        const product = await Product.findByPk(ID, {include: {model: Category}})
        res.send(product)
    } catch (err) {
        res.status(500).send({error: err.message})
    }
})



// Crear ruta para crear/agregar Producto listo
//     Crear ruta para Modificar Producto listo
//     Crear ruta para ocultar producto listo
//     Crear ruta que devuelva todos los productos listo
//     Crear Ruta que devuelva los productos de X categoria listo
//     Crear ruta de producto individual, pasado un ID que retorne un producto con sus detalles listo


module.exports = router;