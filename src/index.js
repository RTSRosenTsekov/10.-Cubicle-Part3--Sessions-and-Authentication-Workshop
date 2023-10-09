// В терминала инсталираме
//1. npm init -y ,
// 2. npm i express ,
// 3. npm i nodemon -D ,
// 4. npm i express-handlebars ,
// 5 npm i bcrypt
// 6.npm i cookie-parser
// 7. npm i jsonwebtoken
// 8. Накрая пишем npm start за да стартираме сървъра
//Imports
const express = require("express");
const handlebarseConfig = require("./config/handlebarsConfig");
const expressConfig = require("./config/expressConfig");
const { PORT } = require("./constants");
const routes = require("./router");
const dbConnect = require("./config/dbConfig");

// Connecting to the data base ;
dbConnect()
  .then(() => {
    console.log("Successfuly connected DB!");
  })
  .catch((err) => console.log(`Error while connecting in DB: ${err}`));
// Local variables
const app = express();

// configs
expressConfig(app);
handlebarseConfig(app);

// Routing
app.use(routes);
app.listen(PORT, () => console.log(`Server is running on port ${PORT}...`));
