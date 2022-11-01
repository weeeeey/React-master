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
`;
const Box = styled(motion.div)`
    width: 400px;
    height: 200px;
    background-color: rgba(255, 255, 255, 1);
    border-radius: 40px;
    position: absolute;
    top: 100px;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

// AnimatePresence

// AnimatePresence를 사용하면 React 트리에서 컴포넌트가 제거될 때 제거되는 컴포넌트에 애니메이션 효과를 줄 수 있습니다. React에는 다음과 같은 수명 주기 메서드가 없기 때문에 종료 애니메이션을 활성화해야 합니다.

// exit
// 이 컴포넌트가 트리에서 제거될 때 애니메이션할 대상입니다.
// ```
// import { motion, AnimatePresence } from "framer-motion"

// export const MyComponent = ({ isVisible }) => (
// < AnimatePresence>
// {isVisible && (
// initial={{ opacity: 0 }}
// animate={{ opacity: 1 }}
// exit={{ opacity: 0 }}
// />
// )}
// < /AnimatePresence>
// )
// ```
// https://www.framer.com/docs/animate-presence/

const boxVar = {
    initial: {
        opacity: 0,
        scale: 0,
    },
    visible: {
        opacity: 1,
        scale: 1,
        rotateZ: 360,
    },
    leaving: {
        opacity: 0,
        scale: 0,
        y: 50,
    },
};

const App = () => {
    const [showing, setShowing] = useState(false);
    const toggleShowing = () => setShowing((prev) => !prev);
    return (
        <Wrapper>
            <button onClick={toggleShowing}>Click</button>
            {/* AnimatePresence 는 항상 visible 해야함 (그래서 밑에 조건문을 children으로 작성 ) */}
            {/* AnimatePresence는 안쪽에 나타나거나 사라지는게 있으면 그걸 animate 해줌 */}
            {/* 일반 react에서는 불가능한걸 AnimatePresence로 가능하게 해주는거 */}
            <AnimatePresence>
                {showing ? (
                    <Box
                        variants={boxVar}
                        initial="initial"
                        animate="visible"
                        exit="leaving"
                    />
                ) : null}
            </AnimatePresence>
        </Wrapper>
    );
};

export default App;
