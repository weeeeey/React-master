import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

// Animation
// Framer Motion의 애니메이션은 모션 컴포넌트의 유연한 animate 속성을 통해 제어됩니다. 간단한 애니메이션의 경우 animate props에서 직접 값을 설정할 수 있습니다.
// ex) motion.div animate={{ rotate: 360 }} transition={{ duration: 2 }}
// https://www.framer.com/docs/animation

// initial: boolean | Target | VariantLabels (애니메이션의 초기값 지정)
// 속성, 변형 레이블 또는 시작할 변형 레이블의 배열입니다.
// animate의 값으로 초기화하려면 false로 설정합니다(마운트 애니메이션 비활성화).
// https://www.framer.com/docs/component/###initial

// Transition
// Transition은 값이 한 상태에서 다른 상태로 움직이는 방식을 정의합니다.
// 또한 Tween, Spring 또는 Inertia를 사용할 애니메이션 유형을 정의하는 소품을 허용할 수 있습니다.
// ex) motion.div animate={{ rotate: 180 }} transition={{ type: 'spring' }}
// https://www.framer.com/docs/transition

// styled components를 animation에 입히는 방법
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

const App = () => {
    return (
        <>
            <Wrapper>
                <Box
                    transition={{ type: "spring", delay: 1 }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1, rotateZ: 360 }}
                />
            </Wrapper>
        </>
    );
};

export default App;
