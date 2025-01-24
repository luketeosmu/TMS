import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import Login from './components/Login';
import Home from './components/Home';
import Navbar from './components/Navbar';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setIsLoggedIn] = useState(false);
  return (
    <>
      {loggedIn && <Navbar />}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login username={username} setUsername={setUsername} password={password} setPassword={setPassword} setIsLoggedIn={setIsLoggedIn}/>}>
            {/* <Route path="login" element={<Login />} /> */}
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
