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
const Emoji = styled.span`
    font-size: 36px;
    &:active {
        opacity: 0;
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
    ${Emoji} {
        &:hover {
            font-size: 72px;
        }
    }
`;

const App = () => {
    return (
        <div>
            <Wrapper>
                <Box>
                    {/* Box안을 단순하게 Emoji로 했다면 as를 사용해쓸시 적용 안됨
                    하지만 ${tagName} 를 사용한다면 적용 가능 */}
                    <Emoji as="div">ggg</Emoji>
                </Box>
            </Wrapper>
            {/* Box 밖이므로 hover 적용 안됨 */}
            <Emoji>sdsd</Emoji>
        </div>
    );
};

export default App;
