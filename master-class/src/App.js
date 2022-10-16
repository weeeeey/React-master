import styled from "styled-components";

const Father = styled.div`
    display: flex;
`;
const Box = styled.div`
    /* props 있으면 자동으로 클래스 네임 생성  */
    background-color: ${(props) => props.bgColor};
    width: 100px;
    height: 100px;
`;
// 다른 태그의 속성을 모두 가져오면서 속성 추가해주는 방법
// extending
const Circle = styled(Box)`
    border-radius: 50px;
`;
const App = () => {
    return (
        <Father>
            <Box bgColor="teal"></Box>
            <Circle bgColor="tomato"></Circle>
        </Father>
    );
};

export default App;
