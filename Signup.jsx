import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./App.css";
function Signup()
{
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () =>
  {
    if (!username || !email || !password)
    {
      alert("All fields are required");
      return;
    }

    try
    {
      await axios.post(
        "http://localhost:3001/signup",
        {
          username,
          email,
          password
        }
      );

      alert("Signup successful. Please login.");
      navigate("/");
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
    <div className="container">
      <h1>Signup</h1>

      <input
        type="text"
        placeholder="Enter username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />

      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Enter password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />

      <button onClick={handleSignup}>
        Signup
      </button>

      <p>
        Already have an account?
        <Link to="/"> Login</Link>
      </p>
    </div>
  );
}

export default Signup;
