import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { Container, Row, Card, Col } from "reactstrap";

const AddIku3 = () => {
  const [NIDN, setNIDN] = useState('');
  const [nama_dosen, setNamaDosen] = useState('');
  const [aktivitas_dosen, setAktivitasDosen] = useState('');
  
  const [dosenData, setDosenData] = useState([]);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchDosenData();
  }, []);

  const fetchDosenData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/dosen');
      setDosenData(response.data);
    } catch (error) {
      console.error("Error while fetching dosen data:", error);
    }
  };

  const saveIku3 = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (file) {
      formData.append('file', file);
    }
    formData.append('NIDN', NIDN);
  
    formData.append('aktivitas_dosen', aktivitas_dosen);
    

    try {
      await axios.post('http://localhost:8080/import/iku3', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      navigate('/iku3list', { replace: true });
    } catch (error) {
      console.error("Error while importing data:", error);
    }
  };

  const saveIku3Data = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('NIDN', NIDN);

    formData.append('aktivitas_dosen', aktivitas_dosen);
    

    try {
      await axios.post('http://localhost:8080/add/iku3', formData);
      navigate('/iku3list', { replace: true });
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
              <form onSubmit={saveIku3}>
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
              <form onSubmit={saveIku3Data}>
              <div className="form-group">
    <label htmlFor="NIDN">NIDN</label>
    <select
        className="form-control"
        id="NIDN"
        value={NIDN}
        onChange={(e) => setNIDN(e.target.value)}
    >
        <option value="">Pilih NIDN</option>
        {dosenData.map(dosen => (
            <option key={dosen.NIDN} value={dosen.NIDN}>{dosen.NIDN}</option>
        ))}
    </select>
</div>


                <div className="form-group">
                  <label htmlFor="aktivitas_dosen">Aktivitas Dosen</label>
                  <select
                    className="form-control"
                    id="aktivitas_dosen"
                    value={aktivitas_dosen}
                    onChange={(e) => setAktivitasDosen(e.target.value)}
                  >
                    <option value="">Pilih Aktivitas</option>
                    <option value="Bertridharma di Kampus Lain" >Bertridharma di Kampus Lain</option>
                    <option value="Memiliki Pengalaman Sebagai Praktisi">Memiliki Pengalaman Sebagai Praktisi</option>
                    <option value="Membimbing Mahasiswa Berprestasi">Membimbing Mahasiswa Berprestasi</option>
                  </select>
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

export default AddIku3;
