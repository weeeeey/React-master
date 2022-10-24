import Todo from "./Todo";
import CreateTodo from "./CreateTodo";
import { todoState } from "./atoms";
import { useRecoilValue } from "recoil";

const TodoList = () => {
    const todos = useRecoilValue(todoState);
    return (
        <>
            <h1>To do List </h1>
            <hr />
            <CreateTodo />
            <ul>
                {todos.map((todo) => (
                    <Todo key={todo.id} {...todo} />
                ))}
            </ul>
        </>
    );
};

export default TodoList;
