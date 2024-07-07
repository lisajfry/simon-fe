import React, { useState } from 'react';
import axios from "axios";
import { Container, Row, Card, Col, CardTitle } from "reactstrap";
import { useNavigate } from 'react-router-dom';

const AddIku3praktisi = () => {
  const [NIDN, setNIDN] = useState('');
  const [tahun, setTahun] = useState('');
  const [surat_sk, setSuratSk] = useState(null);
  const [instansi_praktisi, setInstansiPraktisi] = useState('');
  const [tgl_mulai_praktisi, setTglMulaiPraktisi] = useState('');
  const [tgl_selesai_praktisi, setTglSelesaiPraktisi] = useState('');
  const navigate = useNavigate();

  const saveIku3praktisiData = async (e) => {
    e.preventDefault();
    if (!surat_sk) {
      console.error("Surat SK harus diunggah.");
      return;
    }
    const formData = new FormData();
    formData.append('NIDN', NIDN);
    formData.append('tahun', tahun);
    formData.append('surat_sk', surat_sk);
    formData.append('instansi_praktisi', instansi_praktisi);
    formData.append('tgl_mulai_praktisi', tgl_mulai_praktisi); // Sesuaikan dengan nama yang diharapkan oleh backend
    formData.append('tgl_selesai_praktisi', tgl_selesai_praktisi); // Sesuaikan dengan nama yang diharapkan oleh backend
  
  
    try {
      await axios.post('http://localhost:8080/add/iku3praktisi', formData); // Sesuaikan dengan endpoint yang benar
      navigate('/iku3praktisilist', { replace: true });
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
              <CardTitle><b>FORM INPUT IKU 3 DOSEN PRAKTISI DI KAMPUS LAIN</b></CardTitle>
              <form onSubmit={saveIku3praktisiData}>
                <div className="form-group" style={{ marginTop: '20px' }}>
                  <label htmlFor="NIDN">Dosen</label>
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
                  <label htmlFor="instansi_praktisi">Instansi Praktisi</label>
                  <input
                    type="text"
                    className="form-control"
                    id="instansi_praktisi"
                    value={instansi_praktisi}
                    onChange={(e) => setInstansiPraktisi(e.target.value)}
                    placeholder="Instansi Praktisi"
                  />
                </div>
                <div className="form-group" style={{ marginTop: '10px' }}>
                  <label htmlFor="tgl_mulai_praktisi">Tanggal Mulai Praktisi</label>
                  <input
                    type="date"
                    className="form-control"
                    id="tgl_mulai_praktisi"
                    value={tgl_mulai_praktisi}
                    onChange={(e) => setTglMulaiPraktisi(e.target.value)}
                  />
                </div>
                <div className="form-group" style={{ marginTop: '10px' }}>
                  <label htmlFor="tgl_selesai_praktisi">Tanggal Selesai Praktisi</label>
                  <input
                    type="date"
                    className="form-control"
                    id="tgl_selesai_praktisi"
                    value={tgl_selesai_praktisi}
                    onChange={(e) => setTglSelesaiPraktisi(e.target.value)}
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

export default AddIku3praktisi;
