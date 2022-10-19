import { useQuery } from "react-query";
import { fetchChart } from "../api";

interface IcoinId {
    coinId: string;
}
const Chart = ({ coinId }: IcoinId) => {
    const { isLoading, data } = useQuery(["chart", coinId], () =>
        fetchChart(coinId)
    );
    console.log(data);
    return <h1>Chart</h1>;
};

export default Chart;
