import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const formStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    };
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = {
                email: email,
                password: password
            }
            const response = await fetch('http://localhost:9999/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
           

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Login failed');
            }

            const responseData = await response.json();
            localStorage.setItem('accessToken', responseData.accessToken);
            localStorage.setItem('refreshToken', responseData.refreshToken);

            console.log('Login success');
            navigate('/');
        } catch (error) {
            console.log('Login error:', error);
            setError(error.message || 'An error occurred during login');
        }
    };



    return (
        <div className="container">
            <h1 className="text-4xl font-bold">Login</h1>
            {error && <p className="text-danger">{error}</p>}
            <form style={formStyle} onSubmit={handleSubmit}>
                <label htmlFor="email">Email:</label><br />
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                /><br />
                <label htmlFor="password">Password:</label><br />
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                /><br />
                <input type="submit" value="Login" />
            </form>
        </div>
    );
}

export default Login;
