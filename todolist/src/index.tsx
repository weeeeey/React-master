import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider } from "styled-components";
import { blackTheme } from "./components/Theme";
import { RecoilRoot } from "recoil";
import { Helmet } from "react-helmet";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <RecoilRoot>
        <ThemeProvider theme={blackTheme}>
            <Helmet>
                <title>To Do</title>
            </Helmet>
            <App />
        </ThemeProvider>
    </RecoilRoot>
);

reportWebVitals();
