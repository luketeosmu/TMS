import { useState } from 'react';
import axios from 'axios';
import { useNavigate  } from 'react-router-dom';
const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    axios.defaults.withCredentials = true;
    const callApi = (event) => {
        event.preventDefault();

        axios.post("http://localhost:3000/auth/signUp", {
            username: username,
            password: password,
            email: email 
        })
        .then((response) => {
            console.log(response);
            if(response.success) {
                window.location('/');
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    const login = (event) => {
        event.preventDefault();
        axios.post("http://localhost:3000/auth/login", {
            username: username,
            password: password
        }).then((res) => {
            console.log(res.cookies);
            if(res.data.success) {
                console.log("login success redirect to home page");
                return navigate("/");
            } else {
                console.log("wrong username or password");
            }
        }).catch((error) => {
            console.log(error);
        })
    }
    return (
        <div>
            <div className="w-full max-w-xs">
                <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" action="submit" onSubmit={login}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        Username
                        </label>
                        <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                        </label>
                        <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        <p className="text-red-500 text-xs italic">Please choose a password.</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Sign In
                        </button>
                    </div>
                </form>
        </div>
    </div>
    )
}

export default Login