import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { Container, Row, Card, Col, CardTitle} from "reactstrap";

const AddIku7 = () => {
  const [Kode_MK, setKodeMK] = useState('');
  const [Nama_MK, setNamaMK] = useState('');
  const [Tahun, setTahun] = useState('');
  const [Semester, setSemester] = useState('');
  const [Kelas, setKelas] = useState('');
  const [Presentase_Bobot_Terpenuhi, setPresentaseBobotTerpenuhi] = useState('');
  const [RPS, setRPS] = useState(null); // Menyimpan file RPS
  const [Rancangan_Tugas_Dan_Evaluasi, setRancanganTugasDanEvaluasi] = useState(null); // Menyimpan file Rancangan_Tugas_Dan_Evaluasi
  const navigate = useNavigate();

  const saveIku7Data = async (e) => {
    e.preventDefault();
    if (!RPS || !Rancangan_Tugas_Dan_Evaluasi) {
      console.error("RPS dan Rancangan Tugas Dan Evaluasi harus diunggah.");
      return;
    }
    const formData = new FormData();
    formData.append('Kode_MK', Kode_MK);
    formData.append('Nama_MK', Nama_MK);
    formData.append('Tahun', Tahun);
    formData.append('Semester', Semester);
    formData.append('Kelas', Kelas);
    formData.append('Presentase_Bobot_Terpenuhi', Presentase_Bobot_Terpenuhi);
    formData.append('RPS', RPS); // Mengirimkan file RPS
    formData.append('Rancangan_Tugas_Dan_Evaluasi', Rancangan_Tugas_Dan_Evaluasi); // Mengirimkan file Rancangan_Tugas_Dan_Evaluasi

    try {
      await axios.post('http://localhost:8080/add/iku7', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      navigate('/', { replace: true });
    } catch (error) {
      console.error("Error while saving data:", error);
    }
  };

  const handleFileChangeRPS = (e) => {
    const file = e.target.files[0];
    setRPS(file);
  };

  const handleFileChangeRancanganTugasDanEvaluasi = (e) => {
    const file = e.target.files[0];
    setRancanganTugasDanEvaluasi(file);
  };

  return (
    <div>
      <Container fluid style={{ maxWidth: '80%' }}>
        <Row>
          <Col xs="12" md="12" sm="12">
            <Card style={{ maxWidth: '80%', marginLeft: '-5%', padding: '20px', marginTop: '20px' }}>
            <CardTitle><b>FORM INPUT IKU 7</b></CardTitle>
              <form onSubmit={saveIku7Data}>
                <div className="form-group">
                  <label htmlFor="Kode_MK">Kode MK</label>
                  <input
                    type="text"
                    className="form-control"
                    id="Kode_MK"
                    value={Kode_MK}
                    onChange={(e) => setKodeMK(e.target.value)}
                    placeholder="Kode MK"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="Nama_MK">Nama MK</label>
                  <input
                    type="text"
                    className="form-control"
                    id="Nama_MK"
                    value={Nama_MK}
                    onChange={(e) => setNamaMK(e.target.value)}
                    placeholder="Nama MK"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="Tahun">Tahun</label>
                  <select
                    className="form-control"
                    id="Tahun"
                    value={Tahun}
                    onChange={(e) => setTahun(e.target.value)}
                  >
                    <option value="">Pilih Tahun</option>
                    <option value="2022">2022</option>
                    <option value="2023">2023</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="Semester">Semester</label>
                  <select
                    className="form-control"
                    id="Semester"
                    value={Semester}
                    onChange={(e) => setSemester(e.target.value)}
                  >
                    <option value="">Pilih Semester</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="Kelas">Kelas</label>
                  <input
                    type="text"
                    className="form-control"
                    id="Kelas"
                    value={Kelas}
                    onChange={(e) => setKelas(e.target.value)}
                    placeholder="Kelas"
                  />
                </div>
              </form>
            </Card>
          </Col>
          <Col xs="12" md="12" sm="12">
            <Card style={{ maxWidth: '80%', marginLeft: '-5%', padding: '20px' }}>
              <form onSubmit={saveIku7Data}>
              <div className="form-group" style={{ marginTop: '10px' }}>
                <label htmlFor="RPS">RPS</label>
                <input
                  type="file"
                  className="form-control"
                  id="RPS"
                  onChange={handleFileChangeRPS}
                />
                </div>
                <div className="form-group" style={{ marginTop: '10px' }}>
                <label htmlFor="Rancangan_Tugas_Dan_Evaluasi">Rancangan Tugas Dan Evaluasi</label>
                <input
                  type="file"
                  className="form-control"
                  id="Rancangan_Tugas_Dan_Evaluasi"
                  onChange={handleFileChangeRancanganTugasDanEvaluasi}
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

export default AddIku7;
