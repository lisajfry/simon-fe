import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { Container, Row, Card, Col } from "reactstrap";

const AddIku2kegiatan = () => {
  const [NIM, setNIM] = useState('');
  const [aktivitas, setAktivitas] = useState('');
  const [sks, setSks] = useState('');
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

  const saveIku2kegiatan = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (file) {
      formData.append('file', file);
    }
    formData.append('NIM', NIM);
  
    formData.append('aktivitas', aktivitas);
    formData.append('sks', sks);
   
    try {
      await axios.post('http://localhost:8080/import/iku2kegiatan', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      navigate('/iku2kegiatanlist', { replace: true });
    } catch (error) {
      console.error("Error while importing data:", error);
    }
  };

  const saveIku2kegiatanData = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('NIM', NIM);

    formData.append('aktivitas', aktivitas);
    formData.append('sks', sks);
    

    try {
      await axios.post('http://localhost:8080/add/iku2kegiatan', formData);
      navigate('/iku2kegiatanlist', { replace: true });
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
              <form onSubmit={saveIku2kegiatan}>
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
              <form onSubmit={saveIku2kegiatanData}>
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
                  <label htmlFor="status">Aktivitas</label>
                  <select
                    className="form-control"
                    id="aktivitas"
                    value={aktivitas}
                    onChange={(e) => setAktivitas(e.target.value)}
                  >
                    <option value="">Pilih Aktivitas</option>
                    <option value="magang/praktek kerja">Magang/praktek kerja</option>
                    <option value="pertukaran pelajar">Pertukaran pelajar</option>
                    <option value="proyek kemanusiaan">proyek kemanusiaan</option>
                    <option value="mengajar di sekolah">Mengajar di sekolah</option>
                    <option value="studi/proyek independen">Studi/proyek independen</option>
                    <option value="proyek di desa/kkn">Proyek di desa/kkn</option>
                    <option value="kegiatan wirausaha">Kegiatan wirausaha</option>
                    <option value="penelitian atau riset">Penelitian atau riset</option>
                  </select>
                </div>
                <div className="form-group">
                <label htmlFor="sks">SKS</label>
                  <input
                    type="text"
                    className="form-control"
                    id="sks"
                    value={sks}
                    onChange={(e) => setSks(e.target.value)}
                    placeholder="sks"
                  />
                </div>
                <div>
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

export default AddIku2kegiatan;
