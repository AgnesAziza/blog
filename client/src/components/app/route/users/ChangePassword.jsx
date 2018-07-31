import React, { Component } from "react";
import usersService from "../../services/usersService";

class ChangePassword extends Component {
    usersService = new usersService(this.props.history);
    state = { oldpassword: "", password: "", password2: "", displayMessage:false };

    resetForm() {
        document.getElementById("signin").reset();
    }

    onSubmit(event) {
        event.preventDefault();
        if (this.state.password === this.state.password2) {
            this.usersService.updatePassword(
                { ...this.state },
                (err, result) => {
                    if (err) {
                      this.setState({displayMessage: err.error});
                      setTimeout(() => {
                        this.setState({displayMessage: false});
                      }, 5000);
                    } else {
                      this.setState({displayMessage: "Mdp mis à jour"});
                      setTimeout(() => {
                        this.setState({displayMessage: false});
                      }, 5000);
                    }
                }
            );
        }
    }

    handleOldPassword(e) {
        this.setState({ ...this.state, oldpassword: e.target.value });
    }
    handleNewPassword(e) {
        this.setState({ ...this.state, password: e.target.value });
    }
    handleNewPassword2(e) {
        this.setState({ ...this.state, password2: e.target.value });
    }

    componentWillMount() {
        if (!localStorage.getItem("tokenAuth")) {
            this.props.history.push("/users/login");
        }
    }

    render() {
        return (
            <div className="columns">
                <div className="column is-6 is-offset-3">
                    <h1 className="title has-hr">Change Password</h1>
                    <hr className="visible-hr" />
                    {this.state.displayMessage ? (
                      <div>
                        {this.state.displayMessage}
                      </div>
                    ) : null}
                    <form id="signin" onSubmit={e => this.onSubmit(e)}>
                        <div className="field">
                            <div className="control has-icons-left has-icons-right">
                                <input
                                    className="input"
                                    type="input"
                                    placeholder="Old Password"
                                    value={this.state.oldpassword}
                                    onChange={e => this.handleOldPassword(e)}
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
                                    type="input"
                                    placeholder="New Password"
                                    value={this.state.password}
                                    onChange={e => this.handleNewPassword(e)}
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
                                    type="input"
                                    placeholder="Confirm New Password"
                                    value={this.state.password2}
                                    onChange={e => this.handleNewPassword2(e)}
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

export default ChangePassword;
