import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
import icon from "../../assets/icon.png";
import Google from "../../assets/google-brands-solid.svg";
import Aboutauth from "./Aboutauth";
import { signup, login , googleLogin} from "../../action/auth";
import axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';
function Auth() {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSwitch = () => {
    setIsSignup(!isSignup);
    setName("");
    setEmail("");
    setPassword("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email && !password) {
      alert("Enter email and password");
    }
    if (isSignup) {
      if (!name) {
        alert("Enter a name to continue");
      }
      dispatch(signup({ name, email, password }, navigate));
    } else {
      dispatch(login({ email, password }, navigate));
    }
  };

  const Login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log("Google Login Successful:", tokenResponse);
      
      try {
        // Fetch user details using the access token
        const userInfo = await axios.get("https://www.googleapis.com/oauth2/v2/userinfo", {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        });
  
        console.log("User Info:", userInfo.data); // Check if data is received
  
        const userData = {
          name: userInfo.data.name,
          email: userInfo.data.email,
          googleId: userInfo.data.id,
        };
  
        // Dispatch Google Login Action
        dispatch(googleLogin(userData, navigate));
      } catch (error) {
        console.error("Error during Google login:", error);
      }
    },
    onError: (error) => console.log("Google Login Failed:", error),
  });
  
/**
  const Login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        // Fetch user details using the access token
        const userInfo = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo', {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        });
  
        const userData = {
          name: userInfo.data.name,
          email: userInfo.data.email,
          googleId: userInfo.data.id,
        };
  
        // Dispatch Google Login Action
        dispatch(googleLogin(userData, navigate));
      } catch (error) {
        console.error("Error during Google login:", error);
      }
    },
    onError: (error) => console.log("Google Login Failed:", error),
  });   **/
  

  return (
    <section className="auth-section">
      {isSignup && <Aboutauth />}
      <div className="auth-container-2">
        <img src={icon} alt="stack overflow" className="login-logo" />
        <form onSubmit={handleSubmit}>
          {isSignup && (
            <label htmlFor="name">
              <h4>Display Name</h4>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </label>
          )}
          <label htmlFor="email">
            <h4>Email</h4>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </label>
          <label htmlFor="password">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h4>Password</h4>
              {!isSignup && (
                <p style={{ color: "#007ac6", fontSize: "13px" }}>
                  forgot password?
                </p>
              )}
            </div>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </label>
          <button type="submit" className="auth-btn">
            {isSignup ? "Sign up" : "Log in"}
          </button>
          <div className="google-auth singlt-option" onClick={()=>Login()}>
            <img src={Google} alt="" />
            <p>Login with Google</p>
          </div>
        </form>
        <p>
          {isSignup ? "Already have an account?" : "Don't have an account?"}
          <button
            type="button"
            className="handle-switch-btn"
            onClick={handleSwitch}
          >
            {isSignup ? "Log in" : "sign up"}
          </button>
        </p>
      </div>
    </section>
  );
}

export default Auth;
