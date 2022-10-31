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
    background-color: white;
    border-radius: 15px;
    box-shadow: 0 2px 30px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

// Variants

// Variants은 컴포넌트가 가질 수 있는 미리 정의된 시각적 state입니다.
// ```
// const variants = {
// visible: { opacity: 1 },
// hidden: { opacity: 0 },
// }
// motion.div initial="hidden" animate="visible" variants={variants}
// ```
// https://www.framer.com/docs/introduction/##variants

const myVars = {
    start: { scale: 0 },
    end: {
        scale: 1,
        rotateZ: 360,
        transition: { type: "spring", duration: 1 },
    },
};
const App = () => {
    return (
        <>
            <Wrapper>
                {/* 선언한 객체를 variants에 적어두고 키값을 적어두면 알아서 접근해서 따옴 */}
                <Box variants={myVars} initial="start" animate="end" />
            </Wrapper>
        </>
    );
};

export default App;
