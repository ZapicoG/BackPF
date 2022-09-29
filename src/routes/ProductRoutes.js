const { Router } = require('express');
const { Op } = require("sequelize")
const axios = require("axios");
<<<<<<< HEAD
const { User, Cart, Category, Color, Image, Orders, Product, Reviews, conn, ProductCategory} = require('../db'); 
const { getApiProducts } = require("../controllers/controllersApi.js")
=======
const { User, Cart, Category, Color, Image, Order, Product, Review, conn, ProductCategory} = require('../db'); 
>>>>>>> 54479e70a7f132a0f2d546753956d812ca396659


const router = Router();




router.get("/", async (req, res) => {
    try {
        const json = await getApiProducts();
        return res.status(200).json(json);
    } catch (err) {
        res.status(500).send({error: err.message})
    }
});

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
    if (categories) {
        // console.log(1, newProduct, categories)
        for (let category of categories) {
            // console.log(2, newProduct, category)
            let addCategory = await Category.findOrCreate({where: {name: category}})
            // console.log(3, addCategory[0])
            if (addCategory !== true) await newProduct.addCategory(addCategory[0])
            // console.log(4, newProduct)
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
    const { id, name, model, brand, description, thumbnail, price } = req.body;
    // console.log(req.body)
    try { 
        Product.update(
            { name, model, brand, description, thumbnail, price },
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
        const products = await Product.findAll({include: Category});
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
            },
            through: { attributes: []}
        }});
        res.send(products);
    } catch (err) {
        res.status(500).send({error: err.message})
    }
});

router.get("/ID/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findByPk(id, {include: {model: Category, through: { attributes: []}}})
        res.send(product)
    } catch (err) {
        res.status(500).send({error: err.message})
    }
});


router.delete("/deleteCategory", async (req, res) => {
    const { id, categoryName } = req.body;
    try {
        const product = await Product.findByPk(id);
        const category = await Category.findByPk(categoryName);
        await product.removeCategory(category);
        res.send("Category removed from product")
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