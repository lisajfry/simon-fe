import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Row, Card, Col, CardTitle } from 'reactstrap';


const EditIku4 = () => {
  const [identifier, setIdentifier] = useState('');
  const [identifierType, setIdentifierType] = useState('');
  const [status, setStatus] = useState('');
  const [file, setFile] = useState(null);
  const [dosenOptions, setDosenOptions] = useState([]);
  const [dosenNIDKOptions, setDosenNIDKOptions] = useState([]);
  const [berkasOptions, setBerkasOptions] = useState([]);
  const [idBerkas, setIdBerkas] = useState('');
  const [tanggal, setTanggal] = useState('');
  const navigate = useNavigate();
  const { iku4_id } = useParams();


  useEffect(() => {
    fetchIku4Data();
    fetchNIDNOptions();
    fetchNIDKOptions();
    fetchBerkasOptions();
  }, []);


  const fetchIku4Data = async () => {
  try {
    const response = await axios.get(`http://localhost:8080/iku4/${iku4_id}`);
    const iku4 = response.data;
    setIdentifier(iku4.NIDN || iku4.NIDK);
    setIdentifierType(iku4.NIDN ? 'NIDN' : 'NIDK');
    setStatus(iku4.status);
    setIdBerkas(iku4.id_berkas);
    setTanggal(iku4.tanggal);
  } catch (error) {
    console.error('Error fetching IKU 4 data:', error);
    alert('Error fetching IKU 4 data: ' + error.message);
  }
};




const fetchNIDNOptions = async () => {
    try {
      const response = await axios.get('http://localhost:8080/dosen');
      setDosenOptions(response.data);
    } catch (error) {
      console.error('Error fetching NIDN options:', error);
      alert('Error fetching NIDN options: ' + error.message);
    }
  };
 
  const fetchNIDKOptions = async () => {
    try {
      const response = await axios.get('http://localhost:8080/dosenNIDK');
      setDosenNIDKOptions(response.data);
    } catch (error) {
      console.error('Error fetching NIDK options:', error);
      alert('Error fetching NIDK options: ' + error.message);
    }
  };
 


  const fetchBerkasOptions = async () => {
    try {
      const response = await axios.get('http://localhost:8080/berkassertifikasi');
      setBerkasOptions(response.data);
    } catch (error) {
      console.error('Error fetching Berkas options:', error);
      alert('Error fetching Berkas options: ' + error.message);
    }
  };


  const updateIku4Data = async (e) => {
    e.preventDefault();
    const formData = new FormData();


    if (identifierType === 'NIDN') {
      formData.append('NIDN', identifier);
    } else if (identifierType === 'NIDK') {
      formData.append('NIDK', identifier);
    } else {
      console.error('Harus memilih NIDN atau NIDK');
      return;
    }


    formData.append('status', status);
    formData.append('tanggal', tanggal);
    if (file) {
      formData.append('bukti_pdf', file);
    }
    formData.append('id_berkas', idBerkas);


    try {
      await axios.post(`http://localhost:8080/update/iku4/${iku4_id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      navigate('/iku4list', { replace: true });
    } catch (error) {
      console.error('Error updating data:', error);
      alert('Error updating data: ' + error.message);
    }
  };


  const handleDosenChange = (e) => {
    const selectedOption = e.target.value;
    const selectedDosen = dosenOptions.find(option => option.NIDN === selectedOption) || dosenNIDKOptions.find(option => option.NIDK === selectedOption);
 
    if (selectedDosen) {
      if (selectedDosen.NIDN) {
        setIdentifier(selectedDosen.NIDN);
        setIdentifierType('NIDN');
      } else if (selectedDosen.NIDK) {
        setIdentifier(selectedDosen.NIDK);
        setIdentifierType('NIDK');
      }
    } else {
      setIdentifier('');
      setIdentifierType('');
    }
  };




  return (
    <div>
      <Container fluid style={{ maxWidth: '80%' }}>
        <Row>
          <Col xs="12" md="12" sm="12">
            <Card style={{ maxWidth: '80%', marginLeft: '-5%', padding: '20px', marginTop: '20px' }}>
              <CardTitle><b>FORM EDIT IKU 4</b></CardTitle>
              <form onSubmit={updateIku4Data}>
                <div className="form-group" style={{ marginTop: '20px' }}>
                  <label htmlFor="NIDN">Nama Dosen</label>
                  <select
                    className="form-control"
                    required
                    value={identifier}
                    onChange={handleDosenChange}
                  >
                    <option value="">Pilih Nama Dosen</option>
                    {dosenOptions.map((option, index) => (
                      <option key={index} value={option.NIDN}>{option.nama_dosen}</option>
                    ))}
                    {dosenNIDKOptions.map((option, index) => (
                      <option key={index} value={option.NIDK}>{option.nama_dosen}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group" style={{ marginTop: '20px' }}>
                  <label htmlFor="idBerkas">Tipe Berkas</label>
                  <select
                    className="form-control"
                    value={idBerkas}
                    onChange={(e) => setIdBerkas(e.target.value)}
                  >
                    <option value="">Pilih Tipe Berkas</option>
                    {berkasOptions.map((option, index) => (
                      <option key={index} value={option.id_berkas}>{option.nama_berkas}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label className="label">Tanggal</label>
                  <input
                    type="date"
                    className="form-control"
                    value={tanggal}
                    onChange={(e) => setTanggal(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="label">Status</label>
                  <select
                    className="form-control"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="">Pilih Status</option>
                    <option value="Dosen yang Memiliki Sertifikasi Kompetensi/Profesi">Dosen yang Memiliki Sertifikasi Kompetensi/Profesi</option>
                    <option value="Dosen dari Kalangan Praktisi Profesional">Dosen dari Kalangan Praktisi Profesional</option>
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
                  <button type="submit" className="btn btn-primary">Update</button>
                </div>
              </form>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};


export default EditIku4;
