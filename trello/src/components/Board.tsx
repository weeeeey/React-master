import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";
import CardComponent from "./CardComponent";

const Wrapper = styled.div`
    padding: 20px 10px;
    background-color: ${(prop) => prop.theme.boardColor};
    border-radius: 5px;
    min-height: 200px;
`;
interface IBoardProps {
    todos: string[];
    boardId: string;
}

const Board = ({ todos, boardId }: IBoardProps) => {
    return (
        <Droppable droppableId={boardId}>
            {(magic) => (
                <div
                    style={{ backgroundColor: "red" }}
                    ref={magic.innerRef}
                    {...magic.droppableProps}
                >
                    {todos.map((todo, index) => (
                        <CardComponent key={todo} index={index} todo={todo} />
                    ))}
                    {magic.placeholder}
                </div>
            )}
        </Droppable>
    );
};

export default Board;
