import React, { Component } from "react";
import usersService from "../../services/usersService";

class Signin extends Component {
    usersService = new usersService(this.props.history);

    resetForm() {
        document.getElementById("signin").reset();
    }

    onSubmit(event) {
        event.preventDefault();
        this.usersService.signin(
            this.state.login,
            this.state.password,
            (err, result) => {
                if (!err) {
                    console.log("OK !");
                    //Save Token on Local Storage
                    localStorage.setItem("tokenAuth", result.token);

                    setTimeout(() => {
                        console.log("Redirect to Home !");
                        this.props.history.push("/");
                    }, 2000);
                }
            }
        );
    }

    handleLoginChange(e) {
        this.setState({ login: e.target.value });
    }
    handlePasswordChange(e) {
        this.setState({ password: e.target.value });
    }

    componentWillMount() {
        // if (localStorage.getItem("tokenAuth")) this.props.history.push("/");
    }

    render() {
        return (
            <div className="columns">
                <div className="column is-6 is-offset-3">
                    <h1 className="title has-hr">Signin</h1>
                    <hr className="visible-hr" />
                    <form id="signin" onSubmit={e => this.onSubmit(e)}>
                        <div className="field">
                            <div className="control has-icons-left has-icons-right">
                                <input
                                    className="input"
                                    type="email"
                                    placeholder="Email"
                                    onChange={e => this.handleLoginChange(e)}
                                />
                                <span className="icon is-left">
                                    <i className="fas fa-envelope" />
                                </span>
                            </div>
                        </div>

                        <div className="field">
                            <div className="control has-icons-left has-icons-right">
                                <input
                                    className="input"
                                    type="password"
                                    placeholder="Password"
                                    onChange={e => this.handlePasswordChange(e)}
                                />
                                <span className="icon is-left">
                                    <i className="fas fa-certificate" />
                                </span>
                            </div>
                        </div>

                        <div className="field is-grouped is-grouped-centered">
                            <p className="control">
                                <button className="button is-primary">
                                    Submit
                                </button>
                            </p>
                            <p className="control">
                                <a
                                    className="button is-light"
                                    onClick={() => this.resetForm()}
                                >
                                    Cancel
                                </a>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default Signin;
