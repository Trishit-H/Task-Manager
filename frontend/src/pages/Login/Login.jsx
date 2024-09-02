import { useEffect, useRef, useState } from 'react';
import './Login.css';

import { useLogin } from '../../hooks/uselogin';

import axios from 'axios';
import { Link } from 'react-router-dom';

function Login() {

    const LOGIN_ROUTE = `http://localhost:5002/api/user/login`;

    const { login, errMsg, isLoading, setErrMsg } = useLogin();

    const emailRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        emailRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [email, password]);

    async function handleSubmit(e) {
        e.preventDefault();

        await login(email, password);
    }


    return (
        <>
            <div className="login-form-container">
                <div className="card">
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
                    <div className="card_title">
                        <h1>Login to your Account</h1>
                        <span>Don't have an account? <Link to="/signup">Create one here</Link></span>
                    </div>
                    <div className="form">
                        <form autoComplete='off' onSubmit={handleSubmit}>

                            {/* Email field*/}
                            <input type="email"
                                placeholder="Email"
                                id="email"
                                ref={emailRef}
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                required />

                            {/* Password field */}
                            <input
                                type="password"
                                placeholder="Password"
                                id="password"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                required />

                            <button disabled={isLoading}>Log In</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
};

export default Login;