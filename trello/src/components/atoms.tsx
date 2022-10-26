import { atom } from "recoil";

export interface ITodo {
    id: number;
    text: string;
}

interface ITodoState {
    [key: string]: ITodo[];
}

// todoState의 인터페이스를 지정해줌으로 이후에 보드(새로운 default)를 추가했을시 담기 가능

export const todoState = atom<ITodoState>({
    key: "todo",
    default: {
        "to do": [],
        doing: [],
        done: [],
    },
});
