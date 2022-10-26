import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import React from "react";

const Card = styled.div<{ isDragging: boolean }>`
    border-radius: 5px;
    margin-bottom: 5px;
    padding: 10px;
    background-color: ${(props) =>
        props.isDragging ? "#e4f2ff" : props.theme.cardColor};
    box-shadow: ${(props) =>
        props.isDragging ? "0px 2px 5px rgba(0,0,0,0.5)" : "none"};
`;

interface IDraggableProps {
    todo: string;
    index: number;
}
const CardComponent = ({ todo, index }: IDraggableProps) => {
    return (
        <Draggable draggableId={todo} index={index}>
            {(magic, snapshot) => (
                <Card
                    isDragging={snapshot.isDragging}
                    ref={magic.innerRef}
                    {...magic.draggableProps}
                    {...magic.dragHandleProps}
                >
                    {todo}
                </Card>
            )}
        </Draggable>
    );
};

export default React.memo(CardComponent);
// React.memo로 감싸주면서 변화가 일어나는 컴포넌트만 리렌더링 해줌
// 해주지 않을시 대용량 데이터를 dnd 하면서 버벅임 발생(모든걸 다 리렌더링 해줘서)
