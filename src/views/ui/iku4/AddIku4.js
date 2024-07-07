import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Container, Row, Card, Col, CardTitle } from "reactstrap";
import { useNavigate } from 'react-router-dom';


const AddIku4 = () => {
  const [identifier, setIdentifier] = useState(''); // Definisikan state tunggal untuk NIDN dan NIDK
  const [identifierType, setIdentifierType] = useState(''); // Untuk melacak jenis identifier (NIDN atau NIDK)
  const [status, setStatus] = useState('');
  const [file, setFile] = useState(null);
  const [dosenOptions, setDosenOptions] = useState([]);
  const [dosenNIDKOptions, setDosenNIDKOptions] = useState([]);
  const [berkasOptions, setBerkasOptions] = useState([]);
  const [idBerkas, setIdBerkas] = useState('');
  const [tanggal, setTanggal] = useState('');
  const navigate = useNavigate();


  useEffect(() => {
    fetchNIDNOptions();
    fetchNIDKOptions();
    fetchBerkasOptions();
  }, []);


  const fetchNIDNOptions = async () => {
    try {
      const response = await axios.get('http://localhost:8080/dosen');
      console.log('Response (dosen):', response.data);
      setDosenOptions(response.data);
    } catch (error) {
      console.error("Error fetching NIDN options (dosen):", error);
    }
  };


  const fetchNIDKOptions = async () => {
    try {
      const response = await axios.get('http://localhost:8080/dosenNIDK');
      console.log('Response (dosenNIDK):', response.data);
      const options = response.data.map(dosen => ({
        NIDK: dosen.NIDK,
        nama_dosen: dosen.nama_dosen
      }));
      setDosenNIDKOptions(options);
    } catch (error) {
      console.error("Error fetching NIDK options (dosenNIDK):", error);
    }
  };


  const fetchBerkasOptions = async () => {
    try {
      const response = await axios.get('http://localhost:8080/berkassertifikasi');
      console.log('Response (berkas):', response.data);
      setBerkasOptions(response.data);
    } catch (error) {
      console.error("Error fetching Berkas options:", error);
    }
  };


  const saveIku4Data = async (e) => {
    e.preventDefault();
    const formData = new FormData();
   
    if (identifierType === 'NIDN') {
        formData.append('NIDN', identifier);
    } else if (identifierType === 'NIDK') {
        formData.append('NIDK', identifier);
    } else {
        console.error('Harus memilih NIDN atau NIDK');
        return; // Tidak melakukan pengiriman jika tidak ada NIDN atau NIDK
    }


    formData.append('status', status);
    formData.append('tanggal', tanggal);
    if (file) {
        formData.append('bukti_pdf', file); // Pastikan menggunakan 'bukti_pdf' untuk nama file PDF
    }
    formData.append('id_berkas', idBerkas);


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
              <CardTitle><b>FORM INPUT IKU 4</b></CardTitle>
              <form onSubmit={saveIku4Data}>
                <div className="form-group" style={{ marginTop: '20px' }}>
                  <label htmlFor="NIDN">Nama Dosen</label>
                  <select
                    className="form-control"
                    required
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
                  <label className="label">Nama Jabatan</label>
                  <select
                    className="form-control"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="">Pilih Status</option>
                    <option value="Direktur">Direktur</option>
                    <option value="Karyawan">Karyawan</option>
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


