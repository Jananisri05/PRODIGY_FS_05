import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./App.css";
function Login()
{
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () =>
  {
    if (!email || !password)
    {
      alert("Please fill all fields");
      return;
    }

    try
    {
      const res = await axios.post(
        "http://localhost:3001/login",
        {
          email,
          password
        }
      );

      if (!res.data || !res.data._id)
      {
        alert("Invalid response from server");
        return;
      }

      localStorage.setItem("user", JSON.stringify(res.data));
      navigate("/home");
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
      <h1>Login</h1>

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

      <button onClick={handleLogin}>
        Login
      </button>

      <p>
        Do not have an account?
        <Link to="/signup"> Signup</Link>
      </p>
    </div>
  );
}

export default Login;
