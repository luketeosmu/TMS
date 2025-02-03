import React, { useContext, useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { Container } from '@mui/material';
const Home = () => {
    axios.defaults.withCredentials = true;
    const navigate = useNavigate();
    const checkToken = () => {
        axios.post('http://localhost:3000/auth/protected')
        .then((res) => {
          if(res.data.success) {
            console.log("is logged in");
          } else {
            return navigate("/login");
          }
        }).catch((error) => {
          console.log(error + " unauthorized at Home Page redirect to login page");
          return navigate("/login");
        });
    }

    useEffect(() => {
        console.log("checking token");
        // checkToken();
        console.log("check token complete");
    }, []);

    return (
        <Container>
            <Navbar />
            Default Home Page
        </Container>
    )
}

export default Home