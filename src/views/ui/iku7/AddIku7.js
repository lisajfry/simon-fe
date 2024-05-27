import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { Container, Row, Card, Col, CardTitle } from "reactstrap";


const AddIku7 = () => {
  const [kode_mk, setKodeMK] = useState('');
  const [nama_mk, setNamaMK] = useState('');
  const [tahun, setTahun] = useState('');
  const [semester, setSemester] = useState('');
  const [kelas, setKelas] = useState('');
  const [jum_bobot, setJumBobot] = useState('');
  const [rps, setRPS] = useState(null);
  const navigate = useNavigate()


  const saveIku7Data = async (e) => {
    e.preventDefault();
    if (!rps) {
      console.error("File RPS harus diunggah.");
      return;
    }


    const formData = new FormData();
    formData.append('kode_mk', kode_mk);
    formData.append('nama_mk', nama_mk);
    formData.append('tahun', tahun);
    formData.append('semester', semester);
    formData.append('kelas', kelas);
    formData.append('jum_bobot', jum_bobot);
    formData.append('rps', rps); // Mengirimkan file RPS


    try {
      await axios.post('http://localhost:8080/add/iku7', formData); // Sesuaikan dengan endpoint yang benar
      navigate('/iku7', { replace: true });
    } catch (error) {
      console.error("Error while saving data:", error);
    }
  };


  const handleFileChangeRPS = (e) => {
    const file = e.target.files[0];
    setRPS(file);
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
                  <label htmlFor="kodeMK">Kode MK</label>
                  <input
                    type="text"
                    className="form-control"
                    id="kodeMK"
                    value={kode_mk}
                    onChange={(e) => setKodeMK(e.target.value)}
                    placeholder="Kode MK"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="namaMK">Nama MK</label>
                  <input
                    type="text"
                    className="form-control"
                    id="namaMK"
                    value={nama_mk}
                    onChange={(e) => setNamaMK(e.target.value)}
                    placeholder="Nama MK"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="tahun">Tahun</label>
                  <select
                    className="form-control"
                    id="tahun"
                    value={tahun}
                    onChange={(e) => setTahun(e.target.value)}
                  >
                    <option value="">Pilih Tahun</option>
                    <option value="2022">2022</option>
                    <option value="2023">2023</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="semester">Semester</label>
                  <select
                    className="form-control"
                    id="semester"
                    value={semester}
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
                  <label htmlFor="kelas">Kelas</label>
                  <select
                    className="form-control"
                    id="kelas"
                    value={kelas}
                    onChange={(e) => setKelas(e.target.value)}
                  >
                    <option value="">Pilih Kelas</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="jumBobot">Presentase Bobot</label>
                  <input
                    type="number"
                    className="form-control"
                    id="jumBobot"
                    value={jum_bobot}
                    onChange={(e) => setJumBobot(e.target.value)}
                    placeholder="Presentase Bobot"
                  />
                </div>
                <div className="form-group" style={{ marginTop: '10px' }}>
                  <label htmlFor="rps">RPS</label>
                  <input
                    type="file"
                    className="form-control"
                    id="rps"
                    onChange={handleFileChangeRPS}
                  />
                </div>
                <div className="form-group" style={{ marginTop: '10px' }}>
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
