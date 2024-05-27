import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Container, Row, Card, Col, CardTitle } from "reactstrap";
import { useNavigate } from 'react-router-dom';

const AddIku5 = () => {
  const [NIDN, setNIDN] = useState('');
  const [status, setStatus] = useState('');
  const [options, setOptions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchNIDNOptions();
  }, []);

  const fetchNIDNOptions = async () => {
    try {
      const response = await axios.get('http://localhost:8080/dosen');
      console.log('Response:', response.data); // Check response data
      // Filter hanya mahasiswa yang sudah lulus
      setOptions(response.data);
    } catch (error) {
      console.error("Error fetching NIDN options:", error);
    }
  };

  const saveIku5Data = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('NIDN', NIDN);
    formData.append('status', status);

    try {
      await axios.post('http://localhost:8080/add/iku5', formData);
      navigate('/iku5list', { replace: true });
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
              <CardTitle><b>FORM INPUT IKU 5</b></CardTitle>
              <form onSubmit={saveIku5Data}>
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
                  <label className="label">Hasil Kerja</label>
                  <select
                    className="form-control"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="">Pilih Hasil Kerja Dosen</option>
                    <option value="Karya Tulis Ilmiah">Karya Tulis Ilmiah</option>
                    <option value="Karya Terapan">Karya Terapan</option>
                    <option value="Karya Seni">Karya Seni</option>
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

export default AddIku5;