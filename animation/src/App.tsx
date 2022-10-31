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
            dragConstraints
            {/* 허용된 드래그 가능 영역에 제약 조건을 적용합니다.
dragConstraints 에는 드래그 가능한 컴포넌트의 가장자리 거리를 정의합니다. (드래그 가능한 영역에 가장자리에서 얼마만큼까지 허용할 것인지 지정)
```
// 픽셀 이용
< motion.div drag="x" dragConstraints={{ left: 0, right: 300 }}/ >

// ref이용
const MyComponent = () => {
const constraintsRef = useRef(null)

return (
< motion.div ref={constraintsRef}>
< motion.div drag dragConstraints={constraintsRef} />
< /motion.div>
)
}
```

dragSnapToOrigin: boolean
true인 경우 드래그 가능한 요소는 드래그를 놓을 때, 원점으로 다시 애니메이션됩니다.
dragSnapToOrigin={true}

dragElastic: DragElastic
외부 제약 조건에서 허용되는 이동 정도. 0 = 움직임 없음, 1 = 전체 움직임. 기본적으로 0.5로 설정됩니다. 움직임을 비활성화하기 위해 false로 설정할 수도 있습니다.
dragElastic={0.2}
 */}
            {/* https://www.framer.com/docs/gestures/#drag */}
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
