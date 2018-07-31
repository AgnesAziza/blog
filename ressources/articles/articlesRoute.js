module.exports = (app, User, Article, Like, Comment) => {

  const articlesController = require("./articlesController")(app, User, Article, Like, Comment);

  app.get('/api/articles/p/:pages', (req, res) => articlesController.getArticlesByPages(req, res));

  app.post('/api/articles', (req, res) => articlesController.postArticles(req, res));

  app.get('/api/articles/i/:id', (req, res) => articlesController.getArticlesbyId(req, res));

  app.put('/api/articles/i/:id', (req, res) => articlesController.putArticlesbyId(req, res));


};
