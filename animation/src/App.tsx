import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
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
    const biggerBoxRef = useRef<HTMLDivElement>(null);
    return (
        <Wrapper>
            <BiggerBox ref={biggerBoxRef}>
                <SmallBox
                    // drag="x" 이렇게 지정하면 x축만 이동 가능
                    drag
                    // 드래그 끝나면 제자리로 돌아옴
                    dragSnapToOrigin
                    // 마우스 포인트를 그대로 따라오냐 마냐 조절 (0~1 사이값)
                    // 기본값은 0
                    dragElastic={0}
                    // 큰박스 요소안으로 갇혀두기 위한 용도
                    dragConstraints={biggerBoxRef}
                    variants={boxVars}
                    whileDrag="dragColor"
                    whileHover="hover"
                    whileTap="click"
                />
            </BiggerBox>
        </Wrapper>
    );
};

export default App;
