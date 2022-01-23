const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common");
const packageJson = require("../package.json");

const devConfig = {
  mode: "development",
  output: {
    publicPath: "http://localhost:8080/",
  },
  devServer: {
    port: 8080,
    historyApiFallback: {
      index: "index.html",
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "container",
      remotes: {
        // la sintaxis de los remotes es tal que las keys son los nombres de los diferentes módulos que queremos importar en nuestro contenedor
        // los values van a ser los directorios donde el remoteEntry file para esos modulos
        marketing: "marketing@http://localhost:8081/remoteEntry.js", // este marketing@ es la clave que debe coincidir con el name de nuestro micro
        auth: "auth@http://localhost:8082/remoteEntry.js",
        dashboard: "dashboard@http://localhost:8083/remoteEntry.js",
      },
      // shared: ["react", "react-dom"],
      shared: packageJson.dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, devConfig);
