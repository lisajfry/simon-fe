import React, { Component } from 'react';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import '../../assets/scss/login.scss';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errorMessage: '',
    };
  }

  handleInputChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
      errorMessage: '', // Clear error message on input change
    });
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = this.state;

    try {
      const response = await axios.post("http://localhost:8080/user", { email, password });
      const { token, user } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      this.props.history.push("/dashboard");
    } catch (error) {
      this.setState({
        errorMessage: "Email atau password tidak valid. Silakan coba lagi.",
      });
    }
  }

  render() {
    const { email, password, errorMessage } = this.state;

    return (
      <div className="auth" style={{ marginTop: '50px' }}>
        <div className="d-flex align-items-center auth px-0">
          <div className="col-lg-4 mx-auto">
            <div className="auth-form-light text-left py-5 px-4 px-sm-5">
              <div className="brand-logo">
                <img src={require("../../assets/images/logos/logouns.png").default} alt="logo" />
              </div>
              <h4>Selamat datang!</h4>
              <h6 className="font-weight-light">Silakan masuk untuk melanjutkan.</h6>
              <Form className="pt-3" onSubmit={this.handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="email"
                    name="email"
                    value={email}
                    onChange={this.handleInputChange}
                    placeholder="Email"
                    size="lg"
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-4">
                  <Form.Control
                    type="password"
                    name="password"
                    value={password}
                    onChange={this.handleInputChange}
                    placeholder="Password"
                    size="lg"
                    required
                  />
                </Form.Group>
                {errorMessage && (
                  <div className="alert alert-danger" role="alert">
                    {errorMessage}
                  </div>
                )}
                <div className="mt-3">
                  <button type="submit" className="btn btn-primary btn-block btn-lg font-weight-medium auth-form-btn">MASUK</button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
