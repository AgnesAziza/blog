const Joi = require("joi");

module.exports = (app, User, Article, Like, Comment, Token) => {
    const articlesController = {};

    articlesController.getArticlesByPages = (req, res) => {
        Joi.validate(
            req.params,
            {
                pages: Joi.number().required()
            },
            (err, data) => {
                if (err) {
                    res.status(400).json({ error: "Form Invalid !" });
                } else {
                    Article.paginate(
                        {
                            etatPublication: true
                        },
                        { page: req.params.pages, limit: 10 },
                        function(err, result) {
                            res.json(result);
                        }
                    );
                }
            }
        );
    };

    articlesController.getArticlesbyId = (req, res) => {
        Joi.validate(
            req.params,
            {
                id: Joi.string().required()
            },
            (err, data) => {
                if (err) {
                    res.status(400).json({ error: "Form invalid" });
                } else {
                    Article.findOne({
                        _id: req.params.id
                    })
                        .populate("id_User")
                        .exec((err, article) => {
                            if (!article) {
                                res.status(404).json({
                                    error: "Article Not Found !"
                                });
                            } else {
                                res.json(article);
                            }
                        });
                }
            }
        );
    };

    articlesController.postArticles = (req, res) => {
        Joi.validate(
            req.body,
            {
                title: Joi.string()
                    .required()
                    .min(3),
                description: Joi.string()
                    .required()
                    .min(10)
            },
            (err, data) => {
                if (err) {
                    res.status(400).json({ error: "Form Invalid !" });
                } else {
                    let article = new Article({
                        title: req.body.title,
                        description: req.body.description,
                        id_User: req.currentUser._id
                    });

                    article.save(err => {
                        if (err) {
                            res.status(400).json({
                                error: "Article not saved !"
                            });
                        } else {
                            res.json({ message: "Article Saved !" });
                        }
                    });
                }
            }
        );
    };

    articlesController.putArticles = (req, res) => {
        Joi.validate(
            req.body,
            {
                title: Joi.string()
                    .required()
                    .min(3),
                description: Joi.string()
                    .required()
                    .min(10)
            },
            (err, data) => {
                if (err) {
                    res.status(400).json({ error: "Form Invalid !" });
                } else {
                    Article.findByIdAndUpdate(
                        req.params.id,
                        req.body,
                        (err, article) => {
                            if (err) {
                                res.status(400).json({
                                    error: "Article not saved !"
                                });
                            } else {
                                res.json({ message: "Article Saved !" });
                            }
                        }
                    );
                }
            }
        );
    };

    articlesController.deleteArticles = (req, res) => {
        Article.findByIdAndDelete(req.params.id, (err, article) => {
            if (err) {
                res.status(400).json({
                    error: "Article not saved !"
                });
            } else {
                res.json({ message: "Article Saved !" });
            }
        });
    };

    articlesController.getArticlesNoPublish = (req, res) => {
        Joi.validate(
            req.params,
            {
                pages: Joi.number().required()
            },
            (err, data) => {
                if (err) {
                    res.status(400).json({ error: "Form Invalid !" });
                } else {
                    Article.paginate(
                        {
                            etatPublication: false
                        },
                        { page: req.params.pages, limit: 10 },
                        function(err, result) {
                            res.json(result);
                        }
                    );
                }
            }
        );
    };

    articlesController.publishArticle = (req, res) => {
        Article.findByIdAndUpdate(
            req.params.id,
            { etatPublication: true },
            (err, article) => {
                if (err) {
                    res.status(400).json({
                        error: "Article not saved !"
                    });
                } else {
                    res.json({ message: "Article Saved !" });
                }
            }
        );
    };

    return articlesController;
};
