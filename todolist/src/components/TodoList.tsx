import { useForm } from "react-hook-form";

interface IForm {
    email: string;
    firstName: string;
    lastName?: string; //필수가 아닌 값은 타입 정의시에 ? 넣어주면 됨
    userName: string;
    password: string;
    password1: string;
}

const TodoList = () => {
    const {
        register,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm<IForm>({ defaultValues: { email: "@naver.com" } });

    const onVaild = (data: any) => {
        console.log(data);
    };
    return (
        <>
            <form
                onSubmit={handleSubmit(onVaild)}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "300px",
                }}
            >
                {/* 정규식을 이용해서 validation 검증 */}
                <input
                    {...register("email", {
                        required: true,
                        // pattern: /^[A-Za-z0-9._%+-]+@naver.com$/,
                        pattern: {
                            value: /^[A-Za-z0-9._%+-]+@naver.com$/,
                            message: "Only naver.com emails allowed",
                        },
                    })}
                    placeholder="Email"
                />
                <span style={{ border: "2px solid red" }}>
                    {errors?.email?.message}
                </span>
                <input
                    {...register("firstName", { required: true })}
                    placeholder="firstName"
                />
                <span style={{ border: "10px", borderBlockColor: "red" }}>
                    {errors?.firstName?.message}
                </span>
                <input
                    {...register("lastName", { required: true, minLength: 5 })}
                    placeholder="lastName"
                />
                <span style={{ borderBlockColor: "red" }}>
                    {errors?.lastName?.message}
                </span>
                <input
                    {...register("userName", {
                        required: true,
                        minLength: {
                            value: 5,
                            message: "Your Name is too short",
                        },
                    })}
                    placeholder="userName"
                />
                <span style={{ borderBlockColor: "red" }}>
                    {errors?.userName?.message}
                </span>
                <input
                    {...register("password", {
                        required: "Your password is too short",
                        minLength: 5,
                    })}
                    placeholder="password"
                />
                <span style={{ borderBlockColor: "red" }}>
                    {errors?.password?.message}
                </span>
                <input
                    {...register("password1", { required: true, minLength: 8 })}
                    placeholder="password1"
                />
                <span style={{ borderBlockColor: "red" }}>
                    {errors?.password1?.message}
                </span>
                <button>회원가입</button>
            </form>
        </>
    );
};

export default TodoList;
