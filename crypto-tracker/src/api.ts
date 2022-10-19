const BASE_URL = "https://api.coinpaprika.com/v1";

export const fetchCoins = () => {
    // async 대신에 promise 사용
    return fetch(`${BASE_URL}/coins`).then((response) => response.json());
};

export const fetchInfo = (coinId?: string) => {
    return fetch(`${BASE_URL}/coins/${coinId}`).then((response) =>
        response.json()
    );
};
export const fetchPrice = (coinId?: string) => {
    return fetch(`${BASE_URL}/tickers/${coinId}`).then((response) =>
        response.json()
    );
};
export const fetchChart = (coinId: string) => {
    return fetch(
        `https://ohlcv-api.nomadcoders.workers.dev?coinId=${coinId}`
    ).then((response) => response.json());
};
