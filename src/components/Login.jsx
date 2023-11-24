import React, { useState } from "react";
import axios from 'axios';
import { Input, Button, message } from 'antd';
import { useHistory } from "react-router-dom";
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const handleLogin = (e) => {
    e.preventDefault();
    const apiUrl = 'http://localhost:3000/api/login';
    const loginData = {
      username: username,
      password: password,
    };

    axios.post(apiUrl, loginData)
      .then(response => {
        localStorage.setItem("isLoggedIn", "true");
        message.success("Login success");
        history.push('/');
      })
      .catch(error => {
        message.error(error.message);
        console.error('Error:', error.response ? error.response.data : error.message);
      });
  };
  return (
    <div className="container">
      <form className="login-form">
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            onChange={(e) => setUsername(e.target.value)}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button type="primary" onClick={handleLogin} style={{ marginTop: '10px', width: '100%' }}>
          Log in
        </Button>
      </form>
    </div >
  );
}

export default Login;
