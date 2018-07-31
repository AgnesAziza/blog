import React, { Component } from "react";

class Page404 extends Component {
    goBack() {
        this.props.history.goBack();
    }

    render() {
        return (
            <div className="has-text-centered">
                <i className="fas fa-times fa-3x" /> <br />{" "}
                <h1 className="title">404 - Page Not Found</h1>
                <a onClick={() => this.goBack()} className="button">
                    Go Back !
                </a>
            </div>
        );
    }
}

export default Page404;
