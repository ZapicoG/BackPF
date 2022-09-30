const axios = require('axios')
const { User, Cart, Categories, Color, Image, Orders, Products, Reviews, conn} = require('../db') 

const findByEmail = async(email) =>{
    try{
        const users = await User.findOne({
            where: {
                email : email
            }
    })
        return (users);
    } catch(err){
        return ({error: err.message});
    }
}
module.exports = findByEmail