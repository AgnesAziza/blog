import React, { Component } from "react";

class Signout extends Component {
    componentWillMount() {
        localStorage.removeItem("tokenAuth");
        this.props.history.push("/users/signin");
    }

    render() {
        return <div>Signout ...</div>;
    }
}

export default Signout;
