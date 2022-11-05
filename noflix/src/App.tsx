import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Routers/Home";
import Search from "./Routers/Search";
import Tv from "./Routers/Tv";
import Header from "./Components/Header";

const App = () => {
    return (
        <>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/search" element={<Search />}></Route>
                    <Route path="/tv" element={<Tv />}></Route>
                    <Route path="/" element={<Home />}>
                        <Route
                            path="/movies/:movieId"
                            element={<Home />}
                        ></Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
};
export default App;
