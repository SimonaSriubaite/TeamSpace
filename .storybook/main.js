const path = require("path");

const resolve = (dir) => path.resolve(__dirname, dir);

module.exports = {
  stories: ["../src/**/*.stories.jsx"],

  webpackFinal: async (config) => {
    // do mutation to the config
    config.resolve.extensions.push(".js", ".jsx");

    config.resolve.alias = Object.assign(config.resolve.alias, {
      app: resolve("../src/app"),
      assets: resolve("../src/assets"),
      components: resolve("../src/components"),
      pages: resolve("../src/pages"),
      utils: resolve("../src/utils"),
    });

    config.module.rules.push({
      test: /\.scss$/,
      exclude: /node_modules/,
      use: [
        "style-loader",
        "css-loader",
        "postcss-loader",
        {
          loader: "sass-loader",
          options: {
            prependData: `
              @import 'src/styles/index.scss';
            `,
          },
        },
      ],
    });

    config.module.rules.unshift({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};
