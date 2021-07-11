const { body, validationResult } = require("express-validator");

// validator 參數錯誤結果
let validateResult = (req, res, next)=>{
    let errors = validationResult(req); 
    if (!errors.isEmpty()) return res.status(422).json({ message: errors.array() , code : "9998" });
    next();
};

// 新增產品 req.body 參數檢查
let newProdBodyValid = [
    body("cockliChaName").trim().notEmpty().withMessage("cockliChaName is required"),
    body("cockliEngName").trim().notEmpty().withMessage("cockliEngName is required"),
    body("cockliClass").exists().withMessage("cockliClass is required"),
    body("cockliBase").exists().withMessage("cockliBase is required"),
];

module.exports = {
    validateResult,
    newProdBodyValid,
};