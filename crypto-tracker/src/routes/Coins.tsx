import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "./../api";
import { useQuery } from "react-query";
import { Helmet } from "react-helmet";
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
    margin-bottom: 10px;
`;
const CoinsList = styled.ul``;
const Coin = styled.li`
    background-color: white;
    color: ${(props) => props.theme.textColor};
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

interface ICoin {
    id: string;
    name: string;
    symbol: string;
    ranck: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
}
const Coins = () => {
    const { isLoading, data } = useQuery<ICoin[]>(["allCoins"], fetchCoins);
    // react-query 사용시 index.tsx에서 쿼리 클라이언트 설치(설정) 해줘야함

    // useQuery를 사용하면 isLoading(boolean)과 data를 받아올 수 있음
    // data는 지정한 인터페이스 데이터 타입 또는 undefind를 받아오므로 사용할떄는 ? 붙여주기
    // data는 코인 배열을 받아오므로 ICoin[] 해주기

    // useQuery 첫번쨰 인자로는 쿼리의 key값(해당 쿼리의 이름) , 두번째 인자는 fetch 함수

    // react query가 데이터를 캐시에 저장해둬서 뒤로 가기를 눌러도 Loading 문구가 안보인다

    return (
        <Countainer>
            <Helmet>
                <title>Coins</title>
            </Helmet>
            <Header>
                <Title>코인</Title>
            </Header>
            {isLoading ? (
                <Loader>Loading...</Loader>
            ) : (
                <CoinsList>
                    {/* data중 100개 까지만 받는걸 여기에서 지정함 */}
                    {data?.slice(0, 100).map((coin) => (
                        <Coin key={coin.id}>
                            {/* < Link to="/home" state={state} / > */}
                            <Link
                                to={`/${coin.id}`}
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
