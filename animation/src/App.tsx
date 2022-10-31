import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const Wrapper = styled(motion.div)`
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Box = styled(motion.div)`
    width: 200px;
    height: 200px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    background-color: rgba(255, 255, 255, 0.2);
    border-radius: 40px;
    box-shadow: 0 2px 30px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Circle = styled(motion.div)`
    background-color: white;
    height: 70px;
    width: 70px;
    place-self: center;
    border-radius: 35px;
    box-shadow: 0 2px 30px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;
const boxVars = {
    start: { opacity: 0, scale: 0.5 },
    end: {
        scale: 1,
        opacity: 1,
        transition: {
            type: "spring",
            duration: 1,
            bounce: 0.5,
            delayChildren: 0.5,
            staggerChildren: 0.5,
            // Children들을 선언함으로써 엔진 자체에서 계산해가며
            // 선언된 자식들의 순차대로 적용시켜줌
        },
    },
};

const CircleVars = {
    start: {
        opacity: 0,
        y: 0,
    },
    end: {
        opacity: 1,
        y: 10,
    },
};
const App = () => {
    return (
        <>
            <Wrapper>
                {/* 부모에서 variants 객체 사용하면서 initial과 animation을 사용하고 있을때
                    자식에 선언된 variants 안의 키값들이 부모와 같은 이름이라면 따로
                    선언하지 않더라도 자동으로 적용된다.
                 */}
                <Box variants={boxVars} initial="start" animate="end">
                    <Circle variants={CircleVars} />
                    <Circle variants={CircleVars} />
                    <Circle variants={CircleVars} />
                    <Circle variants={CircleVars} />
                </Box>
            </Wrapper>
        </>
    );
};

export default App;
