import React, { useState } from 'react';
import { auth } from './firebase-config'; // Đảm bảo đường dẫn đúng
import { createUserWithEmailAndPassword } from 'firebase/auth';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Kiểm tra mật khẩu có đủ yêu cầu không
  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleRegister = async () => {
    if (!validatePassword(password)) {
      setError('Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt!');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('Đăng ký thành công!');
      // Tiến hành chuyển hướng hoặc cập nhật giao diện sau khi đăng ký thành công
    } catch (err) {
      setError(err.message);
      console.error("Lỗi đăng ký:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Đăng Ký</h2>
      <div>
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
      </div>
      <div>
        <input 
          type="password" 
          placeholder="Mật khẩu" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <button onClick={handleRegister} disabled={loading}>
        {loading ? 'Đang đăng ký...' : 'Đăng Ký'}
      </button>
    </div>
  );
};

export default Register;
