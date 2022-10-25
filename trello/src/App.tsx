import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";

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
    width: 100%;
    grid-template-columns: repeat(1, 1fr);

    padding: 20px 10px;
    padding-top: 30px;
    background-color: ${(prop) => prop.theme.boardColor};
    border-radius: 5px;
    min-height: 200px;
`;
const Card = styled.div`
    border-radius: 5px;
    margin-bottom: 5px;
    padding: 10px 10px;
    background-color: ${(props) => props.theme.cardColor};
`;

const todos = ["a", "b", "c", "d", "e", "f"];

const App = () => {
    const onDragEnd = () => {};
    return (
        <Wrapper>
            <DragDropContext onDragEnd={onDragEnd}>
                <div>
                    <Droppable droppableId="one">
                        {/* 우클릭 형식(type) 정의로 가서 props 정보 볼 수 있음 */}
                        {/* 컨트롤 누른 채 우클릭 하면 쓰인 곳 함수 볼 수 있음 */}
                        {(magic) => (
                            <Boards
                                ref={magic.innerRef}
                                {...magic.droppableProps}
                            >
                                {todos.map((todo, index) => (
                                    <Draggable draggableId={todo} index={index}>
                                        {(magic) => (
                                            <Card
                                                ref={magic.innerRef}
                                                {...magic.draggableProps}
                                                {...magic.dragHandleProps}
                                            >
                                                {todo}
                                            </Card>
                                        )}
                                    </Draggable>
                                ))}
                                {magic.placeholder}
                                {/* 위의 문장을 작성해주면 드래그시에도Board의 크기 변화 x */}
                            </Boards>
                        )}
                    </Droppable>
                </div>
            </DragDropContext>
        </Wrapper>
    );
};

export default App;
