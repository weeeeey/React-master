import { useQuery } from "react-query";
import { fetchChart } from "../api";
import Apexchart from "react-apexcharts";

interface IcoinId {
    coinId: string;
}
interface IchartData {
    time_open: number;
    time_close: number;
    open: string;
    high: string;
    low: string;
    close: string;
    volume: string;
    market_cap: number;
}
const Chart = ({ coinId }: IcoinId) => {
    const { isLoading, data } = useQuery<IchartData[]>(["chart", coinId], () =>
        fetchChart(coinId)
    );
    return (
        <>
            {isLoading ? (
                "Loading..."
            ) : (
                <Apexchart
                    type="line"
                    series={[
                        {
                            name: "Price",
                            data: data?.map((price) =>
                                parseFloat(price.close)
                            ) as number[],
                        },
                    ]}
                    options={{
                        theme: {
                            mode: "dark",
                        },
                        chart: {
                            height: 300,
                            width: 500,
                            toolbar: {
                                show: false,
                            },
                            background: "transparent",
                        },
                        grid: { show: false },
                        stroke: {
                            curve: "smooth",
                            width: 4,
                        },
                        yaxis: {
                            show: false,
                        },
                        xaxis: {
                            axisBorder: { show: false },
                            axisTicks: { show: false },
                            labels: { show: false },
                        },
                    }}
                />
            )}
        </>
    );
};

export default Chart;
