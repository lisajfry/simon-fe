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
  const [case_method, setCaseMethod] = useState('');
  const [tb_project, setTbProject] = useState('');
  const [rps, setRPS] = useState(null);
  const navigate = useNavigate();


  const saveIku7Data = async (e) => {
    e.preventDefault();


    // Hitung presentase bobot
    const presentaseBobot = (parseFloat(case_method) || 0) + (parseFloat(tb_project) || 0);


    const formData = new FormData();
    formData.append('kode_mk', kode_mk);
    formData.append('nama_mk', nama_mk);
    formData.append('tahun', tahun);
    formData.append('semester', semester);
    formData.append('kelas', kelas);
    formData.append('case_method', case_method);
    formData.append('tb_project', tb_project);
    formData.append('presentase_bobot', presentaseBobot); // Kirim presentase bobot ke backend
    if (rps) {
      formData.append('rps', rps); // Append the file only if it exists
    }


    try {
      await axios.post('http://localhost:8080/add/iku7', formData); // Sesuaikan dengan endpoint yang benar
      navigate('/iku7list', { replace: true });
    } catch (error) {
      console.error("Error while saving data:", error);
    }
  };


  const handleFileChangeRPS = (e) => {
    const file = e.target.files[0];
    setRPS(file);
  };


  const handleFocus = (setter) => {
    setter('');
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
                    onFocus={() => handleFocus(setKodeMK)}
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
                    onFocus={() => handleFocus(setNamaMK)}
                    onChange={(e) => setNamaMK(e.target.value)}
                    placeholder="Nama MK"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="tahun">Tahun</label>
                  <input
                    type="text"
                    className="form-control"
                    id="tahun"
                    value={tahun}
                    onFocus={() => handleFocus(setTahun)}
                    onChange={(e) => setTahun(e.target.value)}
                    placeholder="Tahun"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="semester">Semester</label>
                  <select
                    className="form-control"
                    id="semester"
                    value={semester}
                    onFocus={() => handleFocus(setSemester)}
                    onChange={(e) => setSemester(e.target.value)}
                  >
                    <option value="">Pilih Semester</option>
                    <option value="1">Ganjil</option>
                    <option value="2">Genap</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="kelas">Kelas</label>
                  <select
                    className="form-control"
                    id="kelas"
                    value={kelas}
                    onFocus={() => handleFocus(setKelas)}
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
                  <label htmlFor="case_method">Nilai Case Method</label>
                  <input
                    type="number"
                    className="form-control"
                    id="case_method"
                    value={case_method}
                    onFocus={() => handleFocus(setCaseMethod)}
                    onChange={(e) => setCaseMethod(e.target.value)}
                    placeholder="ketik nilai"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="tb_project">Nilai Team Base Project</label>
                  <input
                    type="number"
                    className="form-control"
                    id="tb_project"
                    value={tb_project}
                    onFocus={() => handleFocus(setTbProject)}
                    onChange={(e) => setTbProject(e.target.value)}
                    placeholder="ketik nilai"
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
