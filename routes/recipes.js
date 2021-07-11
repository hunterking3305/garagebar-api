const express = require('express');
const router = express.Router();

const { Op } = require('sequelize');
const CocktailRecipe = require('../models/schema/cocktailRecipe').CocktailRecipe;

const { check, validationResult } = require('express-validator');

// 新增 配方食譜
router.post('/cocktail/info',
    [
        check('cockliSerNo')
            .exists()
            .withMessage('cockliSerNo is required'),

        check('recMaterial')
            .trim()
            .isLength({ max: 200})
            .withMessage('recMaterial length must less than 200'),

        check('recDecoration')
            .trim()
            .isLength({ max: 200})
            .withMessage('recDecoration length must less than 200'),

        check('recMethod')
            .exists()
            .withMessage('recMethod is required'),

        check('recCup')
            .exists()
            .withMessage('recCup is required'),

        check('recSteps')
            .trim()
            .isLength({ max: 600})
            .withMessage('recSteps length must less than 600'),

        check('recABV')
            .exists()
            .withMessage('recABV is required'),
    ],
    async(req, res, next)=>{

        // 將回傳的 Result 物件存在 errors 變數中
        const errors = validationResult(req);

        if (!errors.isEmpty()){
            return res.status(422).json({
                errorMessages: errors.array(),
                code : "9998",
            })
        }

        try{
            // Insert SQL
            let payload = req.body;
            let rs = await CocktailRecipe.create(payload);

            res.status(200).json({
                message: 'OK',
                result: rs,  // 屬性 rs._options 可取得 DB operation info
            });
        }catch(error){
            res.status(500).json({ message: "Server Internal Fault.", code: "9999" });
            next(error);
        }
});


module.exports = router;