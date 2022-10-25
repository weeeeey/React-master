import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import styled from "styled-components";
import { todoState } from "./components/atoms";
import { useRecoilState } from "recoil";
import DraggableComponent from "./components/DraggableComponent";

const Wrapper = styled.div`
    display: flex;
    max-width: 480px;
    width: 100%;
    margin: 0 auto;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;
const Boards = styled.div`
    display: grid;
    width: 100vh;
    grid-template-columns: repeat(1, 1fr);

    padding: 20px 10px;
    padding-top: 30px;
    background-color: ${(prop) => prop.theme.boardColor};
    border-radius: 5px;
    min-height: 200px;
`;

const App = () => {
    const [todos, setTodo] = useRecoilState(todoState);
    const onDragEnd = ({ draggableId, destination, source }: DropResult) => {
        if (!destination) return;
        setTodo((oldTodo) => {
            const tempTodo = [...oldTodo];
            tempTodo.splice(source.index, 1);
            tempTodo.splice(destination.index, 0, draggableId);
            return tempTodo;
        });
    };
    return (
        <Wrapper>
            <DragDropContext onDragEnd={onDragEnd}>
                <div>
                    <Droppable droppableId="one">
                        {(magic) => (
                            <Boards
                                ref={magic.innerRef}
                                {...magic.droppableProps}
                            >
                                {todos.map((todo, index) => (
                                    <DraggableComponent
                                        key={todo}
                                        index={index}
                                        todo={todo}
                                    />
                                ))}
                                {magic.placeholder}
                            </Boards>
                        )}
                    </Droppable>
                </div>
            </DragDropContext>
        </Wrapper>
    );
};

export default App;
