<<<<<<< HEAD
import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
=======
import { useParams } from 'react-router-dom';
>>>>>>> refs/remotes/origin/main

const Title = styled.h1`
    font-size: 48px;
    color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
    text-align: center;
    display: block;
`;
const Container = styled.div`
    padding: 0px 20px;
    max-width: 480px;
    margin: 0 auto;
`;
const Header = styled.header`
    height: 15vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

interface RouteParams {
    coinId: string;
}
interface RouteState {
    state: { name: string };
}
const Coin = () => {
    const [loading, setLoading] = useState(true);
    const { coinId } = useParams();
    const { state } = useLocation() as RouteState;
    console.log(state.name);
    return (
        <Container>
            <Header>
                <Title>{state?.name || "Loading..."}</Title>
            </Header>
            {loading ? <Loader>Loading</Loader> : null}
        </Container>
    );
};

export default Coin;
