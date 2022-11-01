import React from "react";
import styled from "styled-components";
import { motion, useMotionValue, useTransform, useScroll } from "framer-motion";

const Wrapper = styled(motion.div)`
    height: 200vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const SmallBox = styled(motion.div)`
    width: 200px;
    height: 200px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    background-color: rgba(255, 255, 255, 1);
    border-radius: 40px;
    box-shadow: 0 2px 30px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

// useViewportScroll(): ScrollMotionValues
// 뷰포트가 스크롤될 때 업데이트되는 MotionValues를 리턴합니다.
// 아래 값들은 모두 MotionValue< number >를 넘겨줍니다.
// scrollX: 실제 수평 스크롤 픽셀 ex) 500px
// scrollY: 실제 수직 스크롤 픽셀 ex) 500px
// scrollXProgress : 0 ~ 1 사이의 수평 스크롤
// scrollYProgress : 0 ~ 1 사이의 수직 스크롤(가장 상단 0, 가장 하단 1)
// ```
// export const MyComponent = () => {
// const { scrollYProgress } = useViewportScroll()
// return < motion.div style={{ scaleX: scrollYProgress }} />
// }
// ```
// https://www.framer.com/docs/motionvalue/##useviewportscroll

const App = () => {
    const x = useMotionValue(0);
    const potato = useTransform(x, [-800, 0, 800], [-360, 0, 360]);
    const gradient = useTransform(
        x,
        [-800, 800],
        [
            "linear-gradient(135deg, rgb(0, 210, 238), rgb(0, 83, 238))",
            "linear-gradient(135deg, rgb(0, 238, 155), rgb(238, 178, 0))",
        ]
    );
    const { scrollYProgress } = useScroll();
    const scale = useTransform(scrollYProgress, [0, 1], [1, 5]);
    return (
        <Wrapper style={{ background: gradient }}>
            <SmallBox
                // smallBox에 x를 선언한건 x의 위치를 변수 x에 저장하기 위함
                // scale은 scrollYProgress에 의존하므로 스크롤에 따라 크기 달라짐
                style={{ x, rotateZ: potato, scale }}
                drag="x"
                dragSnapToOrigin
            />
        </Wrapper>
    );
};

export default App;
