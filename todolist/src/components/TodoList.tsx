import Todo from "./Todo";
import CreateTodo from "./CreateTodo";
import { todoSelector, categoryState } from "./atoms";
import { useRecoilValue, useRecoilState } from "recoil";
import React from "react";

const TodoList = () => {
    const todos = useRecoilValue(todoSelector);
    const [category, setCategory] = useRecoilState(categoryState);
    const onInput = (e: React.FormEvent<HTMLSelectElement>) => {
        setCategory(e.currentTarget.value);
    };
    return (
        <>
            <h1>To do List </h1>
            <CreateTodo />
            <hr />
            <select value={category} onInput={onInput}>
                <option value="TO_DO">To do</option>
                <option value="DOING">Doing</option>
                <option value="DONE">Done</option>
            </select>
            {/* 현자 todos 값은 todoSelector에서 따오는거 */}
            {todos?.map((todo) => (
                <Todo key={todo.id} {...todo} />
            ))}
        </>
    );
};

export default TodoList;
