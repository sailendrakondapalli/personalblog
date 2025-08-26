import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      openn: false,
      query: "",
      results: [],
      user: {
        name: localStorage.getItem("name") || null,
        role: localStorage.getItem("role") || null,
      },
    };
    this.sidebarRef = React.createRef();
  }

  componentDidMount() {
    document.addEventListener("click", this.handleClickOutside, true);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClickOutside, true);
  }

  handleClickOutside = (e) => {
    if (
      this.state.open &&
      this.sidebarRef.current &&
      !this.sidebarRef.current.contains(e.target) &&
      !e.target.closest(".hamburger")
    ) {
      this.setState({ open: false });
    }

    if (
      this.state.openn &&
      !e.target.closest(".usericon") &&
      !e.target.closest(".profile-dropdown")
    ) {
      this.setState({ openn: false });
    }
  };

  hamburger = () => {
    this.setState({ open: !this.state.open });
  };

  profile = () => {
    this.setState({ openn: !this.state.openn });
  };

  handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("name");
    localStorage.removeItem("id");

    // Update state
    this.setState({ user: { name: null, role: null }, openn: false });

    // Navigate to home
    window.location.href = "/";
  };

  handleSearchChange = async (e) => {
    const query = e.target.value;
    this.setState({ query });

    if (query.length > 1) {
      try {
        const res = await axios.get(
          `https://personalblogbackend-n60w.onrender.com/articles/search/${query}`
        );
        this.setState({ results: res.data });
      } catch (err) {
        console.error(err);
      }
    } else {
      this.setState({ results: [] });
    }
  };

  render() {
    const { user } = this.state;

    return (
      <div className="navbar">
        {/* Hamburger */}
        <div className="hamburger">
          <img
            src="/images/hamburger.png"
            alt="hamburger"
            onClick={this.hamburger}
          />
        </div>

        {/* Search */}
        <div className="search">
          <input
            type="search"
            placeholder="Search articles..."
            value={this.state.query}
            onChange={this.handleSearchChange}
          />
          {this.state.results.length > 0 && (
            <div className="search-dropdown">
              {this.state.results.map((article) => (
                <div key={article._id}>
                  <Link
                    to={`/article/${article._id}`}
                    onClick={() => this.setState({ query: "", results: [] })}
                  >
                    {article.title}
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* User profile */}
        <div className="usericon">
          <img
            src="/images/user.png"
            alt="user"
            onClick={this.profile}
          />
        </div>

        {this.state.openn && (
  <div className="profile-dropdown">
    {user.name ? (
      <>
        <p>My Profile</p>
        <p>Settings</p>
        <p onClick={this.handleLogout} style={{ cursor: "pointer" }}>
          Logout
        </p>
      </>
    ) : (
      <div className="auth-links">
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>
    )}
  </div>
)}


        {/* Sidebar */}
        <div
          className={`sidebar ${this.state.open ? "open" : ""}`}
          ref={this.sidebarRef}
        >
          <a href="/">Home</a>
          <a href="/about">About Author</a>
          <a href="/contact">Contact</a>
        </div>
      </div>
    );
  }
}

export default Nav;
