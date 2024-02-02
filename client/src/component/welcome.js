import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import loader from "../loader/chatbot-marketing.gif"

export default function Welcome() {
    const [userName, setUserName] = useState("");
    useEffect(() => {
        getlocal();
    }, []);

    const getlocal = async()=>{
        setUserName(
            await JSON.parse(
                localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
            ).username
        );
    }
    return (
        <Container>
            <img src={loader} alt="" />
            <h1>
                Welcome, <span>{userName}!</span>
            </h1>
            <h3>Please select a chat to Start messaging.</h3>
        </Container>
    );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  img {
    height: 20rem;
  }
  span {
    color: #4e0eff;
  }
`;


