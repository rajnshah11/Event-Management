import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux"; 
import { useNavigate } from "react-router-dom";
import { login as loginAction } from "../../store/authSlice";
import { loginUser, signUpUser } from "../../controller/authContoller/authController.js";
import "./Auth.css";

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const emailRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const validateForm = () => {
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const confirmPassword = confirmPasswordRef.current?.value;

        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailPattern.test(email)) {
            return "Please enter a valid email address.";
        }
        if (password.length < 6) {
            return "Password should be at least 6 characters long.";
        }
        if (!isLogin && password !== confirmPassword) {
            return "Passwords do not match.";
        }
        return null;
    };

    const handleResponse = (userData) => {
        if (isLogin) {
            const { token, userId } = userData;
            dispatch(loginAction({ token, userId }));
            navigate("/events");
        } else {
            setIsLogin(true);
            setErrorMessage("User created! Please log in.");
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);  // Start loading
        const error = validateForm();
        if (error) {
            setErrorMessage(error);
            setIsLoading(false);
            return;
        }

        const email = emailRef.current.value;
        const password = passwordRef.current.value;

        try {
            const userData = isLogin
                ? await loginUser(email, password)
                : await signUpUser(email, password);
            handleResponse(userData);
        } catch (error) {
            setErrorMessage(error.message || "Something went wrong.");
            console.error("Login/Signup error:", error);
        } finally {
            setIsLoading(false);  // End loading
        }
    };

    const handleSwitchMode = () => {
        setIsLogin((prevState) => !prevState);
        setErrorMessage("");
    };

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>{isLogin ? "Login" : "Sign Up"}</h2>
                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="form-control">
                        <label htmlFor="email">E-mail</label>
                        <input type="email" id="email" ref={emailRef} required />
                    </div>

                    <div className="form-control">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" ref={passwordRef} required />
                    </div>

                    {!isLogin && (
                        <div className="form-control">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input type="password" id="confirmPassword" ref={confirmPasswordRef} required />
                        </div>
                    )}

                    {errorMessage && <p className="error-message">{errorMessage}</p>}

                    <button type="submit" disabled={isLoading}>
                        {isLoading ? "Processing..." : isLogin ? "Login" : "Sign Up"}
                    </button>
                </form>

                <button className="switch-button" onClick={handleSwitchMode}>
                    {isLogin ? "Switch to Signup" : "Switch to Login"}
                </button>
            </div>
        </div>
    );
};

export default AuthPage;
