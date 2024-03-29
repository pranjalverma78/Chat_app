import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
// import {ToastContainer,toast} from "react-toastify";
//install react-toastify for confirm password
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Login() {

    const navigate = useNavigate();

    const toastOptions = {
        position: "bottom-right",
        autoClose: 8000,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      };

    const[values,setValues] = useState({
        username: "",
        password:"",
     })
     

     useEffect(() => {
        if (localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
          navigate("/");
        }
      }, []);

     const handleValidation = () => {
        const { password,username} = values;
        if (password==="") {
          toast.error(
            "Email and Password is required",
            toastOptions
          );
          return false;
        } else if (username.length==="") {
          toast.error(
            "Email and Password is required",
            toastOptions
          );
          return false;
        } 
    
        return true;
      };
    
      
      const handleSubmit = async (event) => {
        event.preventDefault();
        if (handleValidation()) {
          const {username, password} = values;
          const { data } = await axios.post('http://localhost:5000/api/auth/login', {
            username,
            password,
          });
    
          if (data.status === false) {
            toast.error(data.msg, toastOptions);
          }
          if (data.status === true) {
            localStorage.setItem(
              process.env.REACT_APP_LOCALHOST_KEY,
              JSON.stringify(data.user)
            );
            navigate("/");
          }
        }
      };

    const handleChange =(e)=>{
        setValues({...values,[e.target.name]:e.target.value});
    };


  return (
    <div>
    <FormContainer>
                <h3 className='head'>LOGIN</h3>
                <form>
                    <div className="form-group head">
                        <label>Username: </label>
                        <input type="text" required placeholder='Username' name='username' className="form-control" onChange={handleChange} />
                    </div>
                    <div className="form-group head">
                        <label>Password: </label>
                        <input type="password" required placeholder='Password' name='password' className="form-control" onChange={handleChange} />
                    </div>
                    <div className="form-group click-button">
                        <input type="submit" value="LOGIN"  onClick={handleSubmit} />
                    </div>
                    <span>Donn't have an account ?</span>
                    <Link to="/register">Register</Link>  
                </form>
                <ToastContainer />
                </FormContainer>
            </div>
  )
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  ${'' /* .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  } */}
  .head{
    color:white
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #4e0eff;
    border-radius: 0.4rem;
    color: white;
    width: 100%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
  }

  .form-control{
    background-color:transparent;
    color:white;
  }

  .click-button {
    background-color: #4e0eff;
    ${'' /* color: white; */}
    padding: 1rem 2rem;
    font-weight: bold;
    cursor: pointer;
    border-radius: 1.2rem;
    font-size: 1rem;
    text-transform: uppercase;
    ${'' /* &:hover {
      background-color: #4e0eff;
    } */}
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;

