import { minutes, hourSelector } from "./components/atoms";
import { useRecoilState, useRecoilValue } from "recoil";

const App = () => {
    const [minute, setMinutes] = useRecoilState(minutes);
    const hour = useRecoilValue(hourSelector);

    const onChangeMinute = (e: React.FormEvent<HTMLInputElement>) => {
        setMinutes(+e.currentTarget.value);
    };
    return (
        <>
            <input
                value={minute}
                onChange={onChangeMinute}
                type="number"
                placeholder="Minutes"
            />
            <input value={hour} type="number" placeholder="Hours" />
        </>
    );
};

export default App;
