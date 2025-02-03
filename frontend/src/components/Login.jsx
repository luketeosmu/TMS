import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { UserGroupContext } from "../contexts/UserGroupContext";
import { UsernameContext } from "../contexts/UsernameContext";

const Login = () => {
    axios.defaults.withCredentials = true;
    const navigate = useNavigate();
    const { setUserGroups } = useContext(UserGroupContext);
    const { setUsername } = useContext(UsernameContext);
    const [tempUsername, setTempUsername] = useState("");
    const [password, setPassword] = useState("");

    const login = (event) => {
        event.preventDefault();
        console.log(tempUsername);
        console.log(password);
        axios
            .post("http://localhost:3000/auth/login", {
                username: tempUsername,
                password: password,
            })
            .then((res) => {
                console.log(res.cookies);
                if (res.data.success) {
                    console.log("login success redirect to home page");
                    getGroups();
                    // setIsLoggedIn(true);
                    navigate("/");
                } else {
                    console.log("wrong username or password");
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getGroups = () => {
        axios
            .get("http://localhost:3000/users/getGroupsByUser")
            .then((res) => {
                console.log(res);
                if (!res.data.success) {
                    console.log("unauthorized");
                    navigate("/login");
                }
                console.log(res.data);
                setUsername(res.data.username);
                setUserGroups(res.data.groups);
            })
            .catch((error) => {
                console.log(error);
                navigate("/login");
            });
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>
                <Box
                    component="form"
                    onSubmit={login}
                    noValidate
                    sx={{ mt: 1 }}
                >
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        onChange={(e) => setTempUsername(e.target.value)}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid>
                            <Link href="#" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};

export default Login;
