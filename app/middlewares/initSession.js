const expressSession = require('express-session');

const initSession = expressSession({
    resave: true,
    saveUninitialized: true,
    secret: process.env.SECRET,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 * 12, // ça fait 12 heures
        
    },
});


module.exports = initSession;