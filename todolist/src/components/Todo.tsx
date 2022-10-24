import { ITodo, todoState } from "./atoms";
import { useSetRecoilState } from "recoil";
import React from "react";

const Todo = ({ text, category, id }: ITodo) => {
    const setTodo = useSetRecoilState(todoState);
    const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        const {
            currentTarget: { name },
        } = e;
        setTodo((oldTodos) => {
            const targetIndex = oldTodos.findIndex((todo) => todo.id === id);
            const newTodo = { text, id, category: name as any };
            return [
                ...oldTodos.slice(0, targetIndex),
                newTodo,
                ...oldTodos.slice(targetIndex + 1),
            ];
        });
    };
    return (
        <li>
            <span>{text}</span>
            {category !== "DOING" && (
                <button name="DOING" onClick={onClick}>
                    Doing
                </button>
            )}
            {category !== "TO_DO" && (
                <button name="TO_DO" onClick={onClick}>
                    To do
                </button>
            )}
            {category !== "DONE" && (
                <button name="DONE" onClick={onClick}>
                    DONE
                </button>
            )}
        </li>
    );
};

export default Todo;
