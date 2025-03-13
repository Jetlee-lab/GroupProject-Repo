import React,{useState} from 'react';
import{userHISTORY} from 'react-router-dom';
import'./styles.css';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    consthistory = useHistory();

    const handleLogin = (e) => {
        e.preventDefault();
        if(username === 'admin' && password === 'password'){
            history.push('/dashboard');
        } else {
            alert('Invalid credentials');
        }
    }

function Login() {
  return (
    <div>
        <form onSubmit={handleLogin}>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <button type="submit">Login</button>
        </form>
        <p>Don't have an account? <a href="/register">Register here</a></p>
    </div>
  )
}

export default Login;