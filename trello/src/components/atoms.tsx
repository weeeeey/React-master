import { atom, selector } from "recoil";

export const minutes = atom({
    key: "minute",
    default: 0,
});

export const hourSelector = selector({
    key: "hours",
    get: ({ get }) => {
        const minute = get(minutes);

        return minute / 60;
    },
});
