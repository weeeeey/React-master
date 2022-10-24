import { atom, selector } from "recoil";

// Enums

// 열거형은 TypeScript가 제공하는 기능 중 하나입니다.
// enum은 열거형으로 이름이 있는 상수들의 집합을 정의할 수 있습니다.
// 열거형을 사용하면 의도를 문서화 하거나 구분되는 사례 집합을 더 쉽게 만들수 있습니다. TypeScript는 숫자와 문자열-기반 열거형을 제공합니다.

// 숫자 열거형 (Numeric enums)
// enum Direction {
// Up = 1,
// Down,
// Left,
// Right,
// }

// 문자열 열거형 (String enums)
// enum Direction {
// Up = "UP",
// Down = "DOWN",
// Left = "LEFT",
// Right = "RIGHT",
// }

export enum Categories {
    "TO_DO" = "TO_DO",
    "DOING" = "DOING",
    "DONE" = "DONE",
}

export interface ITodo {
    text: string;
    id: number;
    category: Categories;
}

export const categoryState = atom({
    key: "category",
    default: Categories.TO_DO,
});

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
        const category = get(categoryState);
        return todos.filter((todo) => todo.category === category);
    },
});
