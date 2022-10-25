import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import React from "react";

const Card = styled.div`
    border-radius: 5px;
    margin-bottom: 5px;
    padding: 10px 10px;
    background-color: ${(props) => props.theme.cardColor};
`;

interface IDraggableProps {
    todo: string;
    index: number;
}
const CardComponent = ({ todo, index }: IDraggableProps) => {
    return (
        <Draggable key={todo} draggableId={todo} index={index}>
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
    );
};

export default React.memo(CardComponent);
// React.memo로 감싸주면서 변화가 일어나는 컴포넌트만 리렌더링 해줌
// 해주지 않을시 대용량 데이터를 dnd 하면서 버벅임 발생(모든걸 다 리렌더링 해줘서)
