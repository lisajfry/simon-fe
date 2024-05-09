import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { Container, Row, Card, Col } from "reactstrap";

const AddIku7 = () => {
  const [Kode_MK, setKodeMK] = useState('');
  const [Nama_MK, setNamaMK] = useState('');
  const [Tahun, setTahun] = useState('');
  const [Semester, setSemester] = useState('');
  const [Kelas, setKelas] = useState('');
  const [Presentase_Bobot_Terpenuhi, setPresentaseBobotTerpenuhi] = useState('');
  const [RPS, setRPS] = useState('');
  const [Rancangan_Tugas_Dan_Evaluasi, setRancanganTugasDanEvaluasi] = useState('');
  const navigate = useNavigate();

  const addiku7 = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('Kode_MK', Kode_MK);
    formData.append('Nama_MK', Nama_MK);
    formData.append('Tahun', Tahun);
    formData.append('Semester', Semester);
    formData.append('Kelas', Kelas);
    formData.append('Presentase_Bobot_Terpenuhi', Presentase_Bobot_Terpenuhi);
    formData.append('RPS', RPS);
    formData.append('Rancangan_Tugas_Dan_Evaluasi', Rancangan_Tugas_Dan_Evaluasi);

    try {
      await axios.post('http://localhost:8080/add/iku7', formData);
      navigate('/iku7list', { replace: true });
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
              <form onSubmit={addiku7}>
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
                  <input
                    type="text"
                    className="form-control"
                    id="Tahun"
                    value={Tahun}
                    onChange={(e) => setTahun(e.target.value)}
                    placeholder="Tahun"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="Semester">Semester</label>
                  <input
                    type="text"
                    className="form-control"
                    id="Semester"
                    value={Semester}
                    onChange={(e) => setSemester(e.target.value)}
                    placeholder="Semester"
                  />
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
                <div className="form-group">
                  <label htmlFor="Presentase_Bobot_Terpenuhi">Presentase Bobot Terpenuhi</label>
                  <input
                    type="text"
                    className="form-control"
                    id="Presentase_Bobot_Terpenuhi"
                    value={Presentase_Bobot_Terpenuhi}
                    onChange={(e) => setPresentaseBobotTerpenuhi(e.target.value)}
                    placeholder="Presentase Bobot Terpenuhi"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="RPS">RPS</label>
                  <input
                    type="text"
                    className="form-control"
                    id="RPS"
                    value={RPS}
                    onChange={(e) => setRPS(e.target.value)}
                    placeholder="RPS"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="Rancangan_Tugas_Dan_Evaluasi">Rancangan Tugas Dan Evaluasi</label>
                  <input
                    type="text"
                    className="form-control"
                    id="Rancangan_Tugas_Dan_Evaluasi"
                    value={Rancangan_Tugas_Dan_Evaluasi}
                    onChange={(e) => setRancanganTugasDanEvaluasi(e.target.value)}
                    placeholder="Rancangan Tugas Dan Evaluasi"
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