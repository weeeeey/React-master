import { minuteState, hourSelector } from "./components/atoms";
import { useRecoilState } from "recoil";

const App = () => {
    const [minute, setMinutes] = useRecoilState(minuteState);
    const [hour, setHour] = useRecoilState(hourSelector);
    // Selector 요소를 useRecoilState로 불러올 경우
    // data 값은 get 옵션에 할당된거, setting 함수는 set 옵션에 할당된거 가져옴

    const onChangeMinute = (e: React.FormEvent<HTMLInputElement>) => {
        setMinutes(+e.currentTarget.value);
    };
    const onChangeHour = (e: React.FormEvent<HTMLInputElement>) => {
        setHour(+e.currentTarget.value);
    };
    return (
        <>
            <input
                value={minute}
                onChange={onChangeMinute}
                type="number"
                placeholder="Minutes"
            />
            <input
                value={hour}
                onChange={onChangeHour}
                type="number"
                placeholder="Hours"
            />
        </>
    );
};

export default App;
