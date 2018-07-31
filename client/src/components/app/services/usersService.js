import HttpService from "./HttpService";

class usersService extends HttpService {
    signin(login, password, callback) {
        this.request(
            {
                url: this.base_url + "/users/signin",
                method: "POST",
                form: {
                    email: login,
                    password
                }
            },
            (err, resp) => {
                callback(err, resp);
            }
        );
    }

    signup(state, callback) {
        this.request(
            {
                url: this.base_url + "/users/signup",
                method: "POST",
                form: {
                    email: state.email,
                    password: state.password,
                    nom: state.nom,
                    prenom: state.prenom
                }
            },
            (err, resp) => {
                callback(err, resp);
            }
        );
    }

    me(callback) {
        this.request(
            {
                url: this.base_url + "/users/me",
                method: "GET",
                headers: {
                    Authorization: localStorage.getItem("tokenAuth")
                }
            },
            (err, resp) => {
                callback(err, resp);
            }
        );
    }

    updateProfile(data, callback) {
        this.request(
            {
                url: this.base_url + "/users",
                method: "PUT",
                headers: {
                    Authorization: localStorage.getItem("tokenAuth")
                },
                form: {
                    nom: data.nom,
                    prenom: data.prenom
                }
            },
            (err, resp) => {
                callback(err, resp);
            }
        );
    }

    updatePassword(data, callback) {
        this.request(
            {
                url: this.base_url + "/users/changepassword",
                method: "PUT",
                headers: {
                    Authorization: localStorage.getItem("tokenAuth")
                },
                form: {
                    password: data.password,
                    oldpassword: data.oldpassword
                }
            },
            (err, resp) => {
                callback(err, resp);
            }
        );
    }
}

export default usersService;
