
import React, { Component } from "react";
import articlesService from "../../services/articlesService";

class postArticle extends Component {
    articlesService = new articlesService(this.props.history);

    resetForm() {
        document.getElementById("postArticles").reset();
    }

    onSubmit(event) {
        event.preventDefault();
        this.articleService.postArticles(
            this.state,
            (err, result) => {
                if (!err) {
                    console.log("OK !");
                    //Save Token on Local Storage
                    localStorage.setItem("tokenAuth", result.token);

                    setTimeout(() => {
                        console.log("Redirect to Article !");
                        this.props.history.push("/articles");
                    }, 2000);
                }
            }
        );
    }

    handleLoginChange(e) {
        this.setState({ title: e.target.value });
    }
    handlePasswordChange(e) {
        this.setState({ description: e.target.value });
    }

    componentWillMount() {
        // if (localStorage.getItem("tokenAuth")) this.props.history.push("/");
    }

    render() {
        return (
            <div className="columns">
                <div className="column is-6 is-offset-3">
                    <h1 className="title has-hr">Article</h1>
                    <hr className="visible-hr" />
                    <form id="postArticles" onSubmit={e => this.onSubmit(e)}>
                        <div className="field">
                            <div className="control has-icons-left has-icons-right">
                                <input
                                    className="input"
                                    type="string"
                                    placeholder=""
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
                                    type="description"
                                    placeholder="description"
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

export default postArticle;
