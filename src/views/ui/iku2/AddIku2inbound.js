import React, { useState } from 'react';
import axios from "axios";
import { Container, Row, Card, Col, CardTitle } from "reactstrap";
import { useNavigate } from 'react-router-dom';

const AddIku2inbound = () => {
  const [NIM, setNIM] = useState('');
  const [semester, setSemester] = useState('');
  const [tahun, setTahun] = useState('');

  const [ptn_asal, setPtnAsal] = useState('');
  const [ptn_pertukaran, setPtnPertukaran] = useState('');
  const [surat_rekomendasi, setSuratRekomendasi] = useState(null);
  const [sks, setSks] = useState('');
  const [NIDN, setNIDN] = useState('');
  const [tgl_mulai_inbound, setTglMulaiInbound] = useState('');
  const [tgl_selesai_inbound, setTglSelesaiInbound] = useState('');
  const navigate = useNavigate();

  const saveIku2inboundData = async (e) => {
    e.preventDefault();
    if (!surat_rekomendasi) {
      console.error("Surat Rekomendasi harus diunggah.");
      return;
    }
    const formData = new FormData();
    formData.append('NIM', NIM);
    formData.append('semester', semester);
    formData.append('tahun', tahun);

    formData.append('ptn_asal', ptn_asal);
    formData.append('ptn_pertukaran', ptn_pertukaran);
    formData.append('surat_rekomendasi', surat_rekomendasi);
    formData.append('sks', sks);
    formData.append('NIDN', NIDN);
    formData.append('tgl_mulai_inbound', tgl_mulai_inbound); // Sesuaikan dengan nama yang diharapkan oleh backend
    formData.append('tgl_selesai_inbound', tgl_selesai_inbound); // Sesuaikan dengan nama yang diharapkan oleh backend
  
  
    try {
      await axios.post('http://localhost:8080/add/iku2inbound', formData); // Sesuaikan dengan endpoint yang benar
      navigate('/iku2inboundlist', { replace: true });
    } catch (error) {
      console.error("Error while saving data:", error);
    }
  };
  
  const handleFileChange = (e) => {
    const file = e.target.files[0]; // Mengambil file yang dipilih
    setSuratRekomendasi(file); // Menyimpan file sebagai blob
  };

  const handleSemesterChange = (e) => {
    setSemester(e.target.value);
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
              <CardTitle><b>FORM INPUT IKU 2 MAHASISWA INBOUND YANG DITERIMA KAMPUS</b></CardTitle>
              <form onSubmit={saveIku2inboundData}>
                <div className="form-group" style={{ marginTop: '20px' }}>
                  <label htmlFor="NIM">Mahasiswa Inbound</label>
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
                  <label className="label">Semester</label>
                  <select
                    className="form-control"
                    value={semester}
                    onChange={handleSemesterChange}
                  >
                    <option value="">Pilih Semester</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
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
                  <label htmlFor="ptn_asal">PTN Asal</label>
                  <input
                    type="text"
                    className="form-control"
                    id="ptn_asal"
                    value={ptn_asal}
                    onChange={(e) => setPtnAsal(e.target.value)}
                    placeholder="PTN Asal"
                  />
                </div>
                <div className="form-group" style={{ marginTop: '10px' }}>
                  <label htmlFor="ptn_pertukaran">PTN Tempat Pertukaran</label>
                  <input
                    type="text"
                    className="form-control"
                    id="ptn_pertukaran"
                    value={ptn_pertukaran}
                    onChange={(e) => setPtnPertukaran(e.target.value)}
                    placeholder="PTN Tempat Pertukaran"
                  />
                </div>
                <div className="form-group" style={{ marginTop: '10px' }}>
                <label htmlFor="surat_rekomendasi">Surat Rekomendasi</label>
                <input
                  type="file"
                  className="form-control"
                  id="surat_rekomendasi"
                  onChange={handleFileChange}
                />
                </div>
                <div className="form-group" style={{ marginTop: '10px' }}>
                  <label htmlFor="sks">Sks</label>
                  <input
                    type="text"
                    className="form-control"
                    id="sks"
                    value={sks}
                    onChange={(e) => setSks(e.target.value)}
                    placeholder="Sks yang dihabiskan mahasiswa inbound di D3TI"
                  />
                </div>
                <div className="form-group" style={{ marginTop: '20px' }}>
                  <label htmlFor="NIDN">Dosen Pembimbing</label>
                  <input
                    type="text"
                    className="form-control"
                    id="NIDN"
                    value={NIDN}
                    onChange={(e) => setNIDN(e.target.value)}
                    placeholder="NIDN"
                  />
                </div>  
                <div className="form-group" style={{ marginTop: '10px' }}>
                  <label htmlFor="tgl_mulai_inbound">Tanggal Mulai Inbound</label>
                  <input
                    type="date"
                    className="form-control"
                    id="tgl_mulai_inbound"
                    value={tgl_mulai_inbound}
                    onChange={(e) => setTglMulaiInbound(e.target.value)}
                  />
                </div>
                <div className="form-group" style={{ marginTop: '10px' }}>
                  <label htmlFor="tgl_selesai_inbound">Tanggal Selesai Inbound</label>
                  <input
                    type="date"
                    className="form-control"
                    id="tgl_selesai_inbound"
                    value={tgl_selesai_inbound}
                    onChange={(e) => setTglSelesaiInbound(e.target.value)}
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

export default AddIku2inbound;
