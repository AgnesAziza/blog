module.exports = (app, User, Article, Like, Comment, Token) => {
    const usersController = require("./usersController")(
        app,
        User,
        Article,
        Like,
        Comment,
        Token
    );

    app.route("/api/users/signup").post((req, res) =>
        usersController.signup(req, res)
    );

    app.route("/api/users/signin").post((req, res) =>
        usersController.signin(req, res)
    );

    app.route("/api/users/changepassword").put((req, res) =>
        usersController.changePassword(req, res)
    );

    app.route("/api/users").put((req, res) =>
        usersController.editUser(req, res)
    );

    app.route("/api/users/me").get((req, res) =>
        usersController.getMe(req, res)
    );

    app.route("/api/admin/:id").post((req, res) =>
        usersController.setAdmin(req, res)
    );
};
