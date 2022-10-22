import { useForm } from "react-hook-form";

const TodoList = () => {
    const { register, watch } = useForm();
    // resister() 함수를 통해 각 입력란을 등록
    // register 함수의 결과값 name,onChange,onBlur,ref를 input element에 손쉽게 넣어줌
    // register 함수의 결과값인 required, maxLength,minLength, max,min,patter 등을 react-hook-form에게 정보를 줌으로 여러 작업 수행
    return (
        <>
            <form
                onSubmit={(e) => e.preventDefault()}
                style={{ display: "flex", flexDirection: "column" }}
            >
                <input
                    {...register("email", {
                        pattern: {
                            value: /^[a-zA-z]*$ /,
                            message: "비밀번호는 영어만 사용 가능",
                        },
                    })}
                    placeholder="Email"
                />
                <input {...register("firstName")} placeholder="firstName" />
                <input {...register("lastName")} placeholder="lastName" />
                <input {...register("userName")} placeholder="userName" />
                <input {...register("password")} placeholder="password" />
                <input {...register("password1")} placeholder="password1" />
                <button>회원가입</button>
            </form>
        </>
    );
};

export default TodoList;
