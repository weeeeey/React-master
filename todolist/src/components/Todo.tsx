import { ITodo, todoState } from "./atoms";
import { useSetRecoilState } from "recoil";
import React from "react";

const Todo = ({ text, category, id }: ITodo) => {
    const setTodo = useSetRecoilState(todoState);
    const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        const {
            currentTarget: { name },
        } = e;
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
