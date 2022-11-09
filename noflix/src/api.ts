// https://api.themoviedb.org/3/tv/{tv_id}?api_key=<<api_key>>&language=en-US

const API_KEY = "60ddc094191d95126e31c189fc6f81a8";
const BASE_PATH = "https://api.themoviedb.org/3";

interface IMovie {
    id: number;
    backdrop_path: string;
    poster_path: string;
    title: string;
    overview: string;
}

export interface IGetMoviesResult {
    dates: {
        maximum: string;
        minimum: string;
    };
    page: number;
    results: IMovie[];
    total_pages: number;
    total_results: number;
}
export function getMovies() {
    return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`).then(
        (response) => response.json()
    );
}

interface ITv {
    backdrop_path: string;
    first_air_date: string;
    id: string;
    name: string;
    origin_country: string;
    overview: string;
    poster_path: string;
}
export interface IGetTvResult {
    results: ITv[];
}

export const getTv = () => {
    return fetch(`${BASE_PATH}/tv/popular?api_key=${API_KEY}`).then((reponse) =>
        reponse.json()
    );
};

// https://api.themoviedb.org/3/tv/{tv_id}?api_key=<<api_key>>&language=en-US
