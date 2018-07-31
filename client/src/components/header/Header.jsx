import React, { Component } from "react";

import { Link, NavLink } from "react-router-dom";

class Header extends Component {
    userName = localStorage.getItem("userName") || "";

    checkIfAuthentificated() {
        if (localStorage.getItem("tokenAuth")) {
            return true;
        } else {
            return false;
        }
    }

    render() {
        setInterval(() => {
            this.forceUpdate();
        }, 1000);
        return (
            <nav className="navbar is-dark">
                <div className="navbar-brand">
                    <Link className="navbar-item" to="/">
                        Agnes Blog
                    </Link>
                    <div
                        className="navbar-burger burger"
                        data-target="navbarExampleTransparentExample"
                    >
                        <span />
                        <span />
                        <span />
                    </div>
                </div>

                <div
                    id="navbarExampleTransparentExample"
                    className="navbar-menu"
                >
                    <div className="navbar-start">
                        {this.checkIfAuthentificated() ? (
                            <Link className="navbar-item" to="/">
                                Home
                            </Link>
                        ) : null}
                    </div>

                    <div className="navbar-end">
                        {this.checkIfAuthentificated() ? (
                            <div className="navbar-item has-dropdown is-hoverable">
                                <Link
                                    className="navbar-link"
                                    to="/users/profile"
                                >
                                    <i className="fas fa-user-cog" />&nbsp;profile
                                </Link>
                                <div className="navbar-dropdown is-boxed">
                                    <NavLink
                                        className="navbar-item"
                                        to="/users/profile"
                                        activeClassName="is-active"
                                    >
                                        Edit Profile
                                    </NavLink>
                                    <NavLink
                                        className="navbar-item"
                                        to="/users/changepassword"
                                        activeClassName="is-active"
                                    >
                                        Change Password
                                    </NavLink>
                                    <hr className="navbar-divider" />
                                    <NavLink
                                        className="navbar-item"
                                        activeClassName="is-active"
                                        to="/users/signout"
                                    >
                                        Signout
                                    </NavLink>
                                </div>
                            </div>
                        ) : (
                              <Link className="navbar-item" to="/users/signin">
                                  Signin
                              </Link>

                        )}

                        {this.checkIfAuthentificated() ? null : (
                          <Link className="navbar-item" to="/users/signup">
                              Signup
                          </Link>
                        )}
                    </div>
                </div>
            </nav>
        );
    }
}

export default Header;
