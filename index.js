import mongoose from 'mongoose';
import express from 'express';
import passport from 'passport';
import bodyParser from 'body-parser';
import joi from 'joi';
import jsonwebtoken from 'jsonwebtoken';

mongoose.Promise = global.Promise;

//on charge nos models ici
const User = require('./ressources/users/usersModel')(mongoose);
const Article = require('./ressources/articles/articlesModel')(mongoose);
const Like = require('./ressources/likes/likesModel')(mongoose);
const Comment = require('./ressources/comments/commentsModel')(mongoose);


// connexion db
mongoose.connect("mongodb://localhost:27017/blogFinal", { useNewUrlParser: true }, function(err) {
  if(err) {
    console.log(err)
  }
  else {
    console.log("ok");
  }
});

//PASSPORT CONFIGURATION
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const app = express();

//JSON + URL ENCODED
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

app.use(
  bodyParser.json({
    limit: "2Omb"
  })
)

app.all("*", (req, res, next) => {
  res.header("Access-Control-Allow-Credentials", false);
  res.header("Access-Control-Allow-Methods", "GET, PUT, DELETE, POST, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.options("*", (req, res, next) => {
  res.status(200).send("OK");
});

//TOKENS MIDDLEWARE

//ROUTES
const articleRoute = require("./ressources/articles/articlesRoute")(app, User, Article, Like, Comment);

//CHARGE REACT
app.use(express.static("client/build"));

app.all("*", (req, res) => {
  res.send("client/build/index.html");
});

app.listen(8080);

console.log("Listen on port: 8080")
