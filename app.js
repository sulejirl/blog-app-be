var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

var indexRouter = require('./routes/index');

var app = express();

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
      title: 'Express API for JSONPlaceholder',
      version: '1.0.0',
      description:
        'This is a REST API application made with Express. It retrieves data from JSONPlaceholder.',
      license: {
        name: 'Licensed Under MIT',
        url: 'https://spdx.org/licenses/MIT.html',
      },
      contact: {
        name: 'JSONPlaceholder',
        url: 'https://jsonplaceholder.typicode.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:3001',
        description: 'Development server',
      },
    ],
  };
const options = {
    swaggerDefinition,
    // Paths to files containing OpenAPI definitions
    apis: ['./routes/*/*.js'],
  };
  const swaggerSpec = swaggerJSDoc(options);

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = app;
