import React, { Component } from "react";
import usersService from "../../services/usersService";

class Signup extends Component {
    usersService = new usersService(this.props.history);

    resetForm() {
        document.getElementById("signup").reset();
    }

    onSubmit(event) {
        event.preventDefault();
        this.usersService.signup(
            this.state,
            (err, result) => {
                if (!err) {
                    console.log("Redirect to Signin!");
                    this.props.history.push("/users/signin");
                }
            }
        );
    }

    handleEmailChange(e) {
        this.setState({ email: e.target.value });
    }
    handlePasswordChange(e) {
        this.setState({ password: e.target.value });
    }

    handleNomChange(e) {
        this.setState({ nom: e.target.value });
    }
    handlePrenomChange(e) {
        this.setState({ prenom: e.target.value });
    }

    componentWillMount() {
        // if (localStorage.getItem("tokenAuth")) this.props.history.push("/");
    }

    render() {
        return (
            <div className="columns">
                <div className="column is-6 is-offset-3">
                    <h1 className="title has-hr">Signup</h1>
                    <hr className="visible-hr" />
                    <form id="signup" onSubmit={e => this.onSubmit(e)}>
                        <div className="field">
                            <div className="control has-icons-left has-icons-right">
                                <input
                                    className="input"
                                    type="email"
                                    placeholder="Email"
                                    onChange={e => this.handleEmailChange(e)}
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

                        <div className="field">
                            <div className="control has-icons-left has-icons-right">
                                <input
                                    className="input"
                                    type="text"
                                    placeholder="Nom"
                                    onChange={e => this.handleNomChange(e)}
                                />
                                <span className="icon is-left">
                                    <i className="fas fa-user" />
                                </span>
                            </div>
                        </div>

                        <div className="field">
                            <div className="control has-icons-left has-icons-right">
                                <input
                                    className="input"
                                    type="text"
                                    placeholder="Prenom"
                                    onChange={e => this.handlePrenomChange(e)}
                                />
                                <span className="icon is-left">
                                    <i className="fas fa-user" />
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

export default Signup;
