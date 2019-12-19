const bodyParser = require('body-parser');
const express = require('express');
const allowCors = require('./cors');
const server = express();
require("dotenv").config();
const port = process.env.PORT;

server.use(bodyParser.urlencoded({extended:true}));
server.use(bodyParser.json());
server.use(allowCors);

server.listen(port, ()=> {
    console.log(`Deu bom na porta ${port}`);
});

module.exports = server;