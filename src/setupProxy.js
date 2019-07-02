const proxy = require("http-proxy-middleware");

module.exports = app => {
  app.use(proxy("*", { target: `${process.env.API_URL}` }));
};