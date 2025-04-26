// Register.js
import React, { useState } from "react";
import { auth } from "./firebase-config";
import { createUserWithEmailAndPassword } from "firebase/auth";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Đăng ký thành công!");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <h2>Đăng Ký</h2>
      <form onSubmit={handleRegister}>
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
        <button type="submit">Đăng Ký</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Register;
