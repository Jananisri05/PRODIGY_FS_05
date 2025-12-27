import { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const [posts, setPosts] = useState([]);
  const [commentText, setCommentText] = useState({});
  const user = JSON.parse(localStorage.getItem("user"));

  const fetchPosts = async () => {
    const res = await axios.get("http://localhost:3001/posts");
    setPosts(res.data);
  };

  useEffect(() => { fetchPosts(); }, []);

  const likePost = async (id) => {
    await axios.put(`http://localhost:3001/like/${id}`, { userId: user._id });
    fetchPosts();
  };

  const addComment = async (id) => {
    await axios.post(`http://localhost:3001/comment/${id}`, {
      userId: user._id,
      username: user.username,
      text: commentText[id]
    });
    setCommentText({ ...commentText, [id]: "" });
    fetchPosts();
  };

  return (
    <div>
      {posts.map(p => (
        <div key={p._id}>
          <h4>{p.username}</h4>
          <p>{p.content}</p>

          {p.media && (p.media.endsWith(".mp4")
            ? <video src={`http://localhost:3001${p.media}`} controls width="300" />
            : <img src={`http://localhost:3001${p.media}`} width="300" />)}

          <button onClick={() => likePost(p._id)}>❤️ {p.likes.length}</button>

          {p.comments.map((c, i) => (
            <p key={i}><b>{c.username}</b> {c.text}</p>
          ))}

          <input
            value={commentText[p._id] || ""}
            onChange={e => setCommentText({ ...commentText, [p._id]: e.target.value })}
          />
          <button onClick={() => addComment(p._id)}>Comment</button>
        </div>
      ))}
    </div>
  );
}
export default Home;
