import axios from "axios";
import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const createUser = (e) => {
    e.preventDefault();
    console.log(email, username, password);
    // const data = {
    //   email: email,
    //   username: username,
    //   password: password,
    // };
    axios
      .post(
        "http://localhost:3001/api/register",
        {
          email,
          username,
          password,
        },
        {
          withCredentials: true,
        }
      )
      .then((response) => console.log(response.data))
      .catch((error) => console.error(error));
  };
  return (
    <>
      <div>
        <form onSubmit={createUser}>
          <p>register</p>
          email :<input onChange={(e) => setEmail(e.target.value)} />
          <br />
          username : <input onChange={(e) => setUsername(e.target.value)} />
          <br />
          password : <input onChange={(e) => setPassword(e.target.value)} />
          <br />
          <button type="submit">new account </button>
        </form>
      </div>
    </>
  );
};

export default Login;
