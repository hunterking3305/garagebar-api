DROP TABLE IF EXISTS `cocktail_list`;
DROP TABLE IF EXISTS `cocktail_recipe`;
DROP TABLE IF EXISTS `cocktail_photo`;

-- 酒單
CREATE TABLE cocktail_list (
    cockliSerNo        int(11)      UNSIGNED NOT NULL AUTO_INCREMENT              COMMENT "酒單流水號", -- P.K
    cockliChaName      varchar(50)                                                COMMENT "中文調酒名",
    cockliEngName      varchar(50)                                                COMMENT "英文調酒名",
    cockliClass        int(3)                                                     COMMENT "調酒類別",
    cockliBase         int(3)                NOT NULL DEFAULT 99                  COMMENT "主要基酒",
    updatedAt          datetime              NOT NULL                             COMMENT "更新時間",
    createdAt          datetime              NOT NULL DEFAULT CURRENT_TIMESTAMP   COMMENT "建立時間",
    -- cockliUpdateTime   datetime              NOT NULL                COMMENT "更新時間",
    -- cockliCreateTime   datetime              NOT NULL                COMMENT "建立時間",
    PRIMARY KEY (cockliSerNo)
);

-- 酒譜
CREATE TABLE cocktail_recipe (    
    recSerNo      int(11)      UNSIGNED NOT NULL AUTO_INCREMENT            COMMENT "酒譜流水號", -- P.K
    cockliSerNo   int(11)      UNSIGNED NOT NULL                           COMMENT "酒單流水號", -- F.K
    recMaterial	  varchar(200)                                             COMMENT "材料",
    recDecoration varchar(200)                                             COMMENT "裝飾物",
    recMethod     int(3)                                                   COMMENT "調酒方式",
    recCup        int(3)                NOT NULL                           COMMENT "容器",
    recSteps      text                                                     COMMENT "製作步驟",
    recABV        float(6,4)                                               COMMENT "酒精濃度",
    updatedAt     datetime              NOT NULL                           COMMENT "更新時間",
    createdAt     datetime              NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT "建立時間",
    PRIMARY KEY (recSerNo),
    FOREIGN KEY (cockliSerNo)  REFERENCES  cocktail_list (cockliSerNo)
);

-- 酒圖鑑
CREATE TABLE cocktail_photo (
    ctpSerNo      int(11)        UNSIGNED NOT NULL AUTO_INCREMENT COMMENT "調酒圖流水號", -- P.K
    cockliSerNo   int(11)        UNSIGNED NOT NULL                COMMENT "酒單流水號",   -- F.K
    ctpIsMainPic  Boolean                 NOT NULL DEFAULT 0      COMMENT "是否為主圖",
    ctpPhone      varchar(255)                                    COMMENT "調酒圖片",
    ctpUpdateTime datetime                NOT NULL                COMMENT "更新時間",
    ctpCreateTime datetime                NOT NULL                COMMENT "建立時間",
    PRIMARY KEY (ctpSerNo),
    FOREIGN KEY (cockliSerNo)  REFERENCES  cocktail_list (cockliSerNo)
);
