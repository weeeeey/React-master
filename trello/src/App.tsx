import { minuteState, hourSelector } from './components/atoms';
import { useRecoilValue, useRecoilState } from 'recoil';
import React from 'react';

const App = () => {
    const [minutes, setMinutes] = useRecoilState(minuteState);
    const hours = useRecoilValue(hourSelector);
    const onMinutesChange = (e: React.FormEvent<HTMLInputElement>) => {
        setMinutes(+e.currentTarget.value);
    };
    return (
        <>
            <input
                value={minutes}
                type="number"
                placeholder="Minutes"
                onChange={onMinutesChange}
            />
            <input value={hours} type="number" placeholder="Hours" />
        </>
    );
};

export default App;
