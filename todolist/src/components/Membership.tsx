import { useForm } from "react-hook-form";

interface IForm {
    email: string;
    firstName: string;
    lastName?: string; //필수가 아닌 값은 타입 정의시에 ? 넣어주면 됨
    userName: string;
    password: string;
    password1: string;

    extraError?: string;
}

const Membership = () => {
    const {
        register,
        watch,
        handleSubmit,
        setError,
        // Error message 설정
        formState: { errors },
    } = useForm<IForm>({ defaultValues: { email: "@naver.com" } });

    console.log(watch());

    const onVaild = (data: IForm) => {
        // onSubmit이 됐을떄 handleSubmit에 의해 실행됨
        // 이미 제출이 다 된거니까 값 비교 ㅇㅋ
        if (data.password !== data.password1) {
            setError(
                "password1",
                { message: "Password are not the same" },
                { shouldFocus: true }
            );
            // setError의 유용한 점: form에서 내가 고른 input 항목에 강제로 focus 시킬 수 있음
        }
        // 해킹 당하거나 서버 끊기면
        // setError("extraError", { message: "Server offline." });
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
                <span>{errors?.email?.message}</span>
                <input
                    //validate는 boolean을 리턴하는데 nicolas를 갖고 있지 않다면 true 리턴
                    // validate에 string을 리턴하면 그게 message에 들어감
                    // validate 안에 여러 함수 넣기 가능
                    // 비동기로 설정해서 서버에서 데이터 받아와서도 사용 가능
                    {...register("firstName", {
                        required: true,
                        // validate: (v) =>
                        //     v.includes("nico") ? "no nico allow" : true,
                        validate: {
                            noNico: (v) =>
                                v.includes("nico") ? "no nico" : true,
                            noWeee: (v) =>
                                v.includes("weee") ? "no weee" : true,
                        },
                    })}
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

                <span>{errors?.extraError?.message}</span>
            </form>
        </>
    );
};

export default Membership;
