import { useState } from "react";
import axios from "axios";
import "./App.css";
function CreatePost({ onPostCreated })
{
  const [content, setContent] = useState("");
  const [media, setMedia] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));

  const handlePost = async () =>
  {
    if (!user || !user._id)
    {
      alert("Please login again");
      return;
    }

    if (!content && !media)
    {
      alert("Post cannot be empty");
      return;
    }

    const formData = new FormData();
    formData.append("userId", user._id);
    formData.append("username", user.username);
    formData.append("content", content);
    if (media)
    {
      formData.append("media", media);
    }

    try
    {
      await axios.post(
        "http://localhost:3001/create-post",
        formData,
        {
          headers:
          {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      setContent("");
      setMedia(null);
      onPostCreated();
    }
    catch (err)
    {
      if (err.response)
      {
        alert(err.response.data);
      }
      else
      {
        alert("Server not reachable");
      }
    }
  };

  return (
    <div className="create-post">
      <textarea
        placeholder="What's on your mind?"
        value={content}
        onChange={e => setContent(e.target.value)}
      />

      <input
        type="file"
        accept="image/*,video/*"
        onChange={e => setMedia(e.target.files[0])}
      />

      <button onClick={handlePost}>
        Post
      </button>
    </div>
  );
}

export default CreatePost;
