console.log("--- execute products.js ---");
const express = require('express');
const router = express.Router();

const Product = require('../../models/products').Product;

// (async () => {
//   // 新增 SQL
//   // const test01 = await Product.create({ prodChineseName: "獅子王" });
//   // console.log("test01's auto-generated ID:", test01);
// })();

router.get('/product-list', async(req, res, next) => {
  try {
    // 查詢 SQL
    const products = await Product.findAll();
    // console.log("All products:", JSON.stringify(products, null, 2));

    res.json(products);

  } catch(error){
    
    return next(error)
  }
  
  
  
});

module.exports = router;