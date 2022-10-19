export const fetcher = () => {
    // async 대신에 promise 사용
    return fetch("https://api.coinpaprika.com/v1/coins").then((response) =>
        response.json()
    );
};
