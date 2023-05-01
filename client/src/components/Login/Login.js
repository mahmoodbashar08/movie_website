import "./Login.css";
import "./flip-transition.css";
import axios from "axios";
import { UploadOutlined } from "@ant-design/icons";
// import { Upload } from "antd";
import ImgCrop from "antd-img-crop";
import { Button, Input, message, Upload } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Card({ onClick }) {
  const navigate = useNavigate();
  const [registerationEmail, setRegisterationEmail] = useState("");
  const [registerationUsername, setRegisterationUsername] = useState("");
  const [registerationPassword, setRegisterationPassword] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginUsername, setLoginUsername] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [sucessLogin, setSucessLogin] = useState(false);
  useEffect(() => {
    if (sucessLogin === true) {
      navigate("/");
      window.location.reload();
    }
  }, [sucessLogin]);
  const createUser = (e) => {
    e.preventDefault();
    console.log(
      registerationEmail,
      registerationUsername,
      registerationPassword,
      selectedFile
    );
    const formData = new FormData();
    formData.append("email", registerationEmail);
    formData.append("username", registerationUsername);
    formData.append("password", registerationPassword);
    formData.append("profileImage", selectedFile);

    axios
      .post("http://localhost:3001/api/register", formData)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => console.error(error));
  };
  const login = (e) => {
    e.preventDefault();
    console.log(loginEmail, loginUsername, loginPassword);
    axios
      .post("http://localhost:3001/api/login", {
        username: loginUsername,
        password: loginPassword,
      })
      .then((response) => {
        console.log(response.data);
        window.localStorage.setItem("useraccestoken", response.data.token);
        setSucessLogin(true);
      })
      .catch((error) => console.error(error));
  };
  const handleFileChange = (event) => {
    console.log(event.target.files[0]);
    setSelectedFile(event.target.files[0]);
  };

  return (
    <div className="card">
      <div className="card-back">
        {/* Back */}
        <div className="center">
          <form onSubmit={login}>
            <p>login</p>
            {/* email :<input onChange={(e) => setLoginEmail(e.target.value)} /> */}
            username
            {/* <input onChange={(e) => setLoginUsername(e.target.value)} /> */}
            <div>
              <Input
                placeholder="enter a username"
                onChange={(e) => setLoginUsername(e.target.value)}
              />
            </div>
            {/* <br /> */}
            password
            {/* <input onChange={(e) => setLoginPassword(e.target.value)} /> */}
            <div>
              <Input
                placeholder="enter your password"
                onChange={(e) => setLoginPassword(e.target.value)}
              />
            </div>
            <br />
            <Button htmlType="submit">login</Button>
            {/* <button type="submit">login</button> */}
            <br />
            dont hava an accound yet ?
            <div className="cursor" onClick={onClick}>
              register
            </div>
          </form>
        </div>
      </div>
      <div className="card-front">
        {/* Front */}
        <div className="center">
          <form className="width" onSubmit={createUser}>
            <p>register</p>
            {/* email : */}{" "}
            <div>
              <Input
                placeholder="enter an email"
                onChange={(e) => setRegisterationEmail(e.target.value)}
              />
            </div>
            {/* <input onChange={(e) => setRegisterationEmail(e.target.value)} /> */}
            <br />
            {/* username :{" "} */}
            <div>
              <Input
                placeholder="enter a username"
                onChange={(e) => setRegisterationUsername(e.target.value)}
              />
            </div>
            {/* <input onChange={(e) => setRegisterationUsername(e.target.value)} /> */}
            <br />
            {/* password :{" "} */}
            <div>
              <Input
                placeholder="enter an password"
                onChange={(e) => setRegisterationPassword(e.target.value)}
              />
            </div>
            {/* <input onChange={(e) => setRegisterationPassword(e.target.value)} /> */}
            {/* <br /> */}
            <div>
              profile image:
              <input type="file" onChange={handleFileChange} />
            </div>
            {/* <input type="file" onChange={handleFileChange} /> */}
            {/* <br /> */}
            <br />
            {/* <button type="submit">new account </button> */}
            <div>
              <Button htmlType="submit">new account</Button>
            </div>
            <br />
            <br />
            already have an account ?
            <div className="cursor" onClick={onClick}>
              login
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Card;
