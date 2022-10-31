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
    background-color: white;
    border-radius: 40px;
    box-shadow: 0 2px 30px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const boxVars = {
    hover: { scale: 1.5, rotateZ: 90 },
    click: { scale: 1, borderRadius: "100px" },
};

const App = () => {
    return (
        <>
            <Wrapper>
                {/* <Box
                    whileHover={{ scale: 1.5, rotateZ: 90 }}
                    whileTap={{ scale: 1, borderRadius: "100px" }}
                /> */}
                <Box variants={boxVars} whileHover="hover" whileTap="click" />
            </Wrapper>
        </>
    );
};

export default App;
