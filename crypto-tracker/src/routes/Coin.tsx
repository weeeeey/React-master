import { useQuery } from "react-query";
import { fetchInfo, fetchPrice } from "../api";
import { Link, useMatch } from "react-router-dom";
import { Route, Routes, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import Chart from "./Chart";
import Price from "./Price";
import { Helmet } from "react-helmet";

// Helmet 을 통해 html head 부분에 접근 가능해짐
const Title = styled.h1`
    font-size: 48px;
    color: ${(props) => props.theme.accentColor};
`;
const Loader = styled.span`
    text-align: center;
    display: block;
`;
const Container = styled.div`
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
const Overview = styled.div`
    display: flex;
    justify-content: space-between;
    background-color: white;
    padding: 10px 20px;
    border-radius: 10px;
`;
const OverviewItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    span:first-child {
        font-size: 10px;
        font-weight: 400;
        text-transform: uppercase;
        margin-bottom: 5px;
    }
`;
const Description = styled.p`
    margin: 20px 0px;
    background-color: white;
    border-radius: 10px;
`;
const Taps = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    margin: 25px 0px;
    gap: 10px;
`;
const Tap = styled.span<{ isActive: boolean }>`
    text-align: center;
    text-transform: uppercase;
    font-size: 12px;
    font-weight: 400;
    background-color: white;
    padding: 7px 0px;
    border-radius: 10px;
    color: ${(props) =>
        props.isActive ? props.theme.accentColor : props.theme.textColor};
    a {
        display: block;
    }
`;
interface RouteState {
    state: { name: string };
}
interface IInfoData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
    logo: string;
    description: string;
    message: string;
    open_source: boolean;
    started_at: string;
    development_status: string;
    hardware_wallet: boolean;
    proof_type: string;
    org_structure: string;
    hash_algorithm: string;
    first_data_at: string;
    last_data_at: string;
}
interface IPriceData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    beta_value: number;
    first_data_at: string;
    last_updated: string;
    // 인터페이스 안에서 Object 에 대해 타입 지정 시켜줌
    quotes: {
        USD: {
            ath_date: string;
            ath_price: number;
            market_cap: number;
            market_cap_change_24h: number;
            percent_change_1h: number;
            percent_change_1y: number;
            percent_change_6h: number;
            percent_change_7d: number;
            percent_change_12h: number;
            percent_change_15m: number;
            percent_change_24h: number;
            percent_change_30d: number;
            percent_change_30m: number;
            percent_from_price_ath: number;
            price: number;
            volume_24h: number;
            volume_24h_change_24h: number;
        };
    };
}

const Coin = () => {
    const { coinId } = useParams();
    const { state } = useLocation() as RouteState;

    const priceMatch = useMatch("/:coinId/price");
    const chartMatch = useMatch("/:coinId/chart");

    const { isLoading: isInfoLoading, data: infoData } = useQuery<IInfoData>(
        ["info", coinId],
        () => fetchInfo(coinId)
        // 두번쨰 인자는 함수 형태로 넘겨야 하는데 단순히 fetchInfo(id)를 하면
        // 그 자리에서 함수를 바로 실행하는 것이므로 화살표 함수 이용
    );
    const { isLoading: isPriceLoading, data: priceData } = useQuery<IPriceData>(
        ["price", coinId],
        () => fetchPrice(coinId),
        { refetchInterval: 3000 }
    );

    const loading = isInfoLoading || isPriceLoading;
    return (
        <Container>
            <Helmet>
                <title>
                    {state?.name
                        ? state.name
                        : loading
                        ? "Loading"
                        : infoData?.name}
                </title>
            </Helmet>
            <Header>
                <Title>
                    {state?.name
                        ? state.name
                        : loading
                        ? "Loading.."
                        : infoData?.name}
                </Title>
            </Header>
            {loading ? (
                <Loader>Loading</Loader>
            ) : (
                <>
                    <Overview>
                        <OverviewItem>
                            <span>Rank:</span>
                            <span>{infoData?.rank}</span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>Symbol:</span>
                            <span>${infoData?.symbol}</span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>Price:</span>
                            <span>
                                ${priceData?.quotes.USD.price.toFixed(3)}
                            </span>
                        </OverviewItem>
                    </Overview>
                    <Description>{infoData?.description}</Description>
                    <Overview>
                        <OverviewItem>
                            <span>Total Suply:</span>
                            <span>{priceData?.total_supply}</span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>Max Supply:</span>
                            <span>{priceData?.max_supply}</span>
                        </OverviewItem>
                    </Overview>

                    <Taps>
                        <Tap isActive={chartMatch !== null}>
                            <Link to={`/${coinId}/chart`}>Chart</Link>
                        </Tap>
                        <Tap isActive={priceMatch !== null}>
                            <Link to={`/${coinId}/price`}>Price</Link>
                        </Tap>
                    </Taps>

                    <Routes>
                        {/* Nested Router */}
                        {/* 위에 정보들을 그대로 두고 바로 아래에 불러오는 것 */}
                        {/* <Route path="/:coinId/*" element={<Coin />}></Route> */}
                        {/* Router.tsx 에 위 문장을 써줌으로써 중첩된 자식 루트 있다고 명시해줌 */}
                        {/* 상대경로 입력 */}
                        <Route
                            path={`/price`}
                            element={<Price usdData={priceData!.quotes.USD} />}
                        />
                        <Route
                            path="chart"
                            element={<Chart coinId={coinId!} />}
                        />
                    </Routes>
                </>
            )}
        </Container>
    );
};

export default Coin;
