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
    axios.get("https://personalblogbackend-n60w.onrender.com/articles")
      .then(res => this.setState({ articles: res.data }))
      .catch(err => console.error(err));
  };

  handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this article?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`https://personalblogbackend-n60w.onrender.com/articles/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      this.fetchArticles();
    } catch (err) {
      alert("Error deleting article!");
    }
  };

  render() {
    return (
      <div className="body">
        <h2 className="section-title">Latest Articles</h2>
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

                {/* Delete button for author only */}
                {article.author === localStorage.getItem("name") && (
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
