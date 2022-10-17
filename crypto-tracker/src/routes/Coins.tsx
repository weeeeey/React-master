import { Link } from "react-router-dom";
import styled from "styled-components";

const Countainer = styled.div`
    padding: 0px 20px;
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
        padding: 20px;
        transition: color 0.2s ease-in;
        display: block;
    }
    &:hover {
        a {
            color: ${(props) => props.theme.accentColor};
        }
    }
`;

const Title = styled.h1`
    font-size: 48px;
    color: ${(props) => props.theme.accentColor};
`;

const coins = [
    {
        id: "btc-bitcoin",
        name: "Bitcoin",
        symbol: "BTC",
        rank: 1,
        is_new: false,
        is_active: true,
        type: "coin",
    },
    {
        id: "eth-ethereum",
        name: "Ethereum",
        symbol: "ETH",
        rank: 2,
        is_new: false,
        is_active: true,
        type: "coin",
    },
    {
        id: "hex-hex",
        name: "HEX",
        symbol: "HEX",
        rank: 3,
        is_new: false,
        is_active: true,
        type: "token",
    },
];

const Coins = () => {
    return (
        <Countainer>
            <Header>
                <Title>코인</Title>
            </Header>
            <CoinsList>
                {coins.map((coin) => (
                    <Coin key={coin.id}>
                        {/* rarr 은 라이트 애로우를 띄워줌 */}
                        <Link to={`/${coin.id}`}>{coin.name}&rarr;</Link>
                    </Coin>
                ))}
            </CoinsList>
        </Countainer>
    );
};

export default Coins;
