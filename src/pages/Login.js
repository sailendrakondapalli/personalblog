import React, { Component } from "react";
import axios from "axios";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { email: "", password: "", error: "" };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value, error: "" });
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = this.state;

    if (!email || !password) {
      this.setState({ error: "Email and password are required!" });
      return;
    }

    try {
      const res = await axios.post(
        "https://personalblogbackend-n60w.onrender.com/auth/login",
        { email, password }
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("name", res.data.name);
      localStorage.setItem("id", res.data.id);

      // Redirect based on role
      window.location.href = "/";
    } catch (err) {
      // Show server error message if available
      this.setState({
        error: err.response?.data?.message || "Login failed! Please try again.",
      });
      console.error("Login error:", err.response?.data || err.message);
    }
  };

  render() {
    return (
      <div style={{ padding: "50px", textAlign: "center" }}>
        <h2>Login</h2>
        <form onSubmit={this.handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleChange}
          />
          <br /><br />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <br /><br />
          <button type="submit">Login</button>
        </form>

        {this.state.error && (
          <p style={{ color: "red", marginTop: "20px" }}>{this.state.error}</p>
        )}
      </div>
    );
  }
}

export default Login;
