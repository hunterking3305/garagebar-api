-- 酒單資料範例
INSERT INTO cocktail_list
(cockliChaName, cockliEngName, cockliClass, cockliBase, updatedAt, createdAt)
VALUES
("威士忌酸", "Wiskey Sour", 1, 1, DATE_ADD(NOW(), INTERVAL 8 HOUR), DATE_ADD(NOW(), INTERVAL 8 HOUR));