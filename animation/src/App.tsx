import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
// animation 요소를 적용하고 싶으면
// motion 을 사용할떄는 단순하게 HTML 요소를 사용하는게 아닌
// motion.태그 를 사용
const Wrapper = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Box = styled.div`
    width: 200px;
    height: 200px;
    background-color: white;
    border-radius: 10px;
    box-shadow: 0 2px 30px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const App = () => {
    return (
        <>
            <Wrapper>
                <Box />
                <motion.div></motion.div>
            </Wrapper>
        </>
    );
};

export default App;
