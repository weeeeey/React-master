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
        // 옮기는 아이템, 도착하는 장소, 출발 장소
        const { draggableId, destination, source } = info;
        // destination & source 에는 index와 droppableId 정보가 담겨있음
        // 각각의 droppableId 는 떨궈진 보드에 정보이므로

        // droppableId 가 같다는 것은 출발,도착 보드가 같다는 것
        if (destination?.droppableId === source.droppableId) {
            setTodo((allTodos) => {
                // 모든 보드를 다 긁어와서 해당되는 보드 전체 정보를 복사해서 조작
                const tempTodo = [...allTodos[source.droppableId]];
                tempTodo.splice(source.index, 1);
                tempTodo.splice(destination.index, 0, draggableId);
                return {
                    ...allTodos,
                    [source.droppableId]: tempTodo,
                };
            });
        }
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
