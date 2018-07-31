const Joi = require("joi");
const jwt = require("jsonwebtoken");

module.exports = (app, User, Article, Like, Comment, Token) => {
    let usersController = {};

    usersController.signup = (req, res) => {
        Joi.validate(
            req.body,
            {
                email: Joi.string()
                    .email()
                    .required()
                    .min(3),
                password: Joi.string().required(),
                nom: Joi.string()
                    .required(),
                prenom: Joi.string()
                    .required()
            },
            (err, data) => {
                if (err) {
                    console.log(err);
                    res.status(400).json({ error: "Form Invalid !" });
                } else {
                    const userData = new User({
                        nom: data.nom,
                        prenom: data.prenom,
                        email: data.email,
                        group: "user"
                    });

                    userData.setPassword(data.password, err => {
                        userData.save((err, result) => {
                            if (err) {
                                res.status(409).json({
                                    message: "Email already exist !"
                                });
                            } else {
                                res.status(200).json({
                                    message: "Signup Success !"
                                });
                            }
                        });
                    });
                }
            }
        );
    };

    usersController.signin = (req, res) => {
        Joi.validate(
            req.body,
            {
                email: Joi.string()
                    .required()
                    .min(3),
                password: Joi.string().required()
            },
            (err, data) => {
                if (err) {
                    res.status(400).json({ error: "Form Invalid !" });
                } else {
                    User.authenticate()(
                        req.body.email,
                        req.body.password || ""
                    ).then(result => {
                        const { user, error } = result;
                        if (error) {
                            res.status(401).json({
                                error: "Login or Password Incorrect !"
                            });
                        } else {
                            const token = jwt.sign(
                                { id: user._doc._id },
                                JWT_SECRET_KEY,
                                {
                                    expiresIn: "7d"
                                }
                            );

                            const tokenData = new Token({
                                token: token,
                                id_User: user._id
                            });

                            tokenData.save(err => {
                                res.json({ token: token });
                            });
                        }
                    });
                }
            }
        );
    };

    usersController.changePassword = (req, res) => {
        Joi.validate(
            req.body,
            {
                oldpassword: Joi.string().required(),
                password: Joi.string().required()
            },
            (err, data) => {
                if (err) {
                    res.status(400).json({ error: "Form Invalid !" });
                } else {
                    let AdminUser = req.currentUser;

                    AdminUser.changePassword(
                        data.oldpassword,
                        data.password,
                        err => {
                            if (err) {
                                res.status(401).json({
                                    error: "Old Password not correct !"
                                });
                            } else {
                                Token.remove(
                                    { id_User: AdminUser._id },
                                    err => {
                                        const token = jwt.sign(
                                            { id: AdminUser._doc._id },
                                            app.get("JWT_SECRET"),
                                            {
                                                expiresIn: app.get("JWT_TIME")
                                            }
                                        );

                                        const tokenData = new Token({
                                            token: token,
                                            id_User: AdminUser._id
                                        });

                                        tokenData.save(() => {
                                            AdminUser.resetAttempts(err => {
                                                res.json({
                                                    message:
                                                        "Password Changed !",
                                                    token: token
                                                });
                                            });
                                        });
                                    }
                                );
                            }
                        }
                    );
                }
            }
        );
    };

    usersController.editUser = (req, res) => {
        Joi.validate(
            req.body,
            {
                nom: Joi.string()
                    .alphanum()
                    .required(),
                prenom: Joi.string()
                    .alphanum()
                    .required(),
                avatar: Joi.string()
            },
            (err, data) => {
                if (err) {
                    res.status(400).json({ error: "Form Invalid !" });
                } else {
                    User.findByIdAndUpdate(
                        req.currentUser._id,
                        req.body,
                        (err, data) => {
                            if (err) {
                                res.status(400).json({
                                    error: "User not saved !"
                                });
                            } else {
                                res.json({ message: "User Saved !" });
                            }
                        }
                    );
                }
            }
        );
    };

    usersController.getMe = (req, res) => {
        res.json(req.currentUser._doc);
    };

    usersController.setAdmin = (req, res) => {
        User.findByIdAndUpdate(
            req.params.id,
            { group: "administrateur" },
            (err, data) => {
                if (err) {
                    res.status(400).json({
                        error: "User not saved !"
                    });
                } else {
                    res.json({ message: "User Saved !" });
                }
            }
        );
    };

    return usersController;
};
