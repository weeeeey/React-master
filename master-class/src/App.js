import styled from "styled-components";

const Father = styled.div`
    display: flex;
`;
const Box = styled.div`
    background-color: teal;
    width: 100px;
    height: 100px;
    &.Son {
        background-color: red;
    }
`;
const App = () => {
    return (
        <Father>
            <Box className="Son"></Box>
            <Box></Box>
            <Box style={{ background: "blue" }}></Box>
        </Father>
    );
};

export default App;
