import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { Container, Row, Card, Col } from "reactstrap";

const AddLulusan = () => {
  const [no_ijazah, setNoIjazah] = useState('');
  const [nama_alumni, setNamaAlumni] = useState('');
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const saveLulusan = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (file) {
      formData.append('file', file);
    }
    formData.append('no_ijazah', no_ijazah);
    formData.append('nama_alumni', nama_alumni);

    try {
      await axios.post('http://localhost:8080/import/lulusan', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      navigate('/lulusanlist', { replace: true });
    } catch (error) {
      console.error("Error while importing data:", error);
    }
  };

  const saveLulusanData = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('no_ijazah', no_ijazah);
    formData.append('nama_alumni', nama_alumni);

    try {
      await axios.post('http://localhost:8080/add/lulusan', formData);
      navigate('/lulusanlist', { replace: true });
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
              <form onSubmit={saveLulusan}>
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
              <form onSubmit={saveLulusanData}>
                <div className="form-group">
                  <label htmlFor="no_ijazah">No Ijazah</label>
                  <input
                    type="text"
                    className="form-control"
                    id="no_ijazah"
                    value={no_ijazah}
                    onChange={(e) => setNoIjazah(e.target.value)}
                    placeholder="No Ijazah"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="nama_alumni">Nama Alumni</label>
                  <input
                    type="text"
                    className="form-control"
                    id="nama_alumni"
                    value={nama_alumni}
                    onChange={(e) => setNamaAlumni(e.target.value)}
                    placeholder="Nama Alumni"
                  />
                </div>
                <div className="form-group">
                  <button type="submit" className="btn btn-primary">Save</button>
                </div>
              </form>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AddLulusan;