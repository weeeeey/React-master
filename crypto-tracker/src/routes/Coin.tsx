import { useEffect, useState } from "react";
import { Route, Routes, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import Chart from "./Chart";
import Price from "./Price";

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
    background-color: rgba(0, 0, 0, 0.5);
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
`;

interface RouteState {
    state: { name: string };
}

// interface 명 작성시 맨 앞에 대문자 I 를 입력함 (보통)
// Object.keys(temp1).join() 입력
// 복붙해 와서 콤마를 드래그 후 ctrl+d 를 누르며 한개씩 선택 후 백스페이스 후 엔터
// 이후 전체 드래그 후 Alt shift i 로 선택 후 : 와 ; 입력
// Object.values(temp1).map(v=>typeof v).join() 입력으로 타입 받아오기
// ctrl+ d로 콤마 제거후 복붙 (알트 쉬프트 i 이용)
// object 타입은 따로 또 인터페이스 만들어서 정보 알려줘야함
// 딱히 필요 없으니 삭제

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
    const [loading, setLoading] = useState(true);
    const { coinId } = useParams();
    const { state } = useLocation() as RouteState;

    // 현재 info와 priceInfo는 타입을 지정 안해줘서 name이나 Id에 접근하면 에러 뜸
    // 타입스크립트는 이제 타입들을 다 아니까 () 안에 {}은 지워줌

    const [info, setInfo] = useState<IInfoData>();
    const [priceInfo, setPriceInfo] = useState<IPriceData>();

    useEffect(() => {
        (async () => {
            const infoData = await (
                await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
            ).json();
            const priceData = await (
                await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
            ).json();
            setInfo(infoData);
            setPriceInfo(priceData);
            setLoading(false);
            // [인터페이스를 빠르게 정의 하는 팀]
            // console.log(info); 를 찍어서 콘솔 창에 띄움
            // 띄워진 정보 위에 마우스 우클릭 후 store object as global variable 을 누름
            // 바로 temp에 저장 됨
            // Object.keys(temp1).join() 입력
            // 이걸 토대로 인터페이스 작성
        })();
    }, [coinId]);
    return (
        <Container>
            <Header>
                <Title>
                    {state?.name
                        ? state.name
                        : loading
                        ? "Loading.."
                        : info?.name}
                </Title>
            </Header>
            {loading ? (
                <Loader>Loading</Loader>
            ) : (
                <>
                    <Overview>
                        <OverviewItem>
                            <span>Rank:</span>
                            <span>{info?.rank}</span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>Symbol:</span>
                            <span>${info?.symbol}</span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>Open Source:</span>
                            <span>{info?.open_source ? "Yes" : "No"}</span>
                        </OverviewItem>
                    </Overview>
                    <Description>{info?.description}</Description>
                    <Overview>
                        <OverviewItem>
                            <span>Total Suply:</span>
                            <span>{priceInfo?.total_supply}</span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>Max Supply:</span>
                            <span>{priceInfo?.max_supply}</span>
                        </OverviewItem>
                    </Overview>
                    <Routes>
                        {/* Nested Router */}
                        {/* 위에 정보들을 그대로 두고 바로 아래에 불러오는 것 */}
                        {/* <Route path="/:coinId/*" element={<Coin />}></Route> */}
                        {/* Router.tsx 에 위 문장을 써줌으로써 중첩된 자식 루트 있다고 명시해줌 */}
                        {/* 상대경로 입력 */}
                        <Route path={`/price`} element={<Price />} />
                        <Route path="chart" element={<Chart />} />
                    </Routes>
                </>
            )}
        </Container>
    );
};

export default Coin;
