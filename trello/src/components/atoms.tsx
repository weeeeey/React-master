import { atom, selector } from "recoil";

export const minuteState = atom({
    key: "minute",
    default: 0,
});

export const hourSelector = selector<number>({
    key: "hours",
    get: ({ get }) => {
        const minute = get(minuteState);

        return minute / 60;
    },
    set: ({ set }, newValue) => {
        // newValue는 string 타입으로 가져와서 number로 형 변환
        const minutes = Number(newValue) * 60;
        set(minuteState, minutes);
        // 첫번쨰 인자는 atom , 두번째 인자는 수정할 값
    },
});
