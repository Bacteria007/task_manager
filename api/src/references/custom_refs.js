const mongoose = require("mongoose");
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken")
const cors = require("cors")
const secretKey = "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcxMzA5NjQ3MSwiaWF0IjoxNzEzMDk2NDcxfQ.Pzh_rd2eEhK2mtx0OKVqx-yfvkS67AaoLvR3Zx8xcxk==";
app.use(cors())
const path =require("path")
app.use(express.json());
app.use(express.static(path.resolve(__dirname,"build")))
console.log(path.resolve(__dirname,"build"));

module.exports = {
    app,
    express,
    jwt,
    secretKey,
    express,
    mongoose,
}

