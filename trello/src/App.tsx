import { DragDropContext, DropResult } from "react-beautiful-dnd";
import styled from "styled-components";
import { todoState } from "./components/atoms";
import { useRecoilState } from "recoil";
import Board from "./components/Board";

const Wrapper = styled.div`
    display: flex;
    max-width: 680px;
    width: 100%;
    margin: 0 auto;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;
const Boards = styled.div`
    display: grid;
    width: 100%;
    gap: 10px;
    grid-template-columns: repeat(3, 1fr);
`;

const App = () => {
    const [todos, setTodo] = useRecoilState(todoState);
    const onDragEnd = ({ draggableId, destination, source }: DropResult) => {
        if (!destination) return;
        // setTodo((oldTodo) => {
        //     const tempTodo = [...oldTodo];
        //     tempTodo.splice(source.index, 1);
        //     tempTodo.splice(destination.index, 0, draggableId);
        //     return tempTodo;
        // });
    };
    return (
        <Wrapper>
            <DragDropContext onDragEnd={onDragEnd}>
                <Boards>
                    {Object.keys(todos).map((boardId) => (
                        <Board
                            boardId={boardId}
                            key={boardId}
                            todos={todos[boardId]}
                        />
                    ))}
                </Boards>
            </DragDropContext>
        </Wrapper>
    );
};

export default App;
