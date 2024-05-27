import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Container, Row, Card, Col, CardTitle } from "reactstrap";
import { useNavigate } from 'react-router-dom';

const AddIku4 = () => {
  const [NIDN, setNIDN] = useState('');
  const [status, setStatus] = useState('');
  const [file, setFile] = useState(null); // Pastikan file state didefinisikan
  const [options, setOptions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchNIDNOptions();
  }, []);

  const fetchNIDNOptions = async () => {
    try {
      const response = await axios.get('http://localhost:8080/dosen');
      console.log('Response:', response.data); // Periksa data response
      setOptions(response.data);
    } catch (error) {
      console.error("Error fetching NIDN options:", error);
    }
  };

  const saveIku4Data = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('NIDN', NIDN);
    formData.append('status', status);
    if (file) {
      formData.append('file', file);
    }

    try {
      await axios.post('http://localhost:8080/add/iku4', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      navigate('/iku4list', { replace: true });
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
              <CardTitle><b>FORM INPUT IKU 4</b></CardTitle>
              <form onSubmit={saveIku4Data}>
                <div className="form-group" style={{ marginTop: '20px' }}>
                  <label htmlFor="NIDN">Nama Dosen</label>
                  <select
                    className="form-control"
                    required
                    onChange={(e) => setNIDN(e.target.value)}
                  >
                    <option value="">Pilih Nama Dosen</option>
                    {options.map((option, index) => (
                      <option key={index} value={option.NIDN}>{option.nama_dosen}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label className="label">Status</label>
                  <select
                    className="form-control"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="">Pilih Status</option>
                    <option value="Dosen Berkualifikasi S3">Dosen Berkualifikasi S3</option>
                    <option value="Sertifikasi Kompetensi Dosen">Sertifikasi Kompetensi Dosen</option>
                    <option value="Praktisi Menjadi Dosen">Praktisi Menjadi Dosen</option>
                    {/* <option value="Praktisi Mengajar (Flagship)">Praktisi Mengajar (Flagship)</option> */}
                  </select>
                </div>
                <div className="form-group">
                  <label className="label">Bukti File PDF</label>
                  <input
                    type="file"
                    className="form-control"
                    accept=".pdf"
                    onChange={(e) => setFile(e.target.files[0])}
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
export default AddIku4;