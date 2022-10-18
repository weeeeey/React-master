import { BrowserRouter, Routes, Route } from "react-router-dom";
import Coin from "./Coin";
import Coins from "./Coins";

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Coins />}></Route>
                <Route path="/:coinId" element={<Coin />}></Route>
                <Route path="/:coinId/*" element={<Coin />}></Route>
                {/* 자식 라우터가 있다고 명시 */}
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
