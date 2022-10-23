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
    const { register, watch, handleSubmit, formState } =
        useForm<IMembershipForm>();
    // handleSubmit : validation 담당
    // preventDefault도 담당 , 우리가 작성한 코드 진행하게 도와줌
    // 인자로 2개 받아옴. 하나는 데이터가 유효할 떄 호출 할 함수.
    // 다른 하나는 유효하지 않을떄 호출 할 함수(생략 가능)

    const onVaild = (data: any) => {
        console.log(data);
    };
    // formState를 통해 에러가 나는 state들을 볼 수 있음.
    // 그 객체 안에 각 에러들의 type(에러 나는 타입),message,ref 담겨있음
    console.log(formState.errors);

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
                <input
                    // required 는 데이터가 유효하진 검증 하기 위해 넣음
                    // input 자체의 required와 다른 점: 그것은 HTML에 의해 보호돼서 누군가 그 요소를 지울 수 있음
                    // required:true인 상태인데 입력하지 않고 제출하면
                    // 리액트 훅 폼이 해당 지점으로 커서를 focus 해줄거임
                    {...register("email", { required: true })}
                    placeholder="Email"
                />
                <input
                    {...register("firstName", { required: true })}
                    placeholder="firstName"
                />
                <input
                    {...register("lastName", { required: true, minLength: 5 })}
                    placeholder="lastName"
                />
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
                <input
                    {...register("password", {
                        required: "Your password is too short",
                        minLength: 5,
                    })}
                    placeholder="password"
                />
                <input
                    {...register("password1", { required: true, minLength: 8 })}
                    placeholder="password1"
                />
                <button>회원가입</button>
            </form>
        </>
    );
};

export default TodoList;
