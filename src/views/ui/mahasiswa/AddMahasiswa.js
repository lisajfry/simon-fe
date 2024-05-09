import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { Container, Row, Card, Col, CardTitle } from "reactstrap";
import { FaDownload } from 'react-icons/fa';

const AddMahasiswa = () => {
  const [NIM, setNIM] = useState('');
  const [nama_mahasiswa, setNamaMahasiswa] = useState('');
  const [angkatan, setAngkatan] = useState('');
  const [keterangan, setKeterangan] = useState('');
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
    formData.append('keterangan', keterangan);

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
    formData.append('keterangan', keterangan);

    try {
      await axios.post('http://localhost:8080/add/mahasiswa', formData);
      navigate('/mahasiswalist', { replace: true });
    } catch (error) {
      console.error("Error while saving data:", error);
    }
  };

  const downloadTemplate = async () => {
    try {
      const response = await axios.get('/template_mahasiswa.xlsx', {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'template_mahasiswa.xlsx');
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error while downloading template:", error);
    }
  };
  

  return (
    <div>
      <Container fluid style={{ maxWidth: '80%' }}>
        <Row>
          <Col xs="12" md="12" sm="12">
            <Card style={{ maxWidth: '80%', marginLeft: '-5%', padding: '20px' }}>
              <div className="form-group">
              <button type="button" className="btn btn-primary" onClick={downloadTemplate}>
                  <FaDownload /> Unduh Template Excel
                </button>
              </div>
              <form onSubmit={saveMahasiswa}>
                <div className="form-group" style={{ marginTop: '20px' }}>
                  <label>File Excel</label>
                  <input type="file" className="form-control" required accept=".xls, .xlsx" onChange={(e) => setFile(e.target.files[0])} style={{ marginBottom: '10px' }} />
                </div>
                <div className="form-group">
                  <button type="submit" className="btn btn-primary">Tambahkan</button>
                </div>
              </form>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col xs="12" md="12" sm="12">
            <Card style={{ maxWidth: '80%', marginLeft: '-5%', padding: '20px', marginTop: '20px' }}>
            <CardTitle><b>FORM INPUT MAHASISWA</b></CardTitle>
              <form onSubmit={saveMahasiswaData}>
                <div>
                  <div className="form-group"style={{ marginTop: '20px' }}>
                    <label htmlFor="NIM">NIM</label>
                    <input
                      type="text"
                      className="form-control"
                      id="NIM"
                      value={NIM}
                      onChange={(e) => setNIM(e.target.value)}
                      placeholder="NIM"
                    />
                  </div>
                  <div className="form-group" style={{ marginTop: '10px' }}>
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
                  <div className="form-group" style={{ marginTop: '10px' }}>
                    <label htmlFor="angkatan">Angkatan</label>
                    <select
                      className="form-control"
                      id="angkatan"
                      value={angkatan}
                      onChange={(e) => setAngkatan(e.target.value)}
                    >
                      <option value="">Pilih Angkatan</option>
                      <option value="TI 2020">TI 2020</option>
                      <option value="TI 2021">TI 2021</option>
                      <option value="TI 2022">TI 2022</option>
                      <option value="TI 2023">TI 2023</option>
                    </select>
                  </div>
                  <div className="form-group" style={{ marginTop: '10px' }}>
                    <label className="label">Keterangan</label>
                    <select
                      className="form-control"
                      value={keterangan}
                      onChange={(e) => setKeterangan(e.target.value)}
                    >
                      <option value="">Pilih Keterangan</option>
                      <option value="lulus">Lulus</option>
                      <option value="mahasiswa aktif">Mahasiswa Aktif</option>
                    </select>
                  </div>
                </div>
                <div className="form-group" style={{ marginTop: '10px' }}>
                  <button type="submit" className="btn btn-primary">Tambahkan</button>
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
