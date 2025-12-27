import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./App.css";
export default function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [n, setN] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3001/notifications/${user._id}`)
      .then(r => setN(r.data));
  }, []);

  return (
    <div>
      <h2 onClick={() => nav("/home")}>MyGram</h2>
      <span>🔔 {n.length}</span>
      <button onClick={() => { localStorage.clear(); nav("/"); }}>Logout</button>
    </div>
  );
}
