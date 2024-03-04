import express from "express";
import passport from 'passport';

const router = express.Router();

router.get('/auth/google',
    passport.authenticate('google', {scope: ['profile', 'email']}));

router.get('/auth/google/callback',
    passport.authenticate('google', {failureRedirect: '/error'}),
    function (req, res) {
        res.redirect('/userInterface');
    });

router.get('/', (req, res) => {
    res.render('login', {title: 'Google SignIn'});
});

export default router