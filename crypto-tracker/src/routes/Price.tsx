import styled from "styled-components";

interface IUsdData {
    usdData: {
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
}

const Taps = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-auto-rows: 6rem;
    gap: 1rem;
`;

const Tap = styled.div`
    display: flex;
    align-items: flex-start;
    -webkit-box-pack: justify;
    justify-content: space-between;
    flex-direction: column;
    padding: 1rem;
    background-color: rgb(59, 59, 59);
    border-radius: 0.7rem;
    box-shadow: rgb(10 10 10 / 10%) 0px 0.2rem 0.5rem;
    div {
        display: flex;

        -webkit-box-align: center;
        align-items: center;
        flex-direction: row;
        grid-area: 1 / 1 / 2 / 3;
        padding: 1.2rem;
        -webkit-box-pack: justify;
        justify-content: space-between;
        background-color: rgb(59, 59, 59);
        border-radius: 0.7rem;
        box-shadow: rgb(10 10 10 / 10%) 0px 0.2rem 0.5rem;
    }
`;

const Price = ({ usdData }: IUsdData) => {
    const {
        percent_change_15m,
        percent_change_30m,
        percent_change_1h,
        percent_change_12h,
        percent_change_24h,
        percent_change_7d,
        percent_change_30d,
        percent_change_1y,
        price,
    } = usdData;
    return (
        <>
            <Taps>
                <Tap>최고값 갱신</Tap>
                <Tap>{price.toFixed(3)}</Tap>
                <Tap>{percent_change_15m}</Tap>
                <Tap>
                    <div>{percent_change_30m}</div>
                </Tap>
                <Tap>{percent_change_1h}</Tap>
                <Tap>{percent_change_12h}</Tap>
                <Tap>{percent_change_24h}</Tap>
                <Tap>{percent_change_7d}</Tap>
                <Tap>{percent_change_30d}</Tap>
                <Tap>{percent_change_1y}</Tap>
            </Taps>
        </>
    );
};

export default Price;
