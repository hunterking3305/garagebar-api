const dbConfig = {
    host: "34.80.169.138",
    user: "root",
    password: "leoking3305",
    database: "garage_bar",
    port: 3306,
    dialect: 'mysql',
    connectionLimit: 10,
    multipleStatements: true,
};

const log4jsConfig = {
    appenders: {
        console: {
            type: "console",
        },
        // file: {
        //     type: "file",
        // },
    },
    categories: {
        default: {
            appenders: ["console"],
            level: "debug",
        },
    },
};

module.exports = {
    dbConfig,
    log4jsConfig,
};