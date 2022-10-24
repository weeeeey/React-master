import { useForm } from "react-hook-form";
import {
    atom,
    useRecoilState,
    useRecoilValue,
    useSetRecoilState,
} from "recoil";

interface IForm {
    todo: string;
}
interface ITodo {
    text: string;
    id: number;
    category: "TO_DO" | "DOING" | "DONE";
}

const todoState = atom<ITodo[]>({
    key: "todo",
    default: [],
});

const TodoList = () => {
    const [todos, setTodos] = useRecoilState(todoState);
    // useRecoilValue,useSetRecoilState 합친거
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<IForm>();
    // handleValid는 data를 받아와서 data.todo로 접근. 그걸 풀어서 파라미터에 넣음
    const handleValid = ({ todo }: IForm) => {
        setTodos((oldTodos) => [
            { text: todo, id: Date.now(), category: "TO_DO" },
            ...oldTodos,
        ]);
        setValue("todo", "");
    };
    console.log();
    return (
        <>
            <h1>To do List </h1>
            <hr />
            <form onSubmit={handleSubmit(handleValid)}>
                <input
                    {...register("todo", {
                        required: "you must to input todo",
                    })}
                    placeholder="할 일 적어용 "
                />
                <div></div>
                <span>{errors.todo?.message}</span>
                <button>Add</button>
            </form>
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id}>{todo.text}</li>
                ))}
            </ul>
        </>
    );
};

export default TodoList;
