console.log("--- execute products.js ---");
const express = require('express');
const moment = require('moment');
const router = express.Router();
const { Op } = require("sequelize");

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

router.put("/info", async (req, res, next) => {
    
    let updateIndex = {};  // 設定須更新的資料
    let payloadDate = {};  // 新增/更新 的資料欄位

    // ETL Insert & Update Common Payload Data
    Object.keys(req.body).map((key)=>{
        if(key==="cockliSerNo"){
            updateIndex["cockliSerNo"] = req.body[key];
            return;
        }
        payloadDate[key] = req.body[key];
    });

    let dbResponse;  // DB 回應資訊

    try {
        if(req.query.mode==="insert"){
            // Insert SQL
            let db_res = await CocktailList.create(payloadDate);

            dbResponse = `NewRecord is ${db_res._options.isNewRecord}`;
        }
        else{
            // ETL Update Specific Payload Data
            payloadDate.cockliUpdateTime = moment().format("YYYY-MM-DD hh:mm:ss");

            // Update SQL
            dbResponse = await CocktailList.update(payloadDate, {
                where : updateIndex,
            });
        }

        res.status(200).json({
            result : "OK.",
            message : dbResponse,
        });
        
    }catch(error){
        next(error)
    }

});

module.exports = router;