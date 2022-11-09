import { getTv, IGetTvResult } from "../api";
import { useQuery } from "react-query";
import styled from "styled-components";
import { makeImagePath } from "../utils";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useNavigate, useMatch, PathMatch } from "react-router-dom";
import { off } from "process";

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
    grid-template-columns: repeat(6, 1fr);
    position: absolute;
    width: 100%;
    gap: 10px;
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
    height: 250px;
    width: 180px;
    color: red;
    font-size: 66px;
    background-image: url(${(props) => props.bgphoto});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
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

const offset = 6;
const Tv = () => {
    const { data, isLoading } = useQuery<IGetTvResult>(
        ["tv", "popular"],
        getTv
    );
    const [page, setPage] = useState(0);
    const maxPage = !isLoading && Math.floor(data?.results.length! / offset);
    const onIncreasePage = () => {
        setPage((props) => (props + 1 === maxPage ? 0 : props + 1));
    };

    return (
        <>
            {isLoading ? (
                <Loader>Loading...</Loader>
            ) : (
                <Wrapper>
                    <Banner
                        bgPhoto={makeImagePath(data?.results[0].backdrop_path!)}
                        onClick={onIncreasePage}
                    >
                        <Title>{data?.results[0].name}</Title>
                        <OverView>
                            {data?.results[0].overview.slice(0, 300)}...
                        </OverView>
                    </Banner>
                    <Slider>
                        <AnimatePresence>
                            <Row
                                variants={varRow}
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                transition={{ type: "tween", duration: 0.5 }}
                                key={page}
                            >
                                {data?.results
                                    .slice(
                                        offset * page,
                                        offset * page + offset
                                    )
                                    .map((tv) => (
                                        <Box
                                            key={tv.id}
                                            bgphoto={makeImagePath(
                                                tv.poster_path,
                                                "w500"
                                            )}
                                            transition={{ type: "tween" }}
                                            variants={varBox}
                                            initial={{ scale: 1 }}
                                            whileHover="hover"
                                        >
                                            <Info variants={varInfo}>
                                                <h4>{tv.name}</h4>
                                            </Info>
                                        </Box>
                                    ))}
                            </Row>
                        </AnimatePresence>
                    </Slider>
                </Wrapper>
            )}
        </>
    );
};

export default Tv;
