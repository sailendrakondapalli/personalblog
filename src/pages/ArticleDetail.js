import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function ArticleDetail() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem("id");
    const userName = localStorage.getItem("name");
    if (userId && userName) setCurrentUser({ id: userId, name: userName });
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/articles/${id}`)
      .then((res) => setArticle(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const handleLike = async () => {
    if (!currentUser) return alert("Please login first!");
    const res = await axios.post(`http://localhost:5000/articles/${id}/like`, {
      userId: currentUser.id,
    });
    setArticle((prev) => ({ ...prev, likes: res.data.likes }));
  };

  const handleShare = () => {
    const shareData = {
      title: article.title,
      text: "Check out this article!",
      url: window.location.href,
    };
    if (navigator.share) {
      navigator.share(shareData).catch((err) => console.error(err));
    } else {
      navigator.clipboard.writeText(shareData.url).then(() => alert("Link copied!"));
    }
  };

  const handleComment = async () => {
    if (!currentUser || !commentText) return;
    const res = await axios.post(`http://localhost:5000/articles/${id}/comment`, {
      userId: currentUser.id,
      text: commentText,
    });
    setArticle((prev) => ({ ...prev, comments: res.data }));
    setCommentText("");
  };

  if (!article) return <p>Loading...</p>;

  return (
    <div className="article-detail">
      {article.image && (
        <div className="article-detail-img">
  <img src={article.image} alt={article.title} />
</div>

      )}
      <h1>{article.title}</h1>
      <p>{new Date(article.date).toDateString()}</p>
      <div dangerouslySetInnerHTML={{ __html: article.description }} />

      {/* Likes */}
      <div style={{ marginTop: "20px" }}>
        <button onClick={handleLike}>
          👍 Like ({(article.likes || []).length})
        </button>
      </div>

      {/* Share */}
      <div style={{ marginTop: "20px" }}>
        <button onClick={handleShare}>🔗 Share</button>
      </div>

      {/* Comments */}
      <div style={{ marginTop: "20px" }}>
        <h3>Comments</h3>
        {(article.comments || []).map((c, i) => (
          <p key={i}>
            <strong>{c.user?.name || "User"}:</strong> {c.text}
          </p>
        ))}
        <input
          type="text"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Add a comment..."
        />
        <button onClick={handleComment}>Post</button>
      </div>
    </div>
  );
}

export default ArticleDetail;
