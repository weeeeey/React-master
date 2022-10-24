import Todo from "./Todo";
import CreateTodo from "./CreateTodo";
import { todoSelector, todoState } from "./atoms";
import { useRecoilValue } from "recoil";

const TodoList = () => {
    const [todo, doing, done] = useRecoilValue(todoSelector); //각각의 받아온 배열들을 이름으로 분할
    console.log(todo);
    console.log(doing);
    console.log(done);
    return (
        <>
            <h1>To do List </h1>
            <hr />
            <CreateTodo />
            <ul>
                <h2>TO_DO</h2>
                {todo?.map((todo) => (
                    <Todo key={todo.id} {...todo} />
                ))}
                <hr />
                <h2>DOING</h2>
                {doing?.map((todo) => (
                    <Todo key={todo.id} {...todo} />
                ))}
                <hr />
                <h2>DONE</h2>
                {done?.map((todo) => (
                    <Todo key={todo.id} {...todo} />
                ))}
            </ul>
        </>
    );
};

export default TodoList;
