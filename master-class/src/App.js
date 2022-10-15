import styled from "styled-components";

const Father = styled.div`
    display: flex;
`;
const Box = styled.div`
    background-color: teal;
    width: 100px;
    height: 100px;
`;
const App = () => {
    return (
        <Father>
            <Box></Box>
            <Box style={{ background: "blue" }}></Box>
        </Father>
    );
};

export default App;
