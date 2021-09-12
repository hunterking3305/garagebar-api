const express = require('express');
const router = express.Router();

const { Op } = require('sequelize');
const Products = require('../../models/schema/products.js').Products;

const validatorHelper = require('../../utils/validator-helper.js');

// [API] - 取得 所有products資料
router.get("/list", async(req, res, next) => {
    
    // SQL-Where Condition Object Format
    let whereCondition = {
        where : {}
    };

    Object.keys(req.query).map((key) => {
        // 模糊搜尋：商品名稱
        if(key==="prodName"){
            whereCondition.where[key] = {
                [Op.substring] : req.query[key]
            }
        }
        // 精準搜尋：其餘欄位
        else{
            whereCondition.where[key] = {
                [Op.eq] : req.query[key]
            }
        }
    });

    try{
        console.log(whereCondition);
        // Query SQL DB
        let products = await Products.findAll(whereCondition);
        res.status(200).json(products);
    }catch(error){
        res.status(500).json({ message: "Server Internal Fault.", code: "9999" });
        next(error);
    }
});

// [API] - 新增 單筆product資料
router.post("/add", 
    validatorHelper.productInfoValid,
    validatorHelper.validateResult,
    async(req, res, next) => {
        try {
            // Insert SQL
            let payload = req.body;
            let rs = await Products.create(payload);

            res.status(200).json({
                message : "ok.",
                result : rs, // 屬性 rs._options 可取得 DB operation info
            });
            
        }catch(error){
            res.status(500).json({ message: "Server Internal Fault.", code: "9999" });
            next(error);
        };
});

// [API] - 更新 單筆product資料  

// comming soon...


// router.post("/cocktail/info",
//     validatorHelper.newProdBodyValid,
//     validatorHelper.validateResult,
//     async (req, res, next)=>{
//         try {
//             // Insert SQL
//             let payload = req.body;
//             let rs = await CocktailList.create(payload);

//             res.status(200).json({
//                 message : "ok.",
//                 result : rs, // 屬性 rs._options 可取得 DB operation info
//             });

//         }catch(error){
//             res.status(500).json({ message: "Server Internal Fault.", code: "9999" });
//             next(error);
//         }
// });

// router.put("/cocktail/info", async (req, res, next)=>{

//     try{
//         let updateColumns = req.body;
//         let updateItem = req.query;

//         // Update SQL
//         await CocktailList.update(updateColumns, {
//             where : updateItem,
//         });

//         res.status(200).json({
//             message : "OK.",
//         });

//     } catch(error){
//         res.status(500).json({ message: "Server Internal Fault.", code: "9999" });
//         next(error);
//     }
// });

module.exports = router;