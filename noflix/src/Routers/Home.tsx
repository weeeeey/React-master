import { useQuery } from "react-query";
import { getMovies, IGetMoviesResult } from "../api";
import styled from "styled-components";
import { makeImagePath } from "../utils";
import { useState } from "react";
import { useNavigate, useMatch, PathMatch } from "react-router-dom";

import { motion, AnimatePresence, useScroll } from "framer-motion";

const Wrapper = styled.div`
    background-color: black;
    padding-bottom: 200px;
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
    gap: 5px;
    grid-template-columns: repeat(6, 1fr);
    position: absolute;
    width: 100%;
`;

const varRow = {
    // +10 과 -10 을 하는건 슬라이더 마지막과 처음이 다시 만났을때 간격을 주기 위한거
    // 현자 Row에서 gap이 10px이라 저렇게 준거
    hidden: { x: window.outerWidth + 5 },
    visible: { x: 0 },
    exit: { x: -window.outerWidth - 5 },
};

const Box = styled(motion.div)<{ bgphoto: string }>`
    cursor: pointer;
    background-color: white;
    height: 200px;
    color: red;
    font-size: 66px;
    background-image: url(${(props) => props.bgphoto});
    background-size: cover;
    background-position: center;
    &:first-child {
        transform-origin: center left;
    }
    &:last-child {
        transform-origin: center right;
    }
`;

const varBox = {
    hover: {
        scale: 1.3,
        y: -80,
        transition: {
            delay: 0.5,
            duration: 0.5,
            type: "tween",
        },
    },
};

const Info = styled(motion.div)`
    padding: 10px;
    background-color: ${(props) => props.theme.black.lighter};
    opacity: 0;
    position: absolute;
    width: 100%;
    bottom: 0;
    h4 {
        text-align: center;
        font-size: 18px;
    }
`;

const varInfo = {
    hover: {
        opacity: 1,
        transition: {
            delay: 0.5,
            duration: 0.1,
            type: "tween",
        },
    },
};

const Overlay = styled(motion.div)`
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    opacity: 0;
`;

const BigMovie = styled(motion.div)`
    position: absolute;
    width: 40vw;
    height: 80vh;
    left: 0;
    right: 0;
    margin: 0 auto;
`;
const offset = 6;

const Home = () => {
    const history = useNavigate();
    const bigMovieMatch: PathMatch<string> | null =
        useMatch("/movies/:movieId");
    console.log(bigMovieMatch);
    // history에 인자를 넘겨주면 내 주소값을 그것으로 바꿔줌
    // 그럼 bigMovieMatch (useMatch)를 통해 그걸 따옴
    // (내가 클릭하고 있는 영화를 알수있게 해줌) ->
    // 내가 설정한 URL과 매치 되면 bigMovieMatch에 값이 생김
    const { scrollY } = useScroll();
    const { data, isLoading } = useQuery<IGetMoviesResult>(
        ["movies", "nowPlaying"],
        getMovies
    );
    const [index, setIndex] = useState(0);
    const [leaving, setLeaving] = useState(false);
    const toggleLeaving = () => {
        setLeaving((prev) => !prev);
    };
    const increaseIndex = () => {
        if (data) {
            if (leaving) return;
            toggleLeaving();
            const totalMovies = data.results.length - 1;
            const maxIndex = Math.floor(totalMovies / offset) - 1;
            setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
        }
    };
    const onBoxClicked = (movieId: number) => {
        history(`/movies/${movieId}`);
    };
    const onOverlayClicked = () => {
        history(`/`);
    };
    console.log(data);
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
                        <OverView>
                            {data?.results[0].overview.slice(0, 200)}...
                        </OverView>
                    </Banner>
                    <Slider>
                        <AnimatePresence
                            initial={false}
                            onExitComplete={toggleLeaving}
                        >
                            <Row
                                variants={varRow}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                transition={{ type: "tween", duration: 0.5 }}
                                key={index}
                            >
                                {data?.results
                                    .slice(1)
                                    .slice(
                                        offset * index,
                                        offset * index + offset
                                    )
                                    .map((movie) => (
                                        <Box
                                            layoutId={movie.id + ""}
                                            onClick={() =>
                                                onBoxClicked(movie.id)
                                            }
                                            key={movie.id}
                                            bgphoto={makeImagePath(
                                                movie.poster_path,
                                                "w500"
                                            )}
                                            transition={{ type: "tween" }}
                                            variants={varBox}
                                            initial={{ scale: 1 }}
                                            whileHover="hover"
                                        >
                                            {/* 부모 컴포넌트 variants에는 hover가 있으므로 자식에게도
                                            자동으로 whilehover="hover"가 적용됨 */}
                                            <Info variants={varInfo}>
                                                <h4>{movie.title}</h4>
                                            </Info>
                                        </Box>
                                    ))}
                            </Row>
                        </AnimatePresence>
                    </Slider>
                    <AnimatePresence>
                        {bigMovieMatch ? (
                            <>
                                <Overlay
                                    onClick={onOverlayClicked}
                                    exit={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                >
                                    <BigMovie
                                        style={{ top: scrollY.get() + 100 }}
                                        layoutId={bigMovieMatch.params.moviedId}
                                    >
                                        hello
                                    </BigMovie>
                                </Overlay>
                            </>
                        ) : null}
                    </AnimatePresence>
                </>
            )}
        </Wrapper>
    );
};

export default Home;
