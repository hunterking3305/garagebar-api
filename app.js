const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const productsRouter = require('./routes/products');
const recipesRouter = require('./routes/recipes');

/* Setup Swagger Documentation File Resource */
const swaggerDocument = YAML.load('./misc/api-doc-v1.yaml');

/* New a instance of express */
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
 
// Setup products data api
app.use('/v1/products', productsRouter);
app.use('/v1/recipes', recipesRouter);

// Setup swagger doc router
app.use('/v1/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = app;
