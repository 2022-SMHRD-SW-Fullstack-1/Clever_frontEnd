// src/main/frontend/src/setProxy.js

const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    createProxyMiddleware("/clever", {
      target: "http://localhost:8099",
      changeOrigin: true,
    })
  );
};
