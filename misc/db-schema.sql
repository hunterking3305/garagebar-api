DROP TABLE IF EXISTS `products`;
DROP TABLE IF EXISTS `products_type_index`;
DROP TABLE IF EXISTS `merchants`;

-- 商家資料
CREATE TABLE merchants (
    merSerNo          int(11)      UNSIGNED NOT NULL AUTO_INCREMENT             COMMENT "商家流水號", -- P.K
    merName           varchar(50)                                               COMMENT "商家名稱",
    merAddr           varchar(50)                                               COMMENT "營業地址",
    merGUIN           char(10)                                                  COMMENT "統一編號",
    merPhone          varchar(20)                                               COMMENT "營業電話",
    merOwnerName      varchar(20)                                               COMMENT "負責人姓名",
    merOwnerCellphone varchar(20)                                               COMMENT "負責人手機",
    updatedAt         datetime              NOT NULL                            COMMENT "更新時間",
    createdAt         datetime              NOT NULL DEFAULT CURRENT_TIMESTAMP  COMMENT "建立時間",
    PRIMARY KEY (merSerNo)
);

-- 商品類型資料
CREATE TABLE products_type_index (
    prodTypeSerNo   int(11)      UNSIGNED NOT NULL AUTO_INCREMENT            COMMENT "商品類型流水號", -- P.K
    merSerNo        int(11)      UNSIGNED NOT NULL                           COMMENT "商家流水號", -- F.K
    prodTypeName    varchar(30)                                              COMMENT "商品類型名稱",
    prodTypeStatus  int(3)                         DEFAULT 1                 COMMENT "使用狀態", -- 0:停用中 / 1:使用中
    updatedAt       datetime              NOT NULL                           COMMENT "更新時間",
    createdAt       datetime              NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT "建立時間",
    PRIMARY KEY (prodTypeSerNo),
    FOREIGN KEY (merSerNo)  REFERENCES  merchants (merSerNo)
);

-- 商品資料
CREATE TABLE products (
    prodSerNo     int(11)      UNSIGNED NOT NULL AUTO_INCREMENT            COMMENT "商品流水號", -- P.K
    merSerNo      int(11)      UNSIGNED                                    COMMENT "商家流水號", -- F.K
    prodTypeSerNo int(11)      UNSIGNED NOT NULL                           COMMENT "商品類型流水號", -- F.K
    prodName      varchar(50)                                              COMMENT "商品名稱",
    prodType      int(3)                                                   COMMENT "商品類別",
    prodPrice     int(3)                                                   COMMENT "商品價格",
    prodDetail    varchar(255)                                             COMMENT "商品詳細資料",
    prodStatus    int(3)                         DEFAULT 1                 COMMENT "商品供貨狀態", -- 0:停止 / 1:正常
    updatedAt     datetime              NOT NULL                           COMMENT "更新時間",
    createdAt     datetime              NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT "建立時間",
    PRIMARY KEY (prodSerNo),
    FOREIGN KEY (merSerNo)  REFERENCES  merchants (merSerNo),
    FOREIGN KEY (prodTypeSerNo)  REFERENCES  products_type_index (prodTypeSerNo)
);

-- -- 酒單
-- CREATE TABLE cocktail_list (
--     cockliSerNo        int(11)      UNSIGNED NOT NULL AUTO_INCREMENT              COMMENT "酒單流水號", -- P.K
--     cockliChaName      varchar(50)                                                COMMENT "中文調酒名",
--     cockliEngName      varchar(50)                                                COMMENT "英文調酒名",
--     cockliClass        int(3)                                                     COMMENT "調酒類別",
--     cockliBase         int(3)                NOT NULL DEFAULT 99                  COMMENT "主要基酒",
--     updatedAt          datetime              NOT NULL                             COMMENT "更新時間",
--     createdAt          datetime              NOT NULL DEFAULT CURRENT_TIMESTAMP   COMMENT "建立時間",
--     -- cockliUpdateTime   datetime              NOT NULL                COMMENT "更新時間",
--     -- cockliCreateTime   datetime              NOT NULL                COMMENT "建立時間",
--     PRIMARY KEY (cockliSerNo)
-- );

-- -- 酒譜
-- CREATE TABLE cocktail_recipe (    
--     recSerNo      int(11)      UNSIGNED NOT NULL AUTO_INCREMENT            COMMENT "酒譜流水號", -- P.K
--     cockliSerNo   int(11)      UNSIGNED NOT NULL                           COMMENT "酒單流水號", -- F.K
--     recMaterial	  varchar(200)                                             COMMENT "材料",
--     recDecoration varchar(200)                                             COMMENT "裝飾物",
--     recMethod     int(3)                                                   COMMENT "調酒方式",
--     recCup        int(3)                NOT NULL                           COMMENT "容器",
--     recSteps      text                                                     COMMENT "製作步驟",
--     recABV        float(6,4)                                               COMMENT "酒精濃度",
--     updatedAt     datetime              NOT NULL                           COMMENT "更新時間",
--     createdAt     datetime              NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT "建立時間",
--     PRIMARY KEY (recSerNo),
--     FOREIGN KEY (cockliSerNo)  REFERENCES  cocktail_list (cockliSerNo)
-- );

-- -- 酒圖鑑
-- CREATE TABLE cocktail_photo (
--     ctpSerNo      int(11)        UNSIGNED NOT NULL AUTO_INCREMENT COMMENT "調酒圖流水號", -- P.K
--     cockliSerNo   int(11)        UNSIGNED NOT NULL                COMMENT "酒單流水號",   -- F.K
--     ctpIsMainPic  Boolean                 NOT NULL DEFAULT 0      COMMENT "是否為主圖",
--     ctpPhone      varchar(255)                                    COMMENT "調酒圖片",
--     ctpUpdateTime datetime                NOT NULL                COMMENT "更新時間",
--     ctpCreateTime datetime                NOT NULL                COMMENT "建立時間",
--     PRIMARY KEY (ctpSerNo),
--     FOREIGN KEY (cockliSerNo)  REFERENCES  cocktail_list (cockliSerNo)
-- );
