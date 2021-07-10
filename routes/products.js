const express = require('express');
const router = express.Router();
const { Op } = require('sequelize');

const CocktailList = require('../models/schema/cocktailList.js').CocktailList;
const validatorHelper = require('../utils/validator-helper.js');

router.post('/list', async(req, res, next) => {

    // Where Condition Object Format
    let whereCondition = {
        where : {}
    };

    // ETL Where Condition Format
    Object.keys(req.body).map((key) => {
        // 模糊搜尋：中英文調酒名
        if(key==="cockliChaName" || key==="cockliEngName"){
            whereCondition.where[key] = {
                [Op.substring] : req.body[key]
            }
        }
        // 精準搜尋：其餘欄位
        else{
            whereCondition.where[key] = {
                [Op.eq] : req.body[key]
            }
        }
    });
    
    try{
        // Query SQL
        const cocktails = await CocktailList.findAll(whereCondition);

        res.status(200).json(cocktails);
        
    }catch(error){
        return next(error)
    }
});

router.post("/cocktail/info",
    validatorHelper.newProdBodyValid,
    validatorHelper.validateResult,
    async (req, res, next)=>{
        try {
            // Insert SQL
            let payload = req.body;
            let rs = await CocktailList.create(payload);

            res.status(200).json({
                message : "ok.",
                result : rs,
            });

        }catch(error){
            next(error);
        }
});

router.put("/cocktail/info", async (req, res, next)=>{

    try{
        let updateColumns = req.body;
        let updateItem = req.query;

        // Update SQL
        await CocktailList.update(updateColumns, {
            where : updateItem,
        });

        res.status(200).json({
            message : "OK.",
        });

    } catch(error){
        next(error);
    }
});

module.exports = router;