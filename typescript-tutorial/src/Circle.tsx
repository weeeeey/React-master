import styled from "styled-components";

// interface란 object shape을 타입 스크립트에게 설명해주는
// 타입스크립트의 개념
interface CircleProps {
    bgColor: string;
}

const Container = styled.div<CircleProps>`
    width: 200px;
    height: 200px;
    background-color: ${(props) => props.bgColor};
    border-radius: 100px;
`;

const Circle = ({ bgColor }: CircleProps) => {
    return <Container bgColor={bgColor} />;
};
// interface PlayerShape {
//     name: string;
//     age: number;
// }
// const sayHello = (playerobj: PlayerShape) =>
//     `Hello ${playerobj.name} you are ${playerobj.age}`;

export default Circle;
