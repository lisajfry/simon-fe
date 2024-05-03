import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { Container, Row, Card, Col } from "reactstrap";

const AddUser = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const saveUser = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (file) {
      formData.append('file', file);
    }
    formData.append('email', email);
    formData.append('password', password);
    formData.append('role', role);


    try {
      await axios.post('http://localhost:8080/import/user', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      navigate('/userlist', { replace: true });
    } catch (error) {
      console.error("Error while importing data:", error);
    }
  };

  const saveUserData = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    formData.append('role', role);

    try {
      await axios.post('http://localhost:8080/add/user', formData);
      navigate('/userlist', { replace: true });
    } catch (error) {
      console.error("Error while saving data:", error);
    }
  };

  return (
    <div>
      <Container fluid style={{ maxWidth: '80%' }}>
        <Row>
          <Col xs="12" md="12" sm="12">
            <Card style={{ maxWidth: '80%', marginLeft: '-5%', padding: '20px' }}>
              <form onSubmit={saveUser}>
                <div className="form-group">
                  <label>File Excel</label>
                  <input type="file" className="form-control" required accept=".xls, .xlsx" onChange={(e) => setFile(e.target.files[0])} style={{ marginBottom: '10px' }} />
                </div>
                <div className="form-group">
                  <button type="submit" className="btn btn-primary">Save</button>
                </div>
              </form>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col xs="12" md="12" sm="12">
            <Card style={{ maxWidth: '80%', marginLeft: '-5%', padding: '20px', marginTop: '20px' }}>
              <form onSubmit={saveUserData}>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="text"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="password"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="role">Role</label>
                  <select style={{ marginBottom: '10px' }}
                    className="form-control"
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value=""></option>
                    <option value="admin">Admin</option>
                    <option value="mahasiswa">Mahasiswa</option>
                    <option value="dosen">Dosen</option>
                  </select >
                </div>
                
                 
                <div className="form-group">
                <p><button type="submit" className="btn btn-primary">Save</button></p>
                </div>
                
              </form>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AddUser;