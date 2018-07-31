import React, { Component } from "react";

import { Route } from "react-router-dom";

import Signin from "./Signin";
import Signup from "./Signup";
import Signout from "./Signout";
import Profile from "./Profile";
import ChangePassword from "./ChangePassword";

class UsersIndex extends Component {
    render() {
        console.log(this.props);

        return (
            <div>
                {/*  Auth Routes  */}
                <Route
                    exact
                    path="/users/signin"
                    render={() => <Signin {...this.props} />}
                />

                <Route
                    exact
                    path="/users/signup"
                    render={() => <Signup {...this.props} />}
                />

                <Route
                    exact
                    path="/users/profile"
                    render={() => <Profile {...this.props} />}
                />
                <Route
                    exact
                    path="/users/changepassword"
                    render={() => <ChangePassword {...this.props} />}
                />
                <Route exact path="/users/signout" component={Signout} />
            </div>
        );
    }
}

export default UsersIndex;
