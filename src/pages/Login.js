import React, { Component } from "react";
import axios from "axios";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "" };
  }

  handleChange = (e) => this.setState({ [e.target.name]: e.target.value });

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/auth/login", this.state);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("name", res.data.name);
      localStorage.setItem("id", res.data.id);

      if (res.data.role === "admin") window.location.href = "/";
      else window.location.href = "/";
    } catch (err) {
      alert(err.response?.data?.message || "Login failed!");
    }
  };

  render() {
    return (
      <div style={{ padding: "50px", textAlign: "center" }}>
        <h2>Login</h2>
        <form onSubmit={this.handleSubmit}>
          <input type="email" name="email" placeholder="Email" value={this.state.email} onChange={this.handleChange} />
          <br /><br />
          <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} />
          <br /><br />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}

export default Login;
