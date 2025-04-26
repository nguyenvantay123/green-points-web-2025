// Login.js
import React, { useState } from "react";
import { auth } from "./firebase-config";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Đăng nhập thành công!");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Đăng Nhập</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Đăng Nhập</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Login;
