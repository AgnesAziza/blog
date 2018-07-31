import requestPKG from "request";

class HttpService {
    constructor(history) {
        this.history = history;

        if (process.env.NODE_ENV === "production") {
            this.base_url = "http://localhost:8080/api";
        } else {
            this.base_url = "http://localhost:8080/api";
        }
    }

    request(options, callback) {
        let optionsRequest = options;
        //Check if Token is available
        if (localStorage.getItem("tokenAuth")) {
            optionsRequest = {
                headers: {
                    Authorization: localStorage.getItem("tokenAuth")
                },
                ...optionsRequest
            };
        }

        requestPKG(optionsRequest, (err, response, body) => {
            this.parseRequest(err, response, body, (newErr, newBody) => {
                callback(newErr, newBody);
            });
        });
    }

    checkTokenExpiration(body, callback) {
        try {
            const json = JSON.parse(body);
            if (
                json &&
                json.error &&
                json.error === "Token Error, Please Renew Your Token !"
            ) {
                localStorage.removeItem("tokenAuth");
                this.history.push("/users/signin");
            } else {
                callback();
            }
        } catch (err) {
            console.log("FATAL ERROR - IMPOSSIBLE TO PARSE JSON");
        }
    }

    parseRequest(err, response, body, callback) {
        if (err) {
            console.log("FATAL ERROR - API NOT ONLINE !");
            return;
        }
        this.checkTokenExpiration(body, () => {
            try {
                const json = JSON.parse(body);
                if (response.statusCode.toString().startsWith(2)) {
                    callback(undefined, json);
                } else {
                    callback(json, undefined);
                }
            } catch (err) {
                console.log("FATAL ERROR - IMPOSSIBLE TO PARSE JSON ");
            }
        });
    }
}
export default HttpService;
