import React, { Component } from "react";
import axios from "axios";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = { name: "", email: "", password: "", role: "user" };
  }

  handleChange = (e) => this.setState({ [e.target.name]: e.target.value });

  handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/auth/register", this.state);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("name", res.data.name);
      localStorage.setItem("id", res.data.id);
      window.location.href = "/";
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  render() {
    return (
      <div style={{ padding: "50px", textAlign: "center" }}>
        <h2>Register</h2>
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="name" placeholder="Name" value={this.state.name} onChange={this.handleChange} />
          <br /><br />
          <input type="email" name="email" placeholder="Email" value={this.state.email} onChange={this.handleChange} />
          <br /><br />
          <input type="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange} />
          <br /><br />

          {/* Role selection */}
          <select name="role" value={this.state.role} onChange={this.handleChange}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          <br /><br />
          <button type="submit">Register</button>
        </form>
      </div>
    );
  }
}

export default Register;
