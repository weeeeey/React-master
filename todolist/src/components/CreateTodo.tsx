import { useSetRecoilState } from "recoil";
import { todoState } from "./atoms";
import { useForm } from "react-hook-form";

interface IForm {
    todo: string;
}

const CreateTodo = () => {
    const setTodos = useSetRecoilState(todoState);
    // useRecoilValue,useSetRecoilState 합친거
    const { register, handleSubmit, setValue } = useForm<IForm>();
    // handleValid는 data를 받아와서 data.todo로 접근. 그걸 풀어서 파라미터에 넣음
    const handleValid = ({ todo }: IForm) => {
        setTodos((oldTodos) => [
            { text: todo, id: Date.now(), category: "TO_DO" },
            ...oldTodos,
        ]);
        setValue("todo", "");
    };
    return (
        <>
            <form onSubmit={handleSubmit(handleValid)}>
                <input
                    {...register("todo", {
                        required: "you must to input todo",
                    })}
                    placeholder="할 일 적어용 "
                />
                <button>Add</button>
            </form>
        </>
    );
};

export default CreateTodo;
