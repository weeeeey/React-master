import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";
import CardComponent from "./CardComponent";
import { useRef } from "react";

const Wrapper = styled.div`
    width: 300px;
    padding-top: 10px;
    background-color: ${(prop) => prop.theme.boardColor};
    border-radius: 5px;
    min-height: 200px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
`;
const Title = styled.h2`
    text-align: center;
    font-weight: 600;
    margin-bottom: 10px;
    font-size: 18px;
`;
interface IBoardProps {
    todos: string[];
    boardId: string;
}
interface IAreaProps {
    isDraggingFromThis: boolean;
    isDraggingOver: boolean;
}

const Area = styled.div<IAreaProps>`
    background-color: ${(props) =>
        props.isDraggingOver
            ? "#dfe6e9"
            : props.isDraggingFromThis
            ? "#b2bec3"
            : "transparent"};
    flex-grow: 1;
    transition: background-color 0.3s ease-in-out;
    padding: 20px;
`;

const Board = ({ todos, boardId }: IBoardProps) => {
    const inputRef = useRef<HTMLInputElement>(null);
    // ref를 통해 HTML 요소에 접근 가능해짐
    const onClick = () => {
        // click을 하면 inputRef에 등록된 HTML 요소로 접근해서 함수들을 실행함
        // focus 는 포인터를 그쪽으로 가르킴
        inputRef.current?.focus();
        // blur는 포인터를 벗어나게 함
        setTimeout(() => {
            inputRef.current?.blur();
        }, 3000);
    };
    return (
        <Wrapper>
            <Title>{boardId}</Title>
            <input ref={inputRef} placeholder="입력하세요" />
            <button onClick={onClick}>Click me!</button>
            <Droppable droppableId={boardId}>
                {(magic, info) => (
                    <Area
                        isDraggingOver={info.isDraggingOver}
                        isDraggingFromThis={Boolean(info.draggingFromThisWith)}
                        ref={magic.innerRef}
                        {...magic.droppableProps}
                    >
                        {todos.map((todo, index) => (
                            <CardComponent
                                key={todo}
                                index={index}
                                todo={todo}
                            />
                        ))}
                        {magic.placeholder}
                    </Area>
                )}
            </Droppable>
        </Wrapper>
    );
};

export default Board;
