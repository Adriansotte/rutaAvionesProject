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
app.use(authRouter);

// imagenes de los view
app.use(express.static('views/public'));

// EJS
app.set('view engine', 'ejs');

//Iniciando el servidor, escuchando...
app.listen(app.get('port'),()=>{
    console.log(`Server listening on port ${app.get('port')}`);
});

// Passport
var userProfile;

app.use(passport.initialize());
app.use(passport.session());

app.get('/findUrl', (req, res) => res.send(userProfile));
app.get('/error', (req, res) => res.send("error logging in"));

passport.serializeUser(function(user, cb) {
    cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
});

// Google AUTH
const GOOGLE_CLIENT_ID = '405512277507-b95dj652a050v29eoafd51p10mf7c84m.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';
passport.use(new GoogleStrategy({
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        userProfile=profile;
        return done(null, userProfile);
    }
));
