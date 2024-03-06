import express from "express";
import bodyParser from "body-parser";
import router from "./src/routes/index.js";
import graphRoutes from "./src/routes/graphRoutes.js";

const app = express();

// Configuraciones
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2);
app.set('view engine', 'ejs');

// Middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Rutas
app.use(router);
app.use(graphRoutes);

// Iniciando el servidor, escuchando...
app.listen(app.get('port'), () => {
    console.log(`Server listening on port ${app.get('port')}`);
});

