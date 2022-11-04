import { useQuery } from "react-query";
import { getMovies, IGetMoviesResult } from "../api";
import styled from "styled-components";
import { makeImagePath } from "../utils";
import { useEffect, useState } from "react";

import { motion, AnimatePresence, animate } from "framer-motion";

const Wrapper = styled.div`
    background-color: black;
`;
const Loader = styled.div`
    display: flex;
    height: 20vh;
    justify-content: center;
    align-items: center;
`;
const Banner = styled.div<{ bgPhoto: string }>`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 60px;
    background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
        url(${(props) => props.bgPhoto});
    background-size: cover;
`;

const Title = styled.h2`
    font-size: 68px;
    margin-bottom: 20px;
`;
const OverView = styled.p`
    font-size: 18px;
    width: 50%;
`;

const Slider = styled.div`
    position: relative;
    top: -100px;
`;

const Row = styled(motion.div)`
    display: grid;
    gap: 10px;
    grid-template-columns: repeat(6, 1fr);
    position: absolute;
    width: 100%;
`;

const Box = styled(motion.div)`
    background-color: white;
    height: 200px;
    color: red;
    font-size: 66px;
`;

const varRow = {
    // +10 과 -10 을 하는건 슬라이더 마지막과 처음이 다시 만났을때 간격을 주기 위한거
    // 현자 Row에서 gap이 10px이라 저렇게 준거
    hidden: { x: window.outerWidth + 10 },
    visible: { x: 0 },
    exit: { x: -window.outerWidth - 10 },
};

// window.outerWidth : 브라우저 전체의 너비
// window.outerHeight : 브라우저 전체의 높이
// window.innerWidth : 브라우저 화면의 너비
// window.innerHeight : 브라우저 화면의 높이

// outerWidth vs innerWidth 비교 이미지
// https://www.cluemediator.com/how-to-get-the-window-size-in-javascript
const Home = () => {
    const { data, isLoading } = useQuery<IGetMoviesResult>(
        ["movies", "nowPlaying"],
        getMovies
    );
    const [index, setIndex] = useState(0);
    const increaseIndex = () => {
        setIndex((prev) => prev + 1);
        console.log(index);
    };
    return (
        <Wrapper>
            {isLoading ? (
                <Loader>Loading...</Loader>
            ) : (
                <>
                    <Banner
                        onClick={increaseIndex}
                        bgPhoto={makeImagePath(
                            data?.results[0].backdrop_path || ""
                        )}
                    >
                        <Title>{data?.results[0].title}</Title>
                        <OverView>{data?.results[0].overview}</OverView>
                    </Banner>
                    <Slider>
                        <AnimatePresence>
                            <Row
                                variants={varRow}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                transition={{ type: "tween", duration: 1 }}
                                key={index}
                                // key값에 index를 줬으므로 클릭으로 인해 index가 증가하면
                                // motion은 이전 것들을 exit 해서 보내버리고 새로운 애니메이션을 보여줌
                            >
                                {[1, 2, 3, 4, 5, 6].map((i) => (
                                    <Box key={i}>{i}</Box>
                                ))}
                            </Row>
                        </AnimatePresence>
                    </Slider>
                </>
            )}
        </Wrapper>
    );
};

export default Home;
