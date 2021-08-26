"use strict";

import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import store from "./redux";
import "./styles/index.css";

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.querySelector('#root'));

    
