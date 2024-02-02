const path = require('path');

module.exports = {
  mode: "development",
  entry: {
      registro: './src/registro/registro.js',
      login: './src/login/login.js',
      restablecerPass: './src/restablecerPass/restablecerPass.js',
      dashboard: './src/dashboard/dashboard.js',
      inicio: './src/inicio/inicio.js',
      crearHumanos: './src/crearHumanos/crearHumanos.js',
      crearPruebas: './src/crearPruebas/crearPruebas.js'
  },
    output: {
      filename: '[name].main.js',
      path: path.resolve(__dirname, 'dist'),
    },
    devServer: {
      static: path.resolve(__dirname, './'), 
      port: 8091, 
      open: {
        target: 'src/index.html',
      },
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    },
};