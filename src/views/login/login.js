import React from 'react';
import './login.css'; // Import file CSS yang berisi styling
import { useNavigate } from 'react-router-dom';


class Login extends React.Component {
  state = {
    email: '',
    password: '',
    rememberMe: false
  };
  

  handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    this.setState({
      [name]: type === 'checkbox' ? checked : value
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    // Proses login di sini
    console.log(this.state);
  
    // Navigasi ke rute dashboard
    const navigate = useNavigate();
    navigate('/dashboard');
  };
  

  render() {
    return (
      <div className="login-container">
        <form onSubmit={this.handleSubmit}>
          <h2>IKU</h2>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Kata Sandi</label>
            <input
              type="password"
              id="password"
              name="password"
              value={this.state.password}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="input-group">
            <input
              type="checkbox"
              id="rememberMe"
              name="rememberMe"
              checked={this.state.rememberMe}
              onChange={this.handleChange}
            />
            <label htmlFor="rememberMe">Ingat Saya</label>
          </div>
          <button type="submit" className="login-button">Masuk</button>
        </form>
      </div>
    );
  }
}

export default Login;
