import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Container, Row, Card, Col, CardTitle } from "reactstrap";
import { FaDownload } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const AddIku1 = () => {
  const [NIM, setNIM] = useState('');
  const [status, setStatus] = useState('');
  const [gaji, setGaji] = useState('');
  const [masa_tunggu, setMasaTunggu] = useState('');
  const [tahun, setTahun] = useState('');
  const [file, setFile] = useState(null);
  const [options, setOptions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchNIMOptions();
  }, []);

  const fetchNIMOptions = async () => {
    try {
      const response = await axios.get('http://localhost:8080/mahasiswa');
      console.log(response.data);
      console.log('Response:', response.data); // Check response data
      // Filter hanya mahasiswa yang sudah lulus
      const lulusanData = response.data.filter(mahasiswa => mahasiswa.keterangan === 'lulus');
      console.log('Lulusan Data:', lulusanData); // Check filtered data
      const NIMOptions = lulusanData.map(mahasiswa => mahasiswa.NIM);
      console.log('NIM Options:', NIMOptions); // Check NIM options
      setOptions(NIMOptions);
      
    } catch (error) {
      console.error("Error while fetching NIM options:", error);
    }
  };
  

  const saveIku1 = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (file) {
      formData.append('file', file);
    }
    formData.append('NIM', NIM);
    formData.append('status', status);
    formData.append('gaji', gaji);
    formData.append('masa_tunggu', masa_tunggu);
    formData.append('tahun', tahun);


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
    formData.append('NIM', NIM);
    formData.append('status', status);
    formData.append('gaji', gaji);
    formData.append('masa_tunggu', masa_tunggu);
    formData.append('tahun', tahun);

    try {
      await axios.post('http://localhost:8080/add/iku1', formData);
      navigate('/iku1list', { replace: true });
    } catch (error) {
      console.error("Error while saving data:", error);
    }
  };

  const downloadTemplate = async () => {
    try {
      const response = await axios.get('/template_iku1.xlsx', {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'template_iku1.xlsx');
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error while downloading template:", error);
    }
  };

  const handleFocus = (setter) => {
    setter('');
  };

  return (
    <div>
      <Container fluid style={{ maxWidth: '80%' }}>
        <Row>
          <Col xs="12" md="12" sm="12">
            <Card style={{ maxWidth: '80%', marginLeft: '-5%', padding: '20px' }}>
              <div className="form-group">
                <button type="button" className="btn btn-primary" onClick={downloadTemplate}>
                  <FaDownload /> Unduh Template Excel
                </button>
              </div>
              <form onSubmit={saveIku1}>
                <div className="form-group" style={{ marginTop: '20px' }}>
                  <label>File Excel</label>
                  <input type="file" className="form-control" required accept=".xls, .xlsx" onChange={(e) => setFile(e.target.files[0])} style={{ marginBottom: '10px' }} />
                </div>
                <div className="form-group">
                  <button type="submit" className="btn btn-primary">Tambahkan</button>
                </div>
              </form>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col xs="12" md="12" sm="12">
            <Card style={{ maxWidth: '80%', marginLeft: '-5%', padding: '20px', marginTop: '20px' }}>
              <CardTitle><b>FORM INPUT IKU 1</b></CardTitle>
              <form onSubmit={saveIku1Data}>
                <div className="form-group" style={{ marginTop: '20px' }}>
                  <label htmlFor="NIM">NIM</label>
                  <select
                    className="form-control"
                    required
                    onChange={(e) => setNIM(e.target.value)}
                  >
                    <option value="">Pilih NIM</option>
                    {options.map((NIMOption, index) => (
                      <option key={index} value={NIMOption}>{NIMOption}</option>
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
                    <option value="mendapat pekerjaan">Mendapat Pekerjaan</option>
                    <option value="melanjutkan studi">Melanjutkan Studi</option>
                    <option value="wiraswasta">Wiraswasta</option>
                    <option value="mencari pekerjaan">Mencari Pekerjaan</option>
                  </select>
                </div>
                <div className="field">
                  <label className="label">Gaji</label>
                  <select
                    className="form-control"
                    value={gaji}
                    onChange={(e) => setGaji(e.target.value)}
                  >
                    <option value="">Pilih Gaji</option>
                    <option value="lebih dari 1.2xUMP">Lebih dari 1.2xUMP</option>
                    <option value="kurang dari 1.2xUMP">Kurang dari 1.2xUMP</option>
                    <option value="belum berpendapatan">Belum berpendapatan</option>
                  </select>
                </div>
                <div className="field">
                  <label className="label">Masa Tunggu</label>
                  <select
                    className="form-control"
                    value={masa_tunggu}
                    onChange={(e) => setMasaTunggu(e.target.value)}
                  >
                    <option value="">Pilih Masa Tunggu</option>
                    <option value="kurang dari 6 bulan">Kurang dari 6 bulan</option>
                    <option value="antara 6 sampai 12bulan">Antara 6 sampai 12 bulan</option>
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

export default AddIku1;