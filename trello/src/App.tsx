import { DragDropContext, DropResult } from "react-beautiful-dnd";
import styled from "styled-components";
import { todoState } from "./components/atoms";
import { useRecoilState } from "recoil";
import Board from "./components/Board";

const Wrapper = styled.div`
    display: flex;
    max-width: 680px;
    width: 100vw;
    margin: 0 auto;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;
const DropBoards = styled.div`
    display: grid;
    /* justify-content: center;
    align-items: flex-start; */
    width: 100%;
    gap: 10px;
    grid-template-columns: repeat(3, 1fr);
`;

const App = () => {
    const [todos, setTodo] = useRecoilState(todoState);
    const onDragEnd = (info: DropResult) => {
        const { destination, source } = info;
        if (!destination) return;
        if (destination?.droppableId === source.droppableId) {
            setTodo((allTodos) => {
                const tempTodo = [...allTodos[source.droppableId]];
                const taskObj = tempTodo[source.index];
                tempTodo.splice(source.index, 1);
                tempTodo.splice(destination.index, 0, taskObj);
                return {
                    ...allTodos,
                    [source.droppableId]: tempTodo,
                };
            });
        }
        if (destination.droppableId !== source.droppableId) {
            setTodo((allBoards) => {
                const startTodo = [...allBoards[source.droppableId]];
                const taskObj = startTodo[source.index];
                const endTodo = [...allBoards[destination.droppableId]];
                startTodo.splice(source.index, 1);
                endTodo.splice(destination?.index, 0, taskObj);
                return {
                    ...allBoards,
                    [source.droppableId]: startTodo,
                    [destination?.droppableId]: endTodo,
                };
            });
        }
    };
    return (
        <Wrapper>
            <DragDropContext onDragEnd={onDragEnd}>
                <DropBoards>
                    {Object.keys(todos).map((boardId) => (
                        <Board
                            boardId={boardId}
                            key={boardId}
                            todos={todos[boardId]}
                        />
                    ))}
                </DropBoards>
            </DragDropContext>
        </Wrapper>
    );
};

export default App;
