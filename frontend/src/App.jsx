import {
    Route,
    Routes,
    useNavigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import Login from "./components/Login";
import axios from "axios";
import UserManagement from "./components/UserManagement";
import Home from "./components/Home";
import { UserGroupContext } from "./contexts/UserGroupContext";
import { UsernameContext } from "./contexts/UsernameContext";

function App() {
    const navigate = useNavigate();
    const [userGroups, setUserGroups] = useState([]);
    const [username, setUsername] = useState("");
    const [isAuthorized, setIsAuthorized] = useState(true);
    const getGroups = () => {
        axios
            .get("http://localhost:3000/users/getGroupsByUser")
            .then((res) => {
                console.log(res);
                if (!res.data.success) {
                    console.log("unauthorized");
                    setIsAuthorized(false);
                }
                console.log(res.data);
                setUsername(res.data.username);
                setUserGroups(res.data.groups);
            })
            .catch((error) => {
                setIsAuthorized(false);
                console.log(error);
            });
    };

    useEffect(() => {
        getGroups();
    }, []);

    useEffect(() => {
        if (!isAuthorized) {
            navigate("/login");
        }
    }, [isAuthorized]);

    return (
        <>
            <UserGroupContext.Provider value={{ userGroups, setUserGroups }}>
            <UsernameContext.Provider value={{ username, setUsername }}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/userManagement" element={<UserManagement />} />
                </Routes>
            </UsernameContext.Provider>
            </UserGroupContext.Provider>
        </>
    );
}

export default App;
