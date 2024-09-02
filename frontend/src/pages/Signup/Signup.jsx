import './Signup.css';

import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSignup } from '../../hooks/useSignup';

function Signup() {

    const usernameRef = useRef(); //we will use to focus on the user input when the componenet loads

    const errRef = useRef(); //for annoucing any errors if we get to screen readers for accessibility

    // Importing signup, isLoading and error from useSignup hook
    const { signup, isLoading, error, setError } = useSignup();

    // regex for validating username and password
    const USERNAME_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
    const EMAIL_REGEX = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

    const [username, setUsername] = useState(''); //for storing user name and setting it
    const [validUsername, setValidUsername] = useState(false); //to check for valid username
    const [usernameFocus, setUsernameFocus] = useState(false); //to check whether the focus is on the user input

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);


    const [password, setPassword] = useState(''); //for storing user password and setting it
    const [validPassword, setValidPassword] = useState(false); //to check for valid pasword
    const [passwordFocus, setPasswordFocus] = useState(false); //to check whether the focus is on the user's password input

    const [matchPassword, setMatchPassword] = useState(''); //for storing user confirm password and setting it
    const [validMatch, setValidMatch] = useState(false); //to check for confirm password match
    const [matchFocus, setMatchFocus] = useState(false); //to check whether the focus is on the user's confirm password input

    const [errMsg, setErrMsg] = useState(''); //state for error messages
    const [success, setSuccess] = useState(false); //state for success messages

    // this will set the focus on the user name input field when our page loads
    useEffect(() => {
        usernameRef.current.focus();
    }, []);

    // this is for validating the user name. whenever the name changes this useEffect hook wuill run
    useEffect(() => {
        const result = USERNAME_REGEX.test(username)
        setValidUsername(result)
    }, [username]);

    // this is for validating the email. whenever the name changes this useEffect hook wuill run
    useEffect(() => {
        const result = EMAIL_REGEX.test(email)
        setValidEmail(result);
    }, [email]);

    useEffect(() => {
        const result = PWD_REGEX.test(password);
        setValidPassword(result);
        const match = password === matchPassword; //returns a boolean checking whether the password and confirm password match
        setValidMatch(match)
    }, [password, matchPassword]);

    // after the error message is displayed, the user changes the input or any other field.this hook will run anytime those
    // input fields are changed and the error message are cleared.
    useEffect(() => {
        setError('');
    }, [username, email, password, matchPassword]);

    async function handleSubmit(e) {
        e.preventDefault();

        await signup(username, email, password)

        // setSuccess(true);

        // if (success) {
        //     setUsername('');
        //     setEmail('');
        //     setPassword('');
        //     setMatchPassword('');
        // }
    }


    return (
        <>
            <div className="signup-form-container">
                <div className="card">
                    <p ref={errRef} className={error ? "errmsg" : "offscreen"} aria-live="assertive">{error}</p>
                    <div className="card_title">
                        <h1>Create Account</h1>
                        <span>Already have an account? <Link to="/login">Log in</Link></span>
                    </div>
                    <div className="form">
                        <form autoComplete='off' onSubmit={handleSubmit}>
                            {/* username field */}
                            <input
                                type="text"
                                // name="username" 
                                id="username"
                                placeholder="Username"
                                ref={usernameRef}
                                onChange={(e) => setUsername(e.target.value)} //ties the user input to the user name state
                                value={username}
                                required
                                onFocus={() => setUsernameFocus(true)}
                                onBlur={() => setUsernameFocus(false)} />
                            <p id="uidnote" className={usernameFocus && username && !validUsername ? "instructions" : "offscreen"}>
                                4 to 24 characters.<br />
                                Must begin with a letter.<br />
                                Letters, numbers, underscores, hyphens allowed.
                            </p>

                            {/* Email field*/}
                            <input type="email"
                                // name="email" 
                                placeholder="Email"
                                id="email"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                required
                                onFocus={() => setEmailFocus(true)}
                                onBlur={() => setEmailFocus(false)} />
                            <p className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
                                Must be a valid email address.
                            </p>

                            {/* Password field */}
                            <input
                                type="password"
                                // name="password" 
                                placeholder="Password"
                                id="password"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                required
                                onFocus={() => setPasswordFocus(true)}
                                onBlur={() => setPasswordFocus(false)} />
                            <p className={passwordFocus && password && !validPassword ? "instructions" : "offscreen"}>
                                8 to 24 characters.<br />
                                Must include uppercase and lowercase letters, a number and a special character.<br />
                                Allowed special characters: <span>!</span> <span>@</span> <span>#</span> <span>$</span> <span>%</span>
                            </p>

                            {/* Confirm password field */}
                            <input
                                type="password"
                                // name="confirmPassword" 
                                placeholder="Confirm Password"
                                id="confirmPassword"
                                onChange={(e) => setMatchPassword(e.target.value)}
                                value={matchPassword}
                                required
                                onFocus={() => setMatchFocus(true)}
                                onBlur={() => setMatchFocus(false)} />
                            <p className={matchFocus && matchPassword && !validMatch ? "instructions" : "offscreen"}>
                                Password does not match.
                            </p>


                            <button disabled={isLoading || !validUsername || !validPassword || !validMatch ? true : false}>Sign Up</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
};

export default Signup;