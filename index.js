const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');
const authMiddleware = require('./middleware/auth');
const errorHandler = require('./middleware/error');
const routes = require('./routes');
const pkg = require('./package.json');


const { port, mongoUrl, secret } = config;
const app = express();


// Conectar aplicación a MongoDB
//mongoUrl ya está configurada en Config && creada en servidor de MongoDB
mongoose.connect(mongoUrl, { useNewUrlParser: true })
.then(()=>{
  console.log("Funciona ¬¬ ÑAÑAÑ")
})
// .catch(()=>{
// console.log("NO funciona ¬¬")
// })
.catch((e=>{
  console.log("why", e)
}))


app.set('config', config);
app.set('pkg', pkg);


app.use(express.json());
app.use(authMiddleware(secret));


// Registrar rutas
routes(app, (err) => {
  if (err) {
    throw err;
  }


  // Registro de "middleware" que maneja posibles errores
  app.use(errorHandler);

  app.listen(port, () => console.log(`App listening on port ${port}`));
});
