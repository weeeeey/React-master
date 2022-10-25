import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const App = () => {
    const onDragEnd = () => {};
    return (
        <>
            {/* DragDropContext 컴포넌트에는 onDragEnd 함수와 children이 필요함 */}
            {/* onDragEnd는 드래그가 끝났을때 실행할 함수 */}
            {/* children은 컴포넌트면 됨 */}
            <DragDropContext onDragEnd={onDragEnd}>
                <div>
                    {/* Droppable 요소에는 Id와 children이 필요함 */}
                    {/* Id는 길을 잃지 않기 위해 필요 */}
                    {/* 여기에서는 children이 특이하게 함수 형태로 와야함 */}
                    {/* children 모습 {()=>(<div></div>)} */}
                    <Droppable droppableId="one">
                        {() => (
                            <ul>
                                {/* Draggable 요소에는 index, Id와 children이 필요함 */}
                                {/* index는 나중에 정렬 때 쓸 용도 */}
                                {/* Id는 길을 잃지 않기 위해 필요 */}
                                {/* 여기에서는 children이 특이하게 함수 형태로 와야함 */}
                                {/* children 모습 {()=>(<div></div>)} */}
                                <Draggable draggableId="first" index={0}>
                                    {() => <li>One</li>}
                                </Draggable>
                                <Draggable draggableId="second" index={1}>
                                    {() => <li>Two</li>}
                                </Draggable>
                            </ul>
                        )}
                    </Droppable>
                </div>
            </DragDropContext>
        </>
    );
};
