import {
    DragDropContext,
    Draggable,
    Droppable,
    DropResult,
} from "react-beautiful-dnd";
import styled from "styled-components";
import { todoState } from "./components/atoms";
import { useRecoilState } from "recoil";
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
const Card = styled.div`
    border-radius: 5px;
    margin-bottom: 5px;
    padding: 10px 10px;
    background-color: ${(props) => props.theme.cardColor};
`;

const App = () => {
    const [todos, setTodo] = useRecoilState(todoState);
    // const onDragEnd = (arg: any) => {
    //     console.log(arg);
    // 확인해보면 arg 에는 destination , source가 들어가있음
    // 둘다 drop하는 보드의 Id가 들어가 있고
    // index로 움직인(소스) 아이템과 도착한(데스티네이션) 위치 정보 있음
    // };
    const onDragEnd = ({ draggableId, destination, source }: DropResult) => {
        if (!destination) return;
        // detination이 비는 경우는 드래그 할려던걸 제자리에 두는 경우
        setTodo((oldTodo) => {
            const tempTodo = [...oldTodo];
            // splice는 해당 배열을 직접적으로 건드려서 복사해줘야함
            tempTodo.splice(source.index, 1);
            // splice(a,b) : a위치부터 b개를 지운다
            tempTodo.splice(destination.index, 0, draggableId);
            // splice(a,b,c) : a위치부터 b개를 지우고 c로 그 자리를 채운다
            // splice(a,0,c) : a위치에 c를 채운다
            // draggableId 에 todo를 넣어줬었음
            return tempTodo;
        });
    };
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
                                    <Draggable
                                        key={todo}
                                        draggableId={todo}
                                        index={index}
                                    >
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

                                {/* provided.placeholder (?ReactElement)
Draggable 엘리먼트를 드래그하는 동안 position: fixed(영역을 고정시킴)를 적용합니다.
Draggable을 드래그할 때 Droppable 리스트가 작아지는 것을 방지하기 위해 필요합니다.
Draggable 노드의 형제로 렌더링하는 것이 좋습니다. */}
                            </Boards>
                        )}
                    </Droppable>
                </div>
            </DragDropContext>
        </Wrapper>
    );
};

export default App;
