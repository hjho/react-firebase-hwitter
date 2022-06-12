import { auth } from "fbaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";

const AuthForm = () => {
    const [newAccount, setNewAccount] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    
    const toggleAccount = () => setNewAccount((prev) => !prev);

    const onChange = (event) => {
        const {target: {name, value}} = event;
        if(name === "email") {
            setEmail(value);
        } else if(name === "password") {
            setPassword(value);
        }
    }
    // App SignIn and SignUp
    const firebaseSign = async(event) => {
        event.preventDefault();
        try {
            if(newAccount) {
                // 파이어베이스 ID 생성.
                await createUserWithEmailAndPassword(auth, email, password);
            } else {
                // 파이어베이스 로그인.
                await signInWithEmailAndPassword(auth, email, password);
            }
        } catch (error) {
            setError(error.message);
        }
    }

    return (
    <>
        <form onSubmit={firebaseSign} className="container">
            <input className="authInput" name="email" type="email" placeholder="Email" required value={email} onChange={onChange} />
            <input className="authInput" name="password" type="password" placeholder="Password" required value={password} onChange={onChange} />
            <input className="authInput authSubmit" type="submit" value={newAccount ? "Create Account" : "Log In"}/>
            {error && <span className="authError">{error}</span>}
        </form>
        <span onClick={toggleAccount} className="authSwitch">{newAccount ? "Sign in" : "CreateAccount"}</span>
    </>
    )
}

export default AuthForm;