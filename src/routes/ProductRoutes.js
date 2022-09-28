const { Router } = require('express');
const { Product } = require('../db');
const { Op } = require("sequelize")
const axios = require("axios");
const { User, Cart, Categories, Color, Image, Orders, Products, Reviews, conn} = require('../db') 


const router = Router();



router.post("/create", async (req, res) => {
    const { name, model, brand, description, thumbnail, price } = req.body;
    // console.log(req.body);
    try{
        const newProduct = await Product.create({
            name,
            model,
            brand,
            description,
            thumbnail,
            price     
    })  

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
    try{ 
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
    try{
        const product = await Product.findByPk(id);
        product.update({hidden: true});
        await product.save();
        res.send("Product hidden");
    } catch (err) {
        res.status(500).send({error: err.message})
    }
});



// Crear ruta para crear/agregar Producto listo
//     Crear ruta para Modificar Producto
//     Crear ruta para ocultar producto listo
//     Crear ruta que devuelva todos los productos
//     Crear Ruta que devuelva los productos de X categoria
//     Crear ruta de producto individual, pasado un ID que retorne un producto con sus detalles


module.exports = router;