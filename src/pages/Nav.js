import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      openn: false,
      query: "",
      results: [],
    };
  }

  hamburger = () => {
    this.setState({ open: !this.state.open });
  };

  profile = () => {
    this.setState({ openn: !this.state.openn });
  };

  handleSearchChange = async (e) => {
    const query = e.target.value;
    this.setState({ query });

    if (query.length > 1) {
      try {
        const res = await axios.get(`http://localhost:5000/articles/search/${query}`);
        this.setState({ results: res.data });
      } catch (err) {
        console.error(err);
      }
    } else {
      this.setState({ results: [] });
    }
  };

  render() {
    return (
      <div className="navbar" style={{ position: "relative", padding: "10px" }}>
        {/* Hamburger */}
        <div className="hamburger">
          <img
            src="/images/hamburger.png"
            alt="hamburger"
            onClick={this.hamburger}
          />
        </div>
        {this.state.open && <div>{/* Add hamburger menu items here */}</div>}

        {/* Search */}
        <div
          className="search"
          style={{ display: "inline-block", marginLeft: "20px", position: "relative" }}
        >
          <input
            type="search"
            placeholder="Search articles..."
            value={this.state.query}
            onChange={this.handleSearchChange}
            style={{ padding: "5px", width: "250px" }}
          />
          {this.state.results.length > 0 && (
            <div
              style={{
                position: "absolute",
                top: "100%", // directly below the input
                left: "0",
                width: "100%", // same width as input
                background: "#fff",
                border: "1px solid #ccc",
                maxHeight: "200px",
                overflowY: "auto",
                zIndex: 100,
              }}
            >
              {this.state.results.map((article) => (
                <div key={article._id} style={{ padding: "5px 10px" }}>
                  <Link
                    to={`/article/${article._id}`}
                    onClick={() => this.setState({ query: "", results: [] })}
                    style={{ textDecoration: "none", color: "#000" }}
                  >
                    {article.title}
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* User profile */}
        <div className="usericon" style={{ display: "inline-block", marginLeft: "20px" }}>
          <img src="/images/user.png" alt="user" onClick={this.profile} />
        </div>
        {this.state.openn && <p>My Profile</p>}
      </div>
    );
  }
}

export default Nav;
