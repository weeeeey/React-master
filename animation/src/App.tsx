import React from "react";
import styled from "styled-components";
import { motion, useMotionValue, useTransform } from "framer-motion";

const Wrapper = styled(motion.div)`
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const BiggerBox = styled(motion.div)`
    width: 600px;
    height: 600px;
    background-color: rgba(255, 255, 255, 0.4);
    border-radius: 40px;
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

const boxVars = {
    hover: { rotateZ: 90 },
    click: { borderRadius: "100px" },
    dragColor: {
        backgroundColor: "rgba(46,204,113)",
        // rgba값이 아닌 blue, yellow 같이 스트링 값 넣으면 애니메이션 먹힐수있음
        transition: { duration: 2 },
    },
};

// useTransform

// useTransform 훅을 통해 MotionValues를 연결합니다.
// useTransform()는 한 값 범위에서 다른 값 범위로 매핑하여 다른 MotionValue의 output을 변환하는 MotionValue를 만듭니다.
// x(Motion Value)값을 다른 output값으로 변환해준다.
// ex) x: -400 => 1
// ```
// const x = useMotionValue(0)
// const input = [-200, 0, 200]
// const output = [0, 1, 0]
// const opacity = useTransform(x, input, output)

// return < motion.div drag="x" style={{ x, opacity }} />
// ```
// https://www.framer.com/docs/motionvalue/##usetransform

const App = () => {
    const x = useMotionValue(0);
    const potato = useTransform(x, [-800, 0, 800], [-360, 0, 360]);
    // x값이 -800,0,800 위치에서 potato값을 2,1,0,1 값으로 변화시킨다
    return (
        <Wrapper>
            <SmallBox
                style={{ x, rotateZ: potato }}
                drag="x"
                dragSnapToOrigin
            />
        </Wrapper>
    );
};

export default App;
