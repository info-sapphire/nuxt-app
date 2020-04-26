const { Nuxt, Builder } = require("nuxt");

// Import and Set Nuxt.js options
const config = require("../nuxt.config.js");
const isDev = process.env.NODE_ENV !== "production";
const isNuxt = process.env.NUXT_MODE !== "off";

module.exports = async () => {
  if (!isNuxt) {
    return {
      options: { server: { host: "127.0.0.1", port: "3000" } },
      render: () => {},
    };
  }

  // Init Nuxt.js
  const nuxt = new Nuxt({ ...config, dev: isDev });

  if (isDev) {
    const builder = new Builder(nuxt);
    await builder.build();
  } else {
    await nuxt.ready();
  }

  return nuxt;
};
