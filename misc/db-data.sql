-- 商家資料範例
INSERT INTO merchants
(merName, merAddr, merGUIN, merPhone, merOwnerName, merOwnerCellphone, updatedAt)
VALUES
("Garage Bar", "台東市中正路海濱公園", null, null, "Leoking", "0988069782", DATE_ADD(NOW(), INTERVAL 8 HOUR));

-- 商品類型資料範例
INSERT INTO products_type_index
(merSerNo, prodTypeName, updatedAt)
VALUES
(1, "威士忌系列", DATE_ADD(NOW(), INTERVAL 8 HOUR));

-- 商品資料範例
INSERT INTO products
(merSerNo, prodTypeSerNo, prodName, prodType, prodPrice, prodDetail, updatedAt)
VALUES
(1, 1, "Wiskey Sour", 1, 100, "威士忌+檸檬+糖水+苦精", DATE_ADD(NOW(), INTERVAL 8 HOUR));
