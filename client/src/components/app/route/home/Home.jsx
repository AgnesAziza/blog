import React, { Component } from "react";
import articlesService from "../../services/articlesService";

class Home extends Component {
    state = {articles:{docs:[]}};
    articlesService = new articlesService(this.props.history);

    componentWillMount(){
      this.articlesService.getArticles(1, (err, res) => {
        this.setState({articles: res});
        console.log(res);
      });
    }

    render() {
        return (
            <div>
                <h1 className="title"> Blog HQ</h1>
                <h2 className="subtitle">Un blog trop cool !</h2>
                {this.state.articles.docs.forEach((doc) => {
                  (<div>
                    <p>{doc.title}</p>
                  </div>)
                })}
                <button> Click on IT !</button>
            </div>
        );
    }
}

export default Home;
