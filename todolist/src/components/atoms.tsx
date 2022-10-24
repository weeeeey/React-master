import { atom, selector } from "recoil";

export interface ITodo {
    text: string;
    id: number;
    category: "TO_DO" | "DOING" | "DONE";
}

export const todoState = atom<ITodo[]>({
    key: "todo",
    default: [],
});

// selector 를 통해 새로운 state 만들기 가능해짐
// atom을 가져다가 output을 변경시켜줌
// state 자체를 변경시키는게 아닌 output만

export const todoSelector = selector({
    key: "todoSelector",
    // get func이 있어야 atom 받아오기 가능
    // get: (option) => 옵션은 객체 형태임
    get: ({ get }) => {
        const todos = get(todoState);
        // 배열로 감싸는거 잊지 말기
        // todo가 지금 객체들의 [] 형태니까
        return [
            todos.filter((todo) => todo.category === "TO_DO"),
            todos.filter((todo) => todo.category === "DOING"),
            todos.filter((todo) => todo.category === "DONE"),
        ];
    },
});
