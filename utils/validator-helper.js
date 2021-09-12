const { body, validationResult } = require("express-validator");

// validator 參數錯誤結果
let validateResult = (req, res, next)=>{
    let errors = validationResult(req); 
    if (!errors.isEmpty()) return res.status(422).json({ message: errors.array() , code : "9998" });
    next();
};

// 參數檢查 單筆product資料 
let productInfoValid = [
    body("merSerNo").exists().withMessage("merSerNo is required"),
    body("prodTypeSerNo").exists().withMessage("prodTypeSerNo is required"),
    body("prodName").trim().notEmpty().withMessage("prodName is required"),
    body("prodType").exists().withMessage("prodType is required"),
    body("prodPrice").exists().withMessage("prodPrice is required"),
];

module.exports = {
    validateResult,
    productInfoValid,
};