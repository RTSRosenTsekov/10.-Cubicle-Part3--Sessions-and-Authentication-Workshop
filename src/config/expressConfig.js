const path = require("path");
const express= require("express");
const cookieParser = require("cookie-parser");

const expressConfig = (app) => {
  // setup static files да зареди css fails и да се дебъгва
  app.use(express.static(path.resolve(__dirname, "../public")));
  // за да виждаме параметрите който се подават от формата във бодито 
  app.use(express.urlencoded({extended:false}));
  // за да може да ползваме куку-парсара 
  app.use(cookieParser());

};

module.exports = expressConfig;
