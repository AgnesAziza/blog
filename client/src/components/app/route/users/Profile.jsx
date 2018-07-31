import React, { Component } from "react";
import usersService from "../../services/usersService";

class Profile extends Component {
    usersService = new usersService(this.props.history);
    state = { nom: "", prenom: "", _id: "", displayMessage: false };

    resetForm() {
        document.getElementById("signin").reset();
    }

    onSubmit(event) {
        event.preventDefault();
        this.usersService.updateProfile({ ...this.state }, (err, result) => {
            if (!err) {
              this.setState({displayMessage: "Profil mis à jour"});
              setTimeout(() => {
                this.setState({displayMessage: false});
              }, 5000);
            }
        });
    }

    handleFirstname(e) {
        this.setState({ ...this.state, prenom: e.target.value });
    }
    handleLastname(e) {
        this.setState({ ...this.state, nom: e.target.value });
    }

    componentWillMount() {
        if (!localStorage.getItem("tokenAuth")) {
            this.props.history.push("/users/login");
        } else {
            this.usersService.me((err, result) => {
                if (result) {
                    this.setState({
                        ...result
                    });
                }
            });
        }
    }

    render() {
        return (
            <div className="columns">
                <div className="column is-6 is-offset-3">
                    <h1 className="title has-hr">Edit Profile</h1>
                    <hr className="visible-hr" />
                    {this.state.displayMessage ? (
                      <div>
                        {this.state.displayMessage}
                      </div>
                    ) : null}
                    <form id="signin" onSubmit={e => this.onSubmit(e)}>
                        <div className="field">
                            <div className="control has-icons-left has-icons-right">
                                <label className="input">
                                    {this.state.email}
                                </label>
                                <span className="icon is-left">
                                    <i className="fas fa-lock" />
                                </span>
                            </div>
                        </div>

                        <div className="field">
                            <div className="control has-icons-left has-icons-right">
                                <input
                                    className="input"
                                    type="input"
                                    placeholder="First Name"
                                    value={this.state.prenom}
                                    onChange={e => this.handleFirstname(e)}
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
                                    type="input"
                                    placeholder="Last Name"
                                    value={this.state.nom}
                                    onChange={e => this.handleLastname(e)}
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

export default Profile;
