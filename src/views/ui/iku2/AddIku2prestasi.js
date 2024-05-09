import React, { useState } from 'react';
import axios from "axios";
import { Container, Row, Card, Col, CardTitle } from "reactstrap";
import { useNavigate } from 'react-router-dom';

const AddIku2prestasi = () => {
  const [NIM, setNIM] = useState('');
  const [NIDN, setNIDN] = useState('');
  const [tingkat_lomba, setTingkatLomba] = useState('');
  const [prestasi, setPrestasi] = useState('');
  const navigate = useNavigate();

  const saveIku2prestasiData = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('NIM', NIM);
    formData.append('NIDN', NIDN);
    formData.append('tingkat_lomba', tingkat_lomba);
    formData.append('prestasi', prestasi);
  
    try {
      await axios.post('http://localhost:8080/add/iku2prestasi', formData); // Sesuaikan dengan endpoint yang benar
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
            <Card style={{ maxWidth: '80%', marginLeft: '-5%', padding: '20px', marginTop: '20px' }}>
              <CardTitle><b>FORM INPUT IKU 2 Prestasi di Luar Prodi</b></CardTitle>
              <form onSubmit={saveIku2prestasiData}>
                <div className="form-group" style={{ marginTop: '20px' }}>
                  <label htmlFor="NIM">Mahasiswa Berprestasi</label>
                  <input
                    type="text"
                    className="form-control"
                    id="NIM"
                    value={NIM}
                    onChange={(e) => setNIM(e.target.value)}
                    placeholder="NIM"
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
                  <label className="label">Tingkat Lomba</label>
                  <select
                    className="form-control"
                    value={tingkat_lomba}
                    onChange={(e) => setTingkatLomba(e.target.value)}
                  >
                    <option value="">Pilih Tingkat Lomba</option>
                    <option value="internasional">Internasional</option>
                    <option value="nasional">Nasional</option>
                    <option value="provinsi">Provinsi</option>
                  </select>
                </div>
                <div className="form-group" style={{ marginTop: '10px' }}>
                  <label className="label">Prestasi</label>
                  <select
                    className="form-control"
                    value={prestasi}
                    onChange={(e) => setPrestasi(e.target.value)}
                  >
                    <option value="">Pilih Prestasi</option>
                    <option value="juara1">Juara 1</option>
                    <option value="juara2">Juara 2</option>
                    <option value="juara3">Juara 3</option>
                    <option value="peserta">Peserta</option>
                  </select>
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

export default AddIku2prestasi;
