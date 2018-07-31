import React from "react";
import ReactDOM from "react-dom";
import registerServiceWorker from "./registerServiceWorker";

// react-dom (what we'll use here)
import { BrowserRouter } from "react-router-dom";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";

import "./assets/css/main.css";
import './assets/css/tachyon.css'

//Load Components
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import App from "./components/app/App";

//Load Reducers

import logger from "redux-logger";

//Store Declaration
const store = createStore(applyMiddleware(logger));

//Do ini
ReactDOM.render(
    <Provider store={store}>
        <div className="app">
            <BrowserRouter>
                <div>
                    <Header />

                    <App />

                    <Footer />
                </div>
            </BrowserRouter>
        </div>
    </Provider>,
    document.getElementById("root")
);

//Add Service Worker
registerServiceWorker();
