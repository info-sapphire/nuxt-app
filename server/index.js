const express = require("express");

const isNuxt = process.env.NUXT_MODE !== "off";
const nuxt = require("./nuxt");

/* Init App */
const app = express();

/**
 * Special route for Nuxt stub
 * NUXT_MODE = off
 */
if (!isNuxt) {
  app.use((req, res, next) => {
    return res.send("<h1>it's work!</h1>");
  });
}

nuxt().then((nuxt) => {
  const { host, port } = nuxt.options.server;

  /* Give nuxt middleware to express */
  app.use(nuxt.render);

  app.listen(port, host, () => {
    consola.ready({
      message: `Server listening on http://${host}:${port}`,
      badge: true,
    });
  });
});
