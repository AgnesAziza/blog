import HttpService from "./HttpService";

class articlesService extends HttpService {
    getArticles(pages, callback) {
        this.request(
            {
                url: this.base_url + "/articles/p/" + pages,
                method: "GET"
            },
            (err, resp) => {
                callback(err, resp);
            }
        );
    }

    postArticles(state, callback) {
        this.request(
            {
                url: this.base_url + "/articles/",
                method: "POST",
                form: {
                  title: state.title,
                  description: state.description,
                }
            },
            (err, resp) => {
                callback(err, resp);
            }
        );
    }
    getArticlesbyId( id, callback) {
        this.request(
            {
                url: this.base_url + "/articles/i/" + id,
                method: "GET"
            },
            (err, resp) => {
                callback(err, resp);
            }
        );
    }
    putArticlesbyId( id, callback) {
        this.request(
            {
                url: this.base_url + "/articles/i/" + id,
                method: "PUT"
            },
            (err, resp) => {
                callback(err, resp);
            }
        );
    }

    deleteArticles( id, callback) {
        this.request(
            {
                url: this.base_url + "/articles/i/" + id,
                method: "DELETE"
            },
            (err, resp) => {
                callback(err, resp);
            }
        );
    }
}


export default articlesService;
