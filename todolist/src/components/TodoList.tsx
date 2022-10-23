import { useForm } from "react-hook-form";

interface IMembershipForm {
    email: string;
    firstName: string;
    lastName: string;
    userName: string;
    password: string;
    password1: string;
}

const TodoList = () => {
    const { register, watch } = useForm<IMembershipForm>();
    // resister() 함수를 통해 각 입력란을 등록
    // register 함수의 결과값 name,onChange,onBlur,ref를 input element에 손쉽게 넣어줌
    // register 함수의 결과값인 required, maxLength,minLength, max,min,patter 등을 react-hook-form에게 정보를 줌으로 여러 작업 수행
    // onBlur란 특정 input을 클릭하면 focus인거고, 바깥쪽을 누르면 그 상태를 Blur라고 함

    // watch는 내가 form의 입력값들의 변화를 관찰 할 수 있게 해줌
    // console.log(watch("email")); 빈 인자를 주면 register로 등록한 input 변화값들 다 보여줌
    console.log(watch());
    return (
        <>
            <form style={{ display: "flex", flexDirection: "column" }}>
                <input {...register("email")} placeholder="Email" />
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
