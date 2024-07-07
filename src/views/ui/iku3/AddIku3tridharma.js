import React, { useState } from 'react';
import axios from "axios";
import { Container, Row, Card, Col, CardTitle } from "reactstrap";
import { useNavigate } from 'react-router-dom';

const AddIku3tridharma = () => {
  const [NIDN, setNIDN] = useState('');
  const [tahun, setTahun] = useState('');
  const [surat_sk, setSuratSk] = useState(null);
  const [jenis_tridharma, setJenisTridharma] = useState('');
  const [nama_aktivitas_tridharma, setNamaAktivitasTridharma] = useState('');
  const [tempat_tridharma, setTempatTridharma] = useState('');
  const [tgl_mulai_tridharma, setTglMulaiTridharma] = useState('');
  const [tgl_selesai_tridharma, setTglSelesaiTridharma] = useState('');
  const navigate = useNavigate();

  const saveIku3tridharmaData = async (e) => {
    e.preventDefault();
    if (!surat_sk) {
      console.error("Surat SK harus diunggah.");
      return;
    }
    const formData = new FormData();
    formData.append('NIDN', NIDN);
    formData.append('tahun', tahun);
    formData.append('surat_sk', surat_sk);
    formData.append('jenis_tridharma', jenis_tridharma);
    formData.append('nama_aktivitas_tridharma', nama_aktivitas_tridharma);
    formData.append('tempat_tridharma', tempat_tridharma);
    formData.append('tgl_mulai_tridharma', tgl_mulai_tridharma); // Sesuaikan dengan nama yang diharapkan oleh backend
    formData.append('tgl_selesai_tridharma', tgl_selesai_tridharma); // Sesuaikan dengan nama yang diharapkan oleh backend
  
  
    try {
      await axios.post('http://localhost:8080/add/iku3tridharma', formData); // Sesuaikan dengan endpoint yang benar
      navigate('/iku3tridharmalist', { replace: true });
    } catch (error) {
      console.error("Error while saving data:", error);
    }
  };
  
  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Mengambil file yang dipilih
    setSuratSk(file); // Menyimpan file sebagai blob
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
              <CardTitle><b>FORM INPUT IKU 3 DOSEN BERTRIDHARMA DI KAMPUS LAIN</b></CardTitle>
              <form onSubmit={saveIku3tridharmaData}>
                <div className="form-group" style={{ marginTop: '20px' }}>
                  <label htmlFor="NIDN">Dosen Tridharma</label>
                  <input
                    type="text"
                    className="form-control"
                    id="NIDN"
                    value={NIDN}
                    onChange={(e) => setNIDN(e.target.value)}
                    placeholder="NIDN"
                  />
                </div>  
                <div className="form-group">
                  <label htmlFor="tahun">Tahun</label>
                  <input
                    type="number"
                    className="form-control"
                    id="tahun"
                    value={tahun}
                    onFocus={() => handleFocus(setTahun)}
                    onChange={(e) => setTahun(e.target.value)}
                    placeholder="Tahun"
                  />
                </div>

                <div className="form-group" style={{ marginTop: '10px' }}>
                <label htmlFor="surat_sk">Surat SK</label>
                <input
                  type="file"
                  className="form-control"
                  id="surat_sk"
                  onChange={handleFileChange}
                />
                </div>
                <div className="form-group" style={{ marginTop: '10px' }}>
                  <label className="label">Jenis Tridharma</label>
                  <select
                    className="form-control"
                    value={jenis_tridharma}
                    onChange={(e) => setJenisTridharma(e.target.value)}
                  >
                    <option value="">Pilih Jenis</option>
                    <option value="pendidikan">Pendidikan</option>
                    <option value="penelitian">Penelitian</option>
                    <option value="pengabdian kepada masyarakat">Pengadian Kepada Masyarakat</option>
                  </select>
                </div>
                <div className="form-group" style={{ marginTop: '10px' }}>
                  <label htmlFor="nama_aktivitas_tridharma">Nama Aktivitas Tridharma</label>
                  <input
                    type="text"
                    className="form-control"
                    id="nama_aktivitas_tridharma"
                    value={nama_aktivitas_tridharma}
                    onChange={(e) => setNamaAktivitasTridharma(e.target.value)}
                    placeholder="Nama Aktivitas Tridharma"
                  />
                </div>
                <div className="form-group" style={{ marginTop: '10px' }}>
                  <label htmlFor="tempat_tridharma">Tempat Tridharma</label>
                  <input
                    type="text"
                    className="form-control"
                    id="tempat_tridharma"
                    value={tempat_tridharma}
                    onChange={(e) => setTempatTridharma(e.target.value)}
                    placeholder="Tempat Tridharma"
                  />
                </div>
                <div className="form-group" style={{ marginTop: '10px' }}>
                  <label htmlFor="tgl_mulai_tridharma">Tanggal Mulai Tridharma</label>
                  <input
                    type="date"
                    className="form-control"
                    id="tgl_mulai_tridharma"
                    value={tgl_mulai_tridharma}
                    onChange={(e) => setTglMulaiTridharma(e.target.value)}
                  />
                </div>
                <div className="form-group" style={{ marginTop: '10px' }}>
                  <label htmlFor="tgl_selesai_tridharma">Tanggal Selesai Tridharma</label>
                  <input
                    type="date"
                    className="form-control"
                    id="tgl_selesai_tridharma"
                    value={tgl_selesai_tridharma}
                    onChange={(e) => setTglSelesaiTridharma(e.target.value)}
                  />
                </div>
                <button type="submit" className="btn btn-primary" style={{ marginTop: '10px' }}>Submit</button>
              </form>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AddIku3tridharma;
