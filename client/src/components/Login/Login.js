import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [registerationEmail, setRegisterationEmail] = useState("");
  const [registerationUsername, setRegisterationUsername] = useState("");
  const [registerationPassword, setRegisterationPassword] = useState("");

  const [loginEmail, setLoginEmail] = useState("");
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const createUser = (e) => {
    e.preventDefault();
    console.log(
      registerationEmail,
      registerationUsername,
      registerationPassword
    );
    // const data = {
    //   email: email,
    //   username: username,
    //   password: password,
    // };
    axios
      .post("http://localhost:3001/api/register", {
        email: registerationEmail,
        username: registerationUsername,
        password: registerationPassword,
      })
      .then((response) => console.log(response.data))
      .catch((error) => console.error(error));
  };
  const login = (e) => {
    e.preventDefault();
    console.log(loginEmail, loginUsername, loginPassword);
    axios
      .post(
        "http://localhost:3001/api/login",
        {
          // registerationEmail,
          username: registerationUsername,
          password: registerationPassword,
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        console.log(response.data);
        // window.localStorage.setItem("useraccestoken",response.data.token);
        navigate("/");
      })
      .catch((error) => console.error(error));
  };
  return (
    <>
      <div>
        <form onSubmit={createUser}>
          <p>register</p>
          email :
          <input onChange={(e) => setRegisterationEmail(e.target.value)} />
          <br />
          username :{" "}
          <input onChange={(e) => setRegisterationUsername(e.target.value)} />
          <br />
          password :{" "}
          <input onChange={(e) => setRegisterationPassword(e.target.value)} />
          <br />
          <button type="submit">new account </button>
        </form>
      </div>
      <br />
      <br />
      <div>
        <form onSubmit={login}>
          <p>login</p>
          {/* email :<input onChange={(e) => setLoginEmail(e.target.value)} /> */}
          username :{" "}
          <input onChange={(e) => setLoginUsername(e.target.value)} />
          <br />
          password :{" "}
          <input onChange={(e) => setLoginPassword(e.target.value)} />
          <br />
          <button type="submit">login</button>
        </form>
      </div>
    </>
  );
};

export default Login;
