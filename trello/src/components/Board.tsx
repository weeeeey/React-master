import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";
import CardComponent from "./CardComponent";
import { useRef } from "react";

const Wrapper = styled.div`
    width: 300px;
    padding-top: 10px;
    background-color: ${(prop) => prop.theme.boardColor};
    border-radius: 5px;
    min-height: 200px;
    display: flex;
    flex-direction: column;
    overflow: hidden;
`;
const Title = styled.h2`
    text-align: center;
    font-weight: 600;
    margin-bottom: 10px;
    font-size: 18px;
`;
interface IBoardProps {
    todos: string[];
    boardId: string;
}
interface IAreaProps {
    isDraggingFromThis: boolean;
    isDraggingOver: boolean;
}

const Area = styled.div<IAreaProps>`
    background-color: ${(props) =>
        props.isDraggingOver
            ? "#dfe6e9"
            : props.isDraggingFromThis
            ? "#b2bec3"
            : "transparent"};
    flex-grow: 1;
    transition: background-color 0.3s ease-in-out;
    padding: 20px;
`;

//     useRef()
// useRef는 .current 프로퍼티로 전달된 인자(initialValue)로 초기화된 변경 가능한 ref 객체를 반환합니다. 반환된 객체는 컴포넌트의 전 life cycle을 통해 유지될 것입니다.
// 일반적인 사용 사례는 자식에게 접근하는 경우입니다.
// 본질적으로 useRef는 .current 프로퍼티에 변경 가능한 값을 담고 있는 “상자”와 같습니다.

// ref 속성보다 useRef()가 더 유용합니다. 이 기능은 클래스에서 인스턴스 필드를 사용하는 방법과 유사한 어떤 가변값을 유지하는 데에 편리합니다.
// ```
// const inputEl = useRef(null);

// const onButtonClick = () => {
// // `current` points to the mounted text input element
// inputEl.current.focus();
// };

// < input ref={inputEl} type="text" / >
const Board = ({ todos, boardId }: IBoardProps) => {
    const inputRef = useRef<HTMLInputElement>(null);
    // ref를 통해 HTML 요소에 접근 가능해짐
    const onClick = () => {
        // click을 하면 inputRef에 등록된 HTML 요소로 접근해서 함수들을 실행함
        // focus 는 포인터를 그쪽으로 가르킴
        inputRef.current?.focus();
        // blur는 포인터를 벗어나게 함
        setTimeout(() => {
            inputRef.current?.blur();
        }, 3000);
    };
    return (
        <Wrapper>
            <Title>{boardId}</Title>
            <input ref={inputRef} placeholder="입력하세요" />
            <button onClick={onClick}>Click me!</button>
            <Droppable droppableId={boardId}>
                {(magic, info) => (
                    <Area
                        isDraggingOver={info.isDraggingOver}
                        isDraggingFromThis={Boolean(info.draggingFromThisWith)}
                        ref={magic.innerRef}
                        {...magic.droppableProps}
                    >
                        {todos.map((todo, index) => (
                            <CardComponent
                                key={todo}
                                index={index}
                                todo={todo}
                            />
                        ))}
                        {magic.placeholder}
                    </Area>
                )}
            </Droppable>
        </Wrapper>
    );
};

export default Board;
