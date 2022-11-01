import React from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const Wrapper = styled(motion.div)`
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;
const Box = styled(motion.div)`
    width: 400px;
    height: 200px;
    background-color: rgba(255, 255, 255, 1);
    border-radius: 40px;
    position: absolute;
    top: 100px;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 28px;
`;

// AnimatePresence
// AnimatePresence의 단일 자식 key를 변경하여 슬라이드쇼(슬라이더)와 같은 컴포넌트를 쉽게 만들 수 있습니다.
// ```
// export const Slideshow = ({ image }) => (
// < AnimatePresence>
// key={image.src}
// src={image.src}
// initial={{ x: 300, opacity: 0 }}
// animate={{ x: 0, opacity: 1 }}
// exit={{ x: -300, opacity: 0 }}
// />
// < /AnimatePresence>
// )
// ```
// https://www.framer.com/docs/animate-presence/##unmount-animations

// Slider 예시 코드
// https://codesandbox.io/s/framer-motion-image-gallery-pqvx3?from-embed
const boxVar = {
    invisible: {
        x: 500,
        opacity: 0,
        scale: 0,
    },
    visible: {
        x: 0,
        opacity: 1,
        scale: 1,
        transition: {
            duration: 1,
        },
    },
    exit: {
        x: -500,
        opacity: 0,
        scale: 0,
        transition: {
            duration: 1,
        },
    },
};

const App = () => {
    const [visible, setVisible] = useState(1);
    const nextPlease = () =>
        setVisible((prev) => (prev === 10 ? 10 : prev + 1));
    const prevPlease = () => setVisible((prev) => (prev === 1 ? 1 : prev - 1));
    return (
        <Wrapper>
            <AnimatePresence>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) =>
                    i === visible ? (
                        <Box
                            variants={boxVar}
                            initial="invisible"
                            animate="visible"
                            exit="exit"
                            key={i}
                        >
                            {i}
                        </Box>
                    ) : null
                )}
            </AnimatePresence>
            <button onClick={nextPlease}>next</button>
            <button onClick={prevPlease}>prev</button>
        </Wrapper>
    );
};

export default App;
