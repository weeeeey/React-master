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
                                show: true,
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
                            type: "datetime",
                            categories: data?.map((price) =>
                                new Date(price.time_close * 1000).toUTCString()
                            ),
                        },
                        fill: {
                            type: "gradient",
                            gradient: {
                                gradientToColors: ["blue"],
                                stops: [0, 100],
                            },
                        },
                        colors: ["#0fbcf9"],
                        tooltip: {
                            y: {
                                formatter: (v) => `$${v.toFixed(2)}`,
                            },
                            x: {
                                show: true,
                            },
                        },
                    }}
                />
            )}
        </>
    );
};

export default Chart;
