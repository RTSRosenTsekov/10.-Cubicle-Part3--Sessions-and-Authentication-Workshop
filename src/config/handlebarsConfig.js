const handlebars=require("express-handlebars");

const handlebarseConfig = (app) => {
  app.engine("hbs", handlebars.engine({ extname: "hbs" }));
  app.set("view engine", "hbs");
  app.set("views", "src/views");
};

module.exports = handlebarseConfig;
