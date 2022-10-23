import { useForm } from "react-hook-form";

interface ITodo {
    todo: string;
}

const TodoList = () => {
    const { register, handleSubmit, setValue } = useForm<ITodo>();
    const onValid = (data: ITodo) => {
        console.log("add to do", data?.todo);
        setValue("todo", "");
    };

    return (
        <form onSubmit={handleSubmit(onValid)}>
            <input
                {...register("todo", { required: "input value" })}
                placeholder="할 일 적어용 "
            />
        </form>
    );
};

export default TodoList;
