// format 은 이미지를 불러올떄 사이즈 크기 정의하는거
// w500 이라 써있으면 width가 500인거, 따로 정의 안하면 original 크기 로 가져옴

// https://developers.themoviedb.org/3/getting-started/images
export function makeImagePath(id: string, format?: string) {
    return `https://image.tmdb.org/t/p/${format ? format : "original"}/${id}`;
}
