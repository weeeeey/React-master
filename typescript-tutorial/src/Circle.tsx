import { useState } from "react";
import styled from "styled-components";

interface CircleProps {
    bgColor: string;
    borderColor?: string;
}
interface ContainerProps {
    bgColor: string;
    borderColor: string;
}
const Container = styled.div<ContainerProps>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 200px;
    height: 200px;
    background-color: ${(props) => props.bgColor};
    border-radius: 100px;
    border: 10px solid ${(props) => props.borderColor};
`;

const Circle = ({ bgColor, borderColor }: CircleProps) => {
    const [value, setValue] = useState([""]);
    return <Container bgColor={bgColor} borderColor={borderColor ?? bgColor} />;
};

export default Circle;
