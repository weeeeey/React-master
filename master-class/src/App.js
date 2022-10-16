import styled from "styled-components";

const Father = styled.div`
    display: flex;
`;

const Input = styled.input.attrs({ required: true, minLength: 10 })`
    background-color: tomato;
`;

const App = () => {
    return (
        <Father as="header">
            {/* attrs 함수를 통해 속성값을 자동으로 부여 */}
            {/* HTML 요소를 확인해보면  */}
            {/* <input required minlength="10" class="sc-hBxehG eIyleZ"> */}
            {/* 라고 표시 됨 */}
            <Input />
            <Input />
            <Input />
            <Input />
        </Father>
    );
};

export default App;
