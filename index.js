import mongoose from "mongoose";
import express from "express";
import passport from "passport";
import bodyParser from "body-parser";
import joi from "joi";
import jsonwebtoken from "jsonwebtoken";


mongoose.Promise = global.Promise;

//on charge nos models ici
const User = require("./ressources/users/usersModel")(mongoose);
const Article = require("./ressources/articles/articlesModel")(mongoose);
const Like = require("./ressources/likes/likesModel")(mongoose);
const Comment = require("./ressources/comments/commentsModel")(mongoose);
const Token = require("./ressources/tokens/tokensModel")(mongoose);

// connexion db
mongoose.connect(
    "mongodb://localhost:27017/blogFinal",
    { useNewUrlParser: true },
    function(err) {
        if (err) {
            console.log(err);
        } else {
            console.log("ok");
        }
    }
);

//PASSPORT CONFIGURATION
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
global.JWT_SECRET_KEY = "thismysecretkey";

//Init express app
const app = express();

//Role Checker
function requireRole(arrayParams = []) {
    return function(req, res, next) {
        let flag = false;
        const group = req.currentUser.group;

        for (let j = 0; j < arrayParams.length; j++) {
            if (group.toLowerCase() == arrayParams[j].toLowerCase()) {
                flag = true;
            }
        }

        if (flag) {
            next();
        } else {
            res.status(403).json({ error: "Permission Error !" });
        }
    };
}

global.requireRole = requireRole;

//JSON + URL ENCODED
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);

app.use(
    bodyParser.json({
        limit: "2Omb"
    })
);

app.all("*", (req, res, next) => {
    res.header("Access-Control-Allow-Credentials", false);
    res.header(
        "Access-Control-Allow-Methods",
        "GET, PUT, DELETE, POST, OPTIONS"
    );
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

app.options("*", (req, res, next) => {
    res.status(200).send("OK");
});

//TOKENS MIDDLEWARE
const tokensMiddleware = require("./tools/auth/tokensMiddleware")(app, {
    User,
    Token
});
const configUrls = require("./tools/auth/configUrls.json");

app.all("/api/*", (req, res, next) => {
    tokensMiddleware.checkTokens(req, res, next, configUrls);
});

//ROUTES
const articleRoute = require("./ressources/articles/articlesRoute")(
    app,
    User,
    Article,
    Like,
    Comment,
    Token
);

const usersRoute = require("./ressources/users/usersRoute")(
    app,
    User,
    Article,
    Like,
    Comment,
    Token
);

//CHARGE REACT
app.use(express.static("client/build"));

app.all("*", (req, res) => {
    res.send("client/build/index.html");
});

app.listen(8080);

console.log("Listen on port: 8080");
