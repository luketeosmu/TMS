import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate  } from 'react-router-dom';
import { Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import UserTable from './UserTable';
import Navbar from './Navbar';



const Home = () => {
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");
  const [groups, setGroups] = useState([]);
  const [users, setUsers] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  //get groups associated with user & username
  const getGroups = () => {
    axios.get('http://localhost:3000/users/getGroupsByUser')
    .then((res) => {
      console.log(res);
      if(!res.data.success) {
        console.log("unauthorized");
        return navigate("/login");
      }
      console.log(res.data);
      setUsername(res.data.username);
      if(res.data.groups.includes('admin')) setIsAdmin(true);
      setGroups(res.data.groups);
    }).catch((error) => {
      console.log(error);
      return navigate("/login");
    });
  }

  const getAllUsers = () => {
    axios.get('http://localhost:3000/users/getUsers')
    .then((res) => {
      console.log(res.data);
      setUsers(res.data.users);
    }).catch((error) => {
      console.log(error);
    })
  }

  useEffect(() => {
    getGroups();
    setLoading(true);
  }, []);

  useEffect(() => {
    if(isAdmin) {
      getAllUsers();
    }
    setLoading(false);
  }, [isAdmin]);

  // useEffect(() => {
  //   const timerId = setTimeout(() => {
  //     setLoading(false);
  //   }, 3000)
  // }, []);

  if(loading) {
    return null;
  }

  return (
    <Container>
      {/* <Navbar /> */}
      {/* <h1>Hi {username}</h1> */}
      {isAdmin && 
        <UserTable users={users}/>
      }
    </Container>
  )
}

export default Home