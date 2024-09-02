import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);

    const { dispatch } = useAuthContext();

    const signup = async (username, email, password) => {

        // Sign up url
        const SIGNUP_URL = `http://localhost:5002/api/user/signup`;

        console.log(`signup function called`);

        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(SIGNUP_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password }),
            });

            const data = await response.json();

            // Check response status
            if (!response.ok && response.status === 409) {
                setIsLoading(false);
                setError(data.error);
                return;
            }

            // Save user to localStorage
            localStorage.setItem('user', JSON.stringify(data));

            // Update the auth context
            dispatch({ type: 'LOGIN', payload: data });

            setIsLoading(false);
        } catch (err) {
            setError('No Server Response. Try again later.');
        }
    };

    return { signup, isLoading, error, setError }

};