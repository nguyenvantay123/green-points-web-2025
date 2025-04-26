// src/LoginForm.js
import React, { useState } from 'react';
import { auth } from '../firebase-config';
import { signInWithEmailAndPassword } from 'firebase/auth';

const LoginForm = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user); // Đăng nhập xong thì lưu user
      alert('Đăng nhập thành công!');
    } catch (error) {
      console.error(error.message);
      alert('Sai email hoặc mật khẩu!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Đăng Nhập</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Mật khẩu"
      />
      <button onClick={handleLogin} disabled={loading}>
        {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
      </button>
    </div>
  );
};

export default LoginForm;
