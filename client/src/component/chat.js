import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Contact from "./contact";
import Welcome from "./welcome";
import styled from "styled-components";
import ChatContainer from "./chatContainer";
import {io} from "socket.io-client";


export default function Chat() {
  const socket = useRef();
  const host = "http://localhost:5000";
  const allUsersRoute = 'http://localhost:5000/api/auth/allusers'
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);

  //socket
  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  useEffect(() => {
    local();
  }, []);

  const local = async()=>{
    if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
      navigate("/login");
    } else {
      setCurrentUser(
        await JSON.parse(
          localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
        )
      );
    }

  }

  useEffect(() => {
    local2();
  }, [currentUser]);

  const local2 = async()=>{
    try {
      const response = await axios.get(`${allUsersRoute}/${currentUser._id}`);
      setContacts(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };
  return (
    <>
    <Container>
      <div className="container">
        <Contact contacts={contacts} changeChat={handleChatChange} />
        {currentChat === undefined ?(
          <Welcome />
        ):(
          <ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket} />
        )}
      </div>
    </Container>
  </>
  )
}


const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;
