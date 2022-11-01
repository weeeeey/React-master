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

// custom
// 각 애니메이션 컴포넌트에 대해 동적 variants를 다르게 적용할 때 사용할 수 있는 사용자 지정 데이터입니다.
// ```
// const variants = {
// visible: (custom) => ({
// opacity: 1,
// transition: { delay: custom * 0.2 }
// })
// }

// < motion.div custom={0} animate="visible" variants={variants} />
// < motion.div custom={1} animate="visible" variants={variants} />
// < motion.div custom={2} animate="visible" variants={variants} />
// ```
// https://www.framer.com/docs/component/###custom

// exitBeforeEnter
// true로 설정하면 AnimatePresence는 한 번에 하나의 컴포넌트만 랜더링합니다. exiting중인 컴포넌트는 entering하는 컴포넌트가 렌더링되기 전에 exit 애니메이션을 완료합니다.
// ```
// < AnimatePresence exitBeforeEnter>
// < motion.div key={currentItem} exit={{ opacity: 0 }} />
// < /AnimatePresence>
// ```
// https://www.framer.com/docs/animate-presence/###exitbeforeenter

const boxVar = {
    entry: (isBack: boolean) => ({
        x: isBack ? -500 : 500,
        opacity: 0,
        scale: 0,
    }),
    center: {
        x: 0,
        opacity: 1,
        scale: 1,
        transition: {
            duration: 1,
        },
    },
    exit: (isBack: boolean) => ({
        x: isBack ? 500 : -500,
        opacity: 0,
        scale: 0,
        transition: {
            duration: 1,
        },
    }),
};

const App = () => {
    const [visible, setVisible] = useState(1);
    const [back, setBack] = useState(false);
    const nextPlease = () => {
        setBack(false);
        setVisible((prev) => (prev === 10 ? 10 : prev + 1));
    };
    const prevPlease = () => {
        setBack(true);
        setVisible((prev) => (prev === 1 ? 1 : prev - 1));
    };
    return (
        <Wrapper>
            <AnimatePresence custom={back}>
                <Box
                    custom={back}
                    variants={boxVar}
                    initial="entry"
                    animate="center"
                    exit="exit"
                    key={visible}
                >
                    {visible}
                </Box>
            </AnimatePresence>
            <button onClick={nextPlease}>next</button>
            <button onClick={prevPlease}>prev</button>
        </Wrapper>
    );
};

export default App;
