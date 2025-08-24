import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

class Body extends React.Component {
  constructor(props) {
    super(props);
    this.state = { articles: [] };
  }

  componentDidMount() {
    this.fetchArticles();
  }

  fetchArticles = () => {
    axios
      .get("http://localhost:5000/articles")   // 🔹 Localhost URL
      .then((res) => this.setState({ articles: res.data }))
      .catch((err) => console.error(err));
  };

  handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this article?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/articles/${id}`, {   // 🔹 Localhost URL
        headers: { Authorization: `Bearer ${token}` },
      });
      this.fetchArticles();
    } catch (err) {
      alert("Error deleting article!");
    }
  };

  render() {
    const isAdmin = localStorage.getItem("role") === "admin";

    return (
      <div className="body">
        <h2 className="section-title">Latest Articles</h2>

        {/* Admin Panel Link - only for admin */}
        {isAdmin && (
          <div style={{ marginBottom: "20px" }}>
            <Link to="/ap">
              <img src="/images/writing.png" alt="write"/>
            </Link>
          </div>
        )}

        <div className="articles">
          {this.state.articles.map((article) => (
            <div className="article-card" key={article._id}>
              {article.image && (
                <div className="article-img-container">
                  <img src={article.image} alt={article.title} className="article-img" />
                </div>
              )}
              <div className="article-content">
                <h3>{article.title}</h3>
                <p className="article-meta">
                  <span className="article-date">{new Date(article.date).toDateString()}</span>
                  <span className="article-author"> | Author: {article.author || "Unknown"}</span>
                </p>

                <div
                  className="article-preview"
                  dangerouslySetInnerHTML={{
                    __html: article.description
                      ? article.description.length > 200
                        ? article.description.substring(0, 200) + "..."
                        : article.description
                      : "No description available",
                  }}
                />

                <Link to={`/article/${article._id}`}>
                  <button className="readmore">Read More</button>
                </Link>

                {/* Delete Button - only visible for admin */}
                {isAdmin && (
                  <button
                    style={{ marginLeft: "10px", background: "red", color: "#fff" }}
                    onClick={() => this.handleDelete(article._id)}
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Body;
