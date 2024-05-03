import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { Container, Row, Card, Col } from "reactstrap";

const AddMahasiswa = () => {
  const [NIM, setNIM] = useState('');
  const [nama_mahasiswa, setNamaMahasiswa] = useState('');
  const [angkatan, setAngkatan] = useState('');
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const saveMahasiswa = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (file) {
      formData.append('file', file);
    }
    formData.append('NIM', NIM);
    formData.append('nama_mahasiswa', nama_mahasiswa);
    formData.append('angkatan', angkatan);


    try {
      await axios.post('http://localhost:8080/import/mahasiswa', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      navigate('/mahasiswalist', { replace: true });
    } catch (error) {
      console.error("Error while importing data:", error);
    }
  };

  const saveMahasiswaData = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('NIM', NIM);
    formData.append('nama_mahasiswa', nama_mahasiswa);
    formData.append('angkatan', angkatan);

    try {
      await axios.post('http://localhost:8080/add/mahasiswa', formData);
      navigate('/mahasiswalist', { replace: true });
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
              <form onSubmit={saveMahasiswa}>
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
              <form onSubmit={saveMahasiswaData}>
                <div className="form-group">
                  <label htmlFor="NIM">NIM</label>
                  <input
                    type="text"
                    className="form-control"
                    id="NIM"
                    value={NIM}
                    onChange={(e) => setNIM(e.target.value)}
                    placeholder="No Ijazah"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="nama_mahasiswa">Nama Mahasiswa</label>
                  <input
                    type="text"
                    className="form-control"
                    id="nama_mahasiswa"
                    value={nama_mahasiswa}
                    onChange={(e) => setNamaMahasiswa(e.target.value)}
                    placeholder="Nama Mahasiswa"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="angkatan">Angkatan</label>
                  <select
                    className="form-control"
                    id="angkatan"
                    value={angkatan}
                    onChange={(e) => setAngkatan(e.target.value)}
                  >
                    <option value="">Pilih Angkatan</option>
                    <option value="2021">2021</option>
                    <option value="2022">2022</option>
                    <option value="2023">2023</option>
                  </select>
                </div>
                <div>
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

export default AddMahasiswa;