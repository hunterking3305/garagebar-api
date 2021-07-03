const express = require('express');
const moment = require('moment');
const router = express.Router();
const { Op } = require("sequelize");
const { validationResult } = require('express-validator');

const CocktailList = require('../models/products').CocktailList;

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
    // [
    //     query("idNum").exists().withMessage('idNum is required').isIdentityCard("zh-TW").withMessage("idNum's format is wrong"),
    //     body("passwd").exists().withMessage('passwd is required')
    // ],
    async (req, res, next) => {

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

router.put("/cocktail/info", async (req, res, next) => {

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