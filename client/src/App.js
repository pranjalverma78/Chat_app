import React from 'react';
// import 'bootstap/dist/css/bootstap/min/css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './component/login';
import Chat from './component/chat';
import Register from './component/register';
import SetAvatar from './component/setAvatar';

function App() {
  return (
    <div className="App">
    <Router>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/login" element={<Login/>} />
        <Route path="/" element={<Chat/>} />
        <Route path="/register" element={<Register/>} />
        {/* <Route path="/setavatar" element={<SetAvatar/>} /> */}
        
      </Routes>
    </Router>
      
    </div>
  );
}

export default App;
