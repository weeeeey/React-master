import styled, { keyframes } from "styled-components";

const Wrapper = styled.div`
    display: flex;
`;
const rotationAnimation = keyframes`
    /* from {
        transform:rotate(0deg);
        border-radius:0px;
    }
    to {
        transform:rotate(360deg);
        border-radius:100px;
    } */
    0%{
        transform:rotate(0deg);
        border-radius:0px;
    }
    50%{
        transform:rotate(360deg);
        border-radius:100px;
    }
    100%{
        transform:rotate(0deg);
        border-radius:0px;
    }
`;
const Box = styled.div`
    display: flex;
    height: 200px;
    width: 200px;
    background-color: tomato;
    justify-content: center;
    align-items: center;
    animation: ${rotationAnimation} 5s linear infinite;
    /* 특정 selector 사용하기 */
    /* targeting */
    span {
        font-size: 36px;
        /* 특정 이벤트 등록 */
        /* 위에 마우스 올렸을떄 */
        &:hover {
            font-size: 72px;
        }
        /* 클릭하고 있으면 사라지고 떼면 다시 나타남 */
        &:active {
            opacity: 0;
        }
    }
`;

const App = () => {
    return (
        <Wrapper>
            <Box>
                <span>ggg</span>
            </Box>
        </Wrapper>
    );
};

export default App;
