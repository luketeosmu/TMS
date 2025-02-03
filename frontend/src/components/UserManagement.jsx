import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container } from "@mui/material";
import UserTable from "./UserTable";
import GroupsTable from "./GroupsTable";
import Navbar from "./Navbar";
import { UserGroupContext } from "../contexts/UserGroupContext";

const UserManagement = () => {
    axios.defaults.withCredentials = true;
    const navigate = useNavigate();
    const { userGroups } = useContext(UserGroupContext);
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState([]);
    const [groups, setGroups] = useState([]);

    // const checkToken = () => {
    //     axios
    //         .post("http://localhost:3000/auth/protected")
    //         .then((res) => {
    //             if (res.data.success) {
    //                 console.log("is logged in");
    //             } else {
    //                 return navigate("/login");
    //             }
    //         })
    //         .catch((error) => {
    //             console.log(
    //                 error +
    //                     " unauthorized in User Management Page redirect to login page"
    //             );
    //             return navigate("/login");
    //         });
    // };

    const getAllUsers = () => {
        axios
            .get("http://localhost:3000/users/getUsersWithGroups")
            .then((res) => {
                console.log(res);
                if (res.data.success) {
                    let userArr = res.data.users;
                    const filteredUsers = userArr.filter((user) => user.User_Username.trim() !== '');
                    console.log(filteredUsers);
                    setUsers(filteredUsers);
                    // setUsers(res.data.users);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getAllGroups = () => {
        axios.get("http://localhost:3000/users/getAllGroups").
        then((res) => {
            console.log(res);
            if (res.data.success) {
                setGroups(res.data.groups);
            }
        }).catch((error) => {
          console.log(error);
        })
    };

    useEffect(() => {
        getAllGroups();
        getAllUsers();
        setLoading(false);
    }, [userGroups]);

    if (loading) {
        return null;
    }

    return (
        <Container>
            <Navbar />
            <GroupsTable groups={groups} />
            <UserTable users={users} setUsers={setUsers} groups={groups}/>
        </Container>
    );
};

export default UserManagement;
