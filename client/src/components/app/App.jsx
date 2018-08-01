import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import Home from "./route/home/Home";
import Page404 from "./route/page404/Page404";

import UsersIndex from "./route/users/UsersIndex";

import usersService from "./services/usersService";
import postArticle from "./route/Articles/postArticle";
import putArticlesbyId  from "./route/Articles/putArticlesbyId";
import getArticlesbyId  from "./route/Articles/getArticlesbyId";

class App extends Component {
    state = {
        alertOptions: {}
    };

    usersService = new usersService(this.props.history);

    constructor(props) {
        super(props);
        this.alertChild = React.createRef();
    }

    componentWillMount() {
        if (localStorage.getItem("tokenAuth")) {
            this.usersService.me((err, result) => {
                localStorage.setItem("userGroup", result.group);
            });
        }

        setInterval(() => {
            if (localStorage.getItem("tokenAuth")) {
                this.usersService.me((err, result) => {
                    localStorage.setItem("userGroup", result.group);
                });
            }
        }, 10000);
    }

    render() {

        return (
            <div className="container is-fluid">
                <br className="navbar-menu" />
                <div className="notification">
                    <Switch>
                        <Route
                            exact
                            path="/"
                            render={() => (
                                <Home {...this.props} />
                            )}
                        />

                        <Route
                            exact
                            path="/articles"
                            render={() => (
                                <postArticle {...this.props} />
                            )}
                        />

                        <Route
                            exact
                            path="/articles/i"
                            render={() => (
                                <putArticlesbyId {...this.props} />
                            )}
                        />

                        <Route
                            exact
                            path="/articles/i"
                            render={() => (
                                <getArticlesbyId {...this.props} />
                            )}
                        />



                        <UsersIndex {...this.props} />

                        <Route component={Page404} />
                    </Switch>
                </div>
            </div>
        );
    }
}

export default App;
