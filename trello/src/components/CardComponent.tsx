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
    todoId: number;
    todoText: string;
    index: number;
}

// {id:1,text:"hi"}, {id:2,text:"hello"}

// Uncaught Error: Objects are not valid as a React child (found: object with keys {id, text}). If you meant to render a collection of children, use an array instead.

// DroppableBoard(Board)에서 DraggableCard(Card)로 props를 전달할 때 todo 객체를 통채로 보내면 위와 같은 에러가 발생할 수 있으므로 객체에서 값을 꺼내서 따로따로 보내야 합니다.
// todo={todo} (X)
// todoId={todo.id} todoText={todo.text} (O)

const CardComponent = ({ todoId, todoText, index }: IDraggableProps) => {
    return (
        // number + "" => string,   draggabledId 는 string 형식
        <Draggable draggableId={todoId + ""} index={index}>
            {(magic, snapshot) => (
                <Card
                    isDragging={snapshot.isDragging}
                    ref={magic.innerRef}
                    {...magic.draggableProps}
                    {...magic.dragHandleProps}
                >
                    {todoText}
                </Card>
            )}
        </Draggable>
    );
};

export default React.memo(CardComponent);
// React.memo로 감싸주면서 변화가 일어나는 컴포넌트만 리렌더링 해줌
// 해주지 않을시 대용량 데이터를 dnd 하면서 버벅임 발생(모든걸 다 리렌더링 해줘서)
