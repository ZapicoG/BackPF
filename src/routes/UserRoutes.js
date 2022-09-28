const { Router } = require('express');
const { User } = require('../db');
const { Op } = require("sequelize")
const router = Router();
const axios = require("axios");

router.post('/create', async (req,res)=>{
    const { role, userName, email, password, defaultShippingAddress, billingAddress } = req.body;
    console.log(req.body);
    try{
        const newUser = await User.create({
            role,
            userName,
            email,
            password,
        defaultShippingAddress,
        billingAddress,        
    })  

    res.send(newUser);
} catch(err){
    console.log(err);
    res.status(500).send('User cannot be created')
}
})

router.get('/', async (req,res)=>{
    try{
        const users = await User.findAll()
        return res.send(users);
    } catch(err){
        res.status(500).send({error: err.message});
    }
})

router.put('/modify', async(req,res)=>{
    const { role, userName, email, password, defaultShippingAddress, billingAddress, banned } = req.body;
    try{ 
        User.update(
            { role, userName, email, password, defaultShippingAddress, billingAddress, banned },
            {
                where: {userName: userName}
            }
        )
        return res.send('User Updated');
    } catch(err){
        return res.status(400).send({error: err.message});
    }
})

router.put('/delete/:username', async(req,res)=>{
    const userName  = req.params.id;
    try{ 
        User.update(
            { banned:true },
            {
                where: {userName: userName}
            }
        )
        return res.send('User Banned');
    } catch(err){
        return res.status(400).send({error: err.message});
    }
})

module.exports = router;