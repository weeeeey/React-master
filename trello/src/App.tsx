import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

// https://github.com/atlassian/react-beautiful-dnd/blob/HEAD/docs/api/droppable.md
// https://github.com/atlassian/react-beautiful-dnd/blob/HEAD/docs/api/draggable.md

const App = () => {
    const onDragEnd = () => {};
    return (
        <>
            <DragDropContext onDragEnd={onDragEnd}>
                <div>
                    <Droppable droppableId="one">
                        {(magic) => (
                            <ul ref={magic.innerRef} {...magic.droppableProps}>
                                <Draggable draggableId="first" index={0}>
                                    {(magic) => (
                                        <li
                                            ref={magic.innerRef}
                                            {...magic.draggableProps}
                                        >
                                            {/*dragHandleProps은 이것이 선언된 덩어리를 drag했을때만 그것관 관련된 것들이 드래그 해짐  */}
                                            <span {...magic.dragHandleProps}>
                                                fire
                                            </span>
                                            One
                                        </li>
                                    )}
                                </Draggable>
                            </ul>
                        )}
                    </Droppable>
                </div>
            </DragDropContext>
        </>
    );
};

export default App;
