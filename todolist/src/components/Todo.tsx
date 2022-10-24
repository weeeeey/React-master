import { ITodo, todoState, Categories } from "./atoms";
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
            if (name === Categories.DELETE) {
                return [
                    ...oldTodos.slice(0, targetIndex),
                    ...oldTodos.slice(targetIndex + 1),
                ];
            }
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
            {category !== Categories.DOING && (
                <button name={Categories.DOING} onClick={onClick}>
                    Doing
                </button>
            )}
            {category !== Categories.TO_DO && (
                <button name={Categories.TO_DO} onClick={onClick}>
                    To do
                </button>
            )}
            {category !== Categories.DONE && (
                <button name={Categories.DONE} onClick={onClick}>
                    DONE
                </button>
            )}
            {category !== Categories.DELETE && (
                <button name={Categories.DELETE} onClick={onClick}>
                    DELETE
                </button>
            )}
        </li>
    );
};

export default Todo;
