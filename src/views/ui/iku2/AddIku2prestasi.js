import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { Container, Row, Card, Col } from "reactstrap";

const AddIku2prestasi = () => {
  const [NIM, setNIM] = useState('');
  const [tingkat_lomba, setTingkatLomba] = useState('');
  const [prestasi, setPrestasi] = useState('');
  const [mahasiswaData, setMahasiswaData] = useState([]);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMahasiswaData();
  }, []);

  const fetchMahasiswaData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/mahasiswa');
      setMahasiswaData(response.data);
    } catch (error) {
      console.error("Error while fetching mahasiswa data:", error);
    }
  };

  const saveIku2prestasi = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (file) {
      formData.append('file', file);
    }
    formData.append('NIM', NIM);
  
    formData.append('tingkat_lomba', tingkat_lomba);
    formData.append('prestasi', prestasi);
   
    try {
      await axios.post('http://localhost:8080/import/iku2prestasi', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      navigate('/iku2prestasilist', { replace: true });
    } catch (error) {
      console.error("Error while importing data:", error);
    }
  };

  const saveIku2prestasiData = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('NIM', NIM);

    formData.append('tingkat_lomba', tingkat_lomba);
    formData.append('prestasi', prestasi);
    

    try {
      await axios.post('http://localhost:8080/add/iku2prestasi', formData);
      navigate('/iku2prestasilist', { replace: true });
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
              <form onSubmit={saveIku2prestasi}>
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
              <form onSubmit={saveIku2prestasiData}>
              <div className="form-group">
    <label htmlFor="NIM">NIM</label>
    <select
        className="form-control"
        id="NIM"
        value={NIM}
        onChange={(e) => setNIM(e.target.value)}
    >
        <option value="">Pilih NIM</option>
        {mahasiswaData.map(mahasiswa => (
            <option key={mahasiswa.NIM} value={mahasiswa.NIM}>{mahasiswa.NIM}</option>
        ))}
    </select>
</div>


                <div className="form-group">
                  <label htmlFor="tingkat_lomba">Tingkat Lomba</label>
                  <select
                    className="form-control"
                    id="tingkat_lomba"
                    value={tingkat_lomba}
                    onChange={(e) => setTingkatLomba(e.target.value)}
                  >
                    <option value="">Pilih Tingkat Lomba</option>
                    <option value="internasional">Internasional</option>
                    <option value="nasional">Nasional</option>
                    <option value="provinsi">Provinsi</option>
                  </select>
                </div>
                <div className="form-group">
                <div className="field">
                    <label className="label">Prestasi</label>
                    <select
                        className="select"
                        value={prestasi}
                        onChange={(e) => setPrestasi(e.target.value)}
                    >
                        <option value="Pilih prestasi"></option>
                            <option value="juara1">Juara 1</option>
                            <option value="juara2">Juara2</option>
                            <option value="juara3">Juara3</option>
                            <option value="peserta">Peserta</option>
                    </select>
                </div>
                <div>
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

export default AddIku2prestasi;
