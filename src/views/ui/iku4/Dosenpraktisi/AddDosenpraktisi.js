import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { Container, Row, Card, Col } from "reactstrap";

const AddDosenpraktisi = () => {
  const [NIDN_praktisi, setNIDN_praktisi] = useState('');
  const [nama_dosen_praktisi, setNamaDosenpraktisi] = useState('');
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const saveDosenpraktisi = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (file) {
      formData.append('file', file);
    }
    formData.append('NIDN_praktisi', NIDN_praktisi);
    formData.append('nama_dosen_praktisi', nama_dosen_praktisi);

    try {
      console.log("Sending data:", formData);
      await axios.post('http://localhost:8080/import/dosenpraktisi', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      navigate('/dosenpraktisilist', { replace: true });
    } catch (error) {
      console.error("Error while importing data:", error.response || error.message);
    }
  };

  const saveDosenpraktisiData = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('NIDN_praktisi', NIDN_praktisi);
    formData.append('nama_dosen_praktisi', nama_dosen_praktisi);

    try {
      console.log("Sending data:", formData);
      await axios.post('http://localhost:8080/add/dosenpraktisi', formData);
      navigate('/dosenpraktisilist', { replace: true });
    } catch (error) {
      console.error("Error while saving data:", error.response || error.message);
    }
  };

  return (
    <div>
      <Container fluid style={{ maxWidth: '80%' }}>
        <Row>
          <Col xs="12" md="12" sm="12">
            <Card style={{ maxWidth: '80%', marginLeft: '-5%', padding: '20px' }}>
              <form onSubmit={saveDosenpraktisi}>
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
              <form onSubmit={saveDosenpraktisiData}>
                <div className="form-group">
                  <label htmlFor="NIDN_praktisi">NIDN</label>
                  <input
                    type="text"
                    className="form-control"
                    id="NIDN_praktisi"
                    value={NIDN_praktisi}
                    onChange={(e) => setNIDN_praktisi(e.target.value)}
                    placeholder="NIDN"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="nama_dosen_praktisi">Nama Dosen</label>
                  <input
                    type="text"
                    className="form-control"
                    id="nama_dosen_praktisi"
                    value={nama_dosen_praktisi}
                    onChange={(e) => setNamaDosenpraktisi(e.target.value)}
                    placeholder="Nama Dosen Praktisi"
                  />
                </div>
                <div>
                  <p></p>
                  <div className="form-group">
                    <p><button type="submit" className="btn btn-primary">Save</button></p>
                  </div>
                </div>
              </form>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AddDosenpraktisi;