import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { theme } from "./theme";
import { ThemeProvider } from "styled-components";

import { QueryClient, QueryClientProvider } from "react-query";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);

const quetyClient = new QueryClient();

root.render(
    // 단순하게 리액트 쿼리를 설치후 적용 시킨것
    <QueryClientProvider client={quetyClient}>
        <ThemeProvider theme={theme}>
            <App />
        </ThemeProvider>
    </QueryClientProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
