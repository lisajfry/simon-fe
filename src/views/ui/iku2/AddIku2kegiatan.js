import React, { useState } from 'react';
import axios from "axios";
import { Container, Row, Card, Col, CardTitle } from "reactstrap";
import { useNavigate } from 'react-router-dom';

const AddIku2kegiatan = () => {
  const [NIM, setNIM] = useState('');
  const [aktivitas, setAktivitas] = useState('');
  const [tempat_kegiatan, setTempatKegiatan] = useState('');
  const [sks, setSks] = useState('');
  const [tgl_mulai_kegiatan, setTglMulaiKegiatan] = useState('');
  const [tgl_selesai_kegiatan, setTglSelesaiKegiatan] = useState('');
  const navigate = useNavigate();

  const saveIku2kegiatanData = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('NIM', NIM);
    formData.append('aktivitas', aktivitas);
    formData.append('tempat_kegiatan', tempat_kegiatan);
    formData.append('tgl_mulai_kegiatan', tgl_mulai_kegiatan); // Sesuaikan dengan nama yang diharapkan oleh backend
    formData.append('tgl_selesai_kegiatan', tgl_selesai_kegiatan); // Sesuaikan dengan nama yang diharapkan oleh backend
    formData.append('sks', sks);
  
    try {
      await axios.post('http://localhost:8080/add/iku2kegiatan', formData); // Sesuaikan dengan endpoint yang benar
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
            <Card style={{ maxWidth: '80%', marginLeft: '-5%', padding: '20px', marginTop: '20px' }}>
              <CardTitle><b>FORM INPUT IKU 2 Kegiatan di Luar Prodi</b></CardTitle>
              <form onSubmit={saveIku2kegiatanData}>
                <div className="form-group" style={{ marginTop: '20px' }}>
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
                  <label className="label">Aktivitas</label>
                  <select
                    className="form-control"
                    value={aktivitas}
                    onChange={(e) => setAktivitas(e.target.value)}
                  >
                    <option value="">Pilih Aktivitas</option>
                    <option value="magang/praktek kerja">Magang/Praktek Kerja</option>
                    <option value="pertukaran pelajar">Pertukaran Pelajar</option>
                    <option value="proyek kemanusiaan">Proyek Kemanusiaan</option>
                    <option value="mengajar di sekolah">Mengajar di Sekolah</option>
                    <option value="studi/proyek independen">Studi/Proyek Independen</option>
                    <option value="proyek di desa/kkn">Proyek di Desa/KKN</option>
                    <option value="kegiatan wirausaha">Kegiatan Wirausaha</option>
                    <option value="penelitian atau riset">Penelitian atau riset</option>
                  </select>
                </div>
                <div className="form-group" style={{ marginTop: '10px' }}>
                  <label htmlFor="tempat_kegiatan">Tempat Kegiatan</label>
                  <input
                    type="text"
                    className="form-control"
                    id="tempat_kegiatan"
                    value={tempat_kegiatan}
                    onChange={(e) => setTempatKegiatan(e.target.value)}
                    placeholder="Tempat Kegiatan"
                  />
                </div>
                <div className="form-group" style={{ marginTop: '10px' }}>
                  <label htmlFor="sks">SKS</label>
                  <input
                    type="text"
                    className="form-control"
                    id="sks"
                    value={sks}
                    onChange={(e) => setSks(e.target.value)}
                    placeholder="SKS"
                  />
                </div>
                <div className="form-group" style={{ marginTop: '10px' }}>
                  <label htmlFor="tgl_mulai_kegiatan">Tanggal Mulai Kegiatan</label>
                  <input
                    type="date"
                    className="form-control"
                    id="tgl_mulai_kegiatan"
                    value={tgl_mulai_kegiatan}
                    onChange={(e) => setTglMulaiKegiatan(e.target.value)}
                    placeholder="Tanggal Mulai Kegiatan"
                  />
                </div>
                <div className="form-group" style={{ marginTop: '10px' }}>
                  <label htmlFor="tgl_selesai_kegiatan">Tanggal Selesai Kegiatan</label>
                  <input
                    type="date"
                    className="form-control"
                    id="tgl_selesai_kegiatan"
                    value={tgl_selesai_kegiatan}
                    onChange={(e) => setTglSelesaiKegiatan(e.target.value)}
                    placeholder="Tanggal Selesai Kegiatan"
                  />
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

export default AddIku2kegiatan;
