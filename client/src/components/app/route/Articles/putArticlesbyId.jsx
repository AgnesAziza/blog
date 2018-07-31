import React, { Component } from "react";
import articlesService from "../../services/articlesService";

class putArticlesbyId extends Component {
  articlesService = new articlesService(this.props.history);
  state = { title: "", description: "", desciption2: "", displayMessage:false };

    resetForm() {
        document.getElementById("putArticlesbyId").reset();
    }

    onSubmit(event) {
        event.preventDefault();
        if (this.state.desciption === this.state.desciption2) {
            this.articleService.updateArticle(
                { ...this.state },
                (err, result) => {
                    if (err) {
                      this.setState({displayMessage: err.error});
                      setTimeout(() => {
                        this.setState({displayMessage: false});
                      }, 5000);
                    } else {
                      this.setState({displayMessage: "Article mis à jour"});
                      setTimeout(() => {
                        this.setState({displayMessage: false});
                      }, 5000);
                    }
                }
            );
        }
    }

    handleOldPassword(e) {
        this.setState({ ...this.state, title: e.target.value });
    }
    handleNewPassword(e) {
        this.setState({ ...this.state, description: e.target.value });
    }
    handleNewPassword2(e) {
        this.setState({ ...this.state, desciption2: e.target.value });
    }

    componentWillMount() {
        if (!localStorage.getItem("tokenAuth")) {
            this.props.history.push("/articles/i/");
        }
    }

    render() {
        return (
            <div className="columns">
                <div className="column is-6 is-offset-3">
                    <h1 className="title has-hr">Change Article</h1>
                    <hr className="visible-hr" />
                    {this.state.displayMessage ? (
                      <div>
                        {this.state.displayMessage}
                      </div>
                    ) : null}
                    <form id="putArticlesbyId" onSubmit={e => this.onSubmit(e)}>
                        <div className="field">
                            <div className="control has-icons-left has-icons-right">
                                <input
                                    className="input"
                                    type="input"
                                    placeholder=" "
                                    value={this.state.description}
                                    onChange={e => this.handleOldDescription(e)}
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
                                    placeholder="New description"
                                    value={this.state.description2}
                                    onChange={e => this.handleNewDesciption(e)}
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

export default putArticlesbyId;
