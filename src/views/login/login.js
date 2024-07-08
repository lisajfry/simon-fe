import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Impor useNavigate dari react-router-dom
import './login.css'; // Impor file CSS yang berisi styling

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate(); // Dapatkan fungsi navigate

  const handleSubmit = (e) => {
    e.preventDefault();
    // Proses login di sini (misalnya, validasi email dan kata sandi)

    // Setelah login berhasil, arahkan ke rute dashboard
    navigate('/dashboard');
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <h2>Indikator Kinerja Utama</h2>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Kata Sandi</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <input
            type="checkbox"
            id="rememberMe"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
          />
          <label htmlFor="rememberMe">Ingat Saya</label>
        </div>
        <button type="submit" className="login-button">
          Masuk
        </button>
      </form>
    </div>
  );
};

export default Login;
