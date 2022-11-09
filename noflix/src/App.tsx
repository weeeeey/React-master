import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Routers/Home";
import Search from "./Routers/Search";
import Tv from "./Routers/Tv";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import ScrollToTop from "./Routers/ScrollToTop";
const App = () => {
    return (
        <>
            <BrowserRouter>
                <ScrollToTop />
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
                <Footer />
            </BrowserRouter>
        </>
    );
};
export default App;
