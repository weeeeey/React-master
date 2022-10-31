import React, { useEffect } from "react";
import styled from "styled-components";
import { motion, useMotionValue } from "framer-motion";
import { useRef } from "react";

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

const App = () => {
    const x = useMotionValue(0);
    // console.log(x) 이것을 선언하더라도 Motion은 재랜더링을 하지 않아서
    // 콘솔창에 x 값을 보여주지 않음

    useEffect(() => {
        x.onChange(() => console.log(x.get()));
    }, [x]);

    return (
        <Wrapper>
            {/* <SmallBox style={{x:x}} drag='x' dragSnapToOrigin /> */}
            {/* 해당되는 컴포넌트의 x값 좌표를 계속 추적할 수 있음 */}

            <SmallBox style={{ x }} drag="x" dragSnapToOrigin />
            {/* x 값을 추적할 수 있으므로 세팅도 가능해짐 */}
            <button onClick={() => x.set(-200)}>click me!</button>
        </Wrapper>
    );
};

export default App;
