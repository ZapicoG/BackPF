const axios = require("axios");
const { Router } = require('express');
const { User, Cart, Categories, Color, Image, Orders, Products, Reviews, conn} = require('../db') 
const router = Router();

//GET API PRODUCTS

const getApiProducts = async () => {
    try {
        const apiCel = await axios.get(
            "https://api.mercadolibre.com/sites/MLA/search?category=MLA1055"
        );
        const apiComp = await axios.get(
            "https://api.mercadolibre.com/sites/MLA/search?category=MLA1648"
        );
        const productsApi = apiCel.concat(apiComp);
        return productsApi;
        
    } catch (error) {
        console.error(error);
    }
};


module.exports = {
    getApiProducts
}