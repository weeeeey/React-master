import { Link } from "react-router-dom";
import styled from "styled-components";
import { useState, useEffect } from "react";

const Countainer = styled.div`
    padding: 0px 20px;
    max-width: 480px;
    margin: 0 auto;
`;
const Header = styled.header`
    height: 15vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;
const CoinsList = styled.ul``;
const Coin = styled.li`
    background-color: white;
    color: ${(props) => props.theme.bgColor};
    margin-bottom: 10px;
    a {
        display: flex;
        align-items: center;
        padding: 20px;
        transition: color 0.2s ease-in;
    }
    &:hover {
        a {
            color: ${(props) => props.theme.accentColor};
        }
    }
`;
const Loader = styled.span`
    text-align: center;
    display: block;
`;
const Img = styled.img`
    width: 35px;
    height: 35px;
    margin-right: 10px;
`;
const Title = styled.h1`
    font-size: 48px;
    color: ${(props) => props.theme.accentColor};
`;

interface CoinInterface {
    id: string;
    name: string;
    symbol: string;
    ranck: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
}
const Coins = () => {
    // 받아올 정보들에 대해 인터페이스로 미리 알려줌
    // 그것들이 배열이면 타입 지정해주면서 [] 붙여야함
    const [coins, setCoins] = useState<CoinInterface[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // ()() 라고 써놓으면 바로 실행 가능한 함수가 됨
        (async () => {
            const response = await fetch(
                "https://api.coinpaprika.com/v1/coins"
            );
            const json = await response.json();
            setCoins(json.slice(0, 100));
            // 코인 정보 100개만 가져오기
            setLoading(false);
        })();
    }, []);

    return (
        <Countainer>
            <Header>
                <Title>코인</Title>
            </Header>
            {loading ? (
                <Loader>Loading...</Loader>
            ) : (
                <CoinsList>
                    {coins.map((coin) => (
                        <Coin key={coin.id}>
                            {/* < Link to="/home" state={state} / > */}
                            <Link
                                to={`/${coin.id}`}
                                //  이미 coin에 대한 정보를 갖고 있으므로 파라미터를 통해 라우터 통신을 하면됨
                                state={{ name: `${coin.name}` }}
                            >
                                <Img
                                    src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`}
                                />
                                {coin.name}&rarr;
                            </Link>
                        </Coin>
                    ))}
                </CoinsList>
            )}
        </Countainer>
    );
};

export default Coins;
