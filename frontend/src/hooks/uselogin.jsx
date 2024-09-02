import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
    const [errMsg, setErrMsg] = useState(null);
    const [isLoading, setIsLoading] = useState(null);

    const { dispatch } = useAuthContext();

    const login = async (email, password) => {

        // login url
        const LOGIN_URL = `http://localhost:5002/api/user/login`;

        console.log(`login function called`);

        setIsLoading(true);
        setErrMsg(null);

        try {
            const response = await fetch(LOGIN_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            // Check response status
            if (!response.ok && (response.status === 400 || response.status === 404 || response.status === 401)) {
                setIsLoading(false);
                console.log(data.error)
                setErrMsg(data.error);
                return;
            }

            // Save user to localStorage
            localStorage.setItem('user', JSON.stringify(data));

            // Update the auth context
            dispatch({ type: 'LOGIN', payload: data });

            setIsLoading(false);
        } catch (err) {
            setErrMsg('No Server Response. Try again later.');
        }
    };

    return { login, isLoading, errMsg, setErrMsg }

};