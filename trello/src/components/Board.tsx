import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";
import CardComponent from "./CardComponent";

const Wrapper = styled.div`
    width: 300px;
    padding: 20px 10px;
    padding-top: 10px;
    background-color: ${(prop) => prop.theme.boardColor};
    border-radius: 5px;
    min-height: 200px;
    display: flex;
    flex-direction: column;
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
            ? "pink"
            : props.isDraggingFromThis
            ? "red"
            : "blue"};
    flex-grow: 1;
    transition: background-color 0.3s ease-in-out;
`;

const Board = ({ todos, boardId }: IBoardProps) => {
    return (
        <Wrapper>
            <Title>{boardId}</Title>
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
