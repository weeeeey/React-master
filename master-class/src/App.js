import styled from "styled-components";

const Father = styled.div`
    display: flex;
`;

const Btn = styled.button`
    background-color: tomato;
    border: 0;
    border-radius: 15px;
`;

const App = () => {
    return (
        <Father as="header">
            <Btn> Log in </Btn>
            {/* Btn의 모든 것을 사용하면서 HTML 부분에서는 as 뒤에 정의된 a 태그임 */}
            {/* 이 부분의 HTML element를 확인해보면 a 태그로 바뀌어 있음*/}
            <Btn as="a" href="/">
                Log in
            </Btn>
        </Father>
    );
};

export default App;
