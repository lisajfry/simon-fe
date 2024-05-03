import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { Container, Row, Card, Col } from "reactstrap";

const AddIku1 = () => {
  const [no_ijazah, setNoIjazah] = useState('');
  const [status, setStatus] = useState('');
  const [gaji, setGaji] = useState('');
  const [masa_tunggu, setMasaTunggu] = useState('');
  const [lulusanData, setLulusanData] = useState([]);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchLulusanData();
  }, []);

  const fetchLulusanData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/lulusan');
      setLulusanData(response.data);
    } catch (error) {
      console.error("Error while fetching lulusan data:", error);
    }
  };

  const saveIku1 = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (file) {
      formData.append('file', file);
    }
    formData.append('no_ijazah', no_ijazah);
  
    formData.append('status', status);
    formData.append('gaji', gaji);
    formData.append('masa_tunggu', masa_tunggu);

    try {
      await axios.post('http://localhost:8080/import/iku1', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      navigate('/iku1list', { replace: true });
    } catch (error) {
      console.error("Error while importing data:", error);
    }
  };

  const saveIku1Data = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('no_ijazah', no_ijazah);

    formData.append('status', status);
    formData.append('gaji', gaji);
    formData.append('masa_tunggu', masa_tunggu);

    try {
      await axios.post('http://localhost:8080/add/iku1', formData);
      navigate('/iku1list', { replace: true });
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
              <form onSubmit={saveIku1}>
                <div className="form-group">
                  <label>File Excel</label>
                  <input type="file" className="form-control" required accept=".xls, .xlsx" onChange={(e) => setFile(e.target.files[0])} style={{ marginBottom: '10px' }} />
                </div>
                <div className="form-group">
                  <button type="submit" className="btn btn-primary">Save</button>
                </div>
              </form>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col xs="12" md="12" sm="12">
            <Card style={{ maxWidth: '80%', marginLeft: '-5%', padding: '20px', marginTop: '20px' }}>
              <form onSubmit={saveIku1Data}>
              <div className="form-group">
    <label htmlFor="no_ijazah">No Ijazah</label>
    <select
        className="form-control"
        id="no_ijazah"
        value={no_ijazah}
        onChange={(e) => setNoIjazah(e.target.value)}
    >
        <option value="">Pilih No Ijazah</option>
        {lulusanData.map(lulusan => (
            <option key={lulusan.no_ijazah} value={lulusan.no_ijazah}>{lulusan.no_ijazah}</option>
        ))}
    </select>
</div>


                <div className="form-group">
                  <label htmlFor="status">Status</label>
                  <select
                    className="form-control"
                    id="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="">Pilih Status</option>
                    <option value="mendapat pekerjaan">Mendapat pekerjaan</option>
                    <option value="melanjutkan studi">Melanjutkan studi</option>
                    <option value="wiraswasta">Wiraswasta</option>
                    <option value="mencari pekerjaan">Mencari pekerjaan</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="gaji">Gaji</label>
                  <select
                    className="form-control"
                    id="gaji"
                    value={gaji}
                    onChange={(e) => setGaji(e.target.value)}
                  >
                    <option value="">Pilih Gaji</option>
                    <option value="lebih dari 1.2xUMP">Lebih dari 1.2xUMP</option>
                    <option value="kurang dari 1.2xUMP">Kurang dari 1.2xUMP</option>
                    <option value="belum berpendapatan">Belum Berpendapatan</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="masa_tunggu">Masa Tunggu</label>
                  <select style={{ marginBottom: '10px' }}
                    className="form-control"
                    id="masa_tunggu"
                    value={masa_tunggu}
                    onChange={(e) => setMasaTunggu(e.target.value)}
                  >
                    <option value="">Pilih Masa Tunggu</option>
                    <option value="kurang dari 6 bulan">Kurang dari 6 bulan</option>
                    <option value="antara 6 sampai 12bulan">Antara 6 sampai 12bulan</option>
                  </select >
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

export default AddIku1;
