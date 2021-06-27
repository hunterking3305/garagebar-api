console.log("--- execute products.js ---");
const express = require('express');
const router = express.Router();
const { Op } = require("sequelize");

const CocktailList = require('../models/products').CocktailList;

router.post('/list', async(req, res, next) => {
    // To view Raw Where Condition
    // console.log(req.body);

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
        // 查詢 SQL
        const cocktails = await CocktailList.findAll(whereCondition);
        res.status(200).json(cocktails);
        
    }catch(error){
        return next(error)
    }
});

module.exports = router;