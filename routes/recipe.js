const express = require('express');
const router = express.Router();

const { Op } = require('sequelize');
const CocktailRecipe = require('../models/schema/cocktailRecipe').CocktailRecipe;

router.post('/cocktail/info', async(req, res, next)=>{
    console.log(req.body);

    try{
        // Insert SQL
        let payload = req.body;
        let rs = await CocktailRecipe.create(payload);

        res.status(200).json({
            message: 'OK',
            result: rs,  // 屬性 rs._options 可取得 DB operation info
        });
    }catch(error){
        next(error);
    }
});


module.exports = router;