import express from "express";
import bodyParser from "body-parser";
import router from "./src/routes/index.js";
import authRouter from "./src/routes/auth.js";
import session from 'express-session'
import passport from 'passport';
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth';

const app = express();

//Configuraciones
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2);

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'SECRET'
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Routes
app.use(router);