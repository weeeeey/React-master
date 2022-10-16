// 다크 모드의 50%는 themes 에 관련되어 있음
// themes 기본적으로 color를 가지고있음
// 그래서 나중에 색을 바꾸고 싶을떄
// 컴포넌트의 색을 일일이 바꾸는게 아니라
// object의 값만 바꿔주면 됨

import { useState } from "react";
import styled from "styled-components";
import { ThemeProvider } from "styled-components";

const darkTheme = {
    textColor: "whitesmoke",
    backgroundColor: "#111",
};
// 다크,라이틍 속성은 같아야함
const lightTheme = {
    textColor: "#111",
    backgroundColor: "#whitesmoke",
};

const Title = styled.h1`
    color: ${(props) => props.theme.textColor};
`;
const Wrapper = styled.div`
    display: flex;
    height: 100px;
    width: 100px;
    justify-content: center;
    align-items: center;
    background-color: ${(props) => props.theme.backgroundColor};
`;

const App = () => {
    const [mode, setMode] = useState("dark");
    const decideMode = () => {
        if (mode === "dark") {
            setMode("light");
        } else {
            setMode("dark");
        }
    };
    return (
        <ThemeProvider theme={mode === "dark" ? darkTheme : lightTheme}>
            <Wrapper>
                <Title onClick={decideMode}>Hello</Title>
            </Wrapper>
        </ThemeProvider>
    );
};

export default App;
