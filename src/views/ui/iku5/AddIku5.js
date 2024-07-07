import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Card, Col, CardTitle } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

const AddIku5 = () => {
  const [identifier, setIdentifier] = useState(''); 
  const [identifierType, setIdentifierType] = useState(''); 
  const [status, setStatus] = useState('');
  const [jenis_karya, setJenisKarya] = useState('');
  const [kategori_karya, setKategoriKarya] = useState('');
  const [judul_karya, setJudulKarya] = useState('');
  const [pendanaan, setPendanaan] = useState('');
  const [kriteria, setKriteria] = useState('');
  const [buktiPendukung, setBuktiPendukung] = useState(null);
  const [tahun, setTahun] = useState('');
  const [dosenOptions, setDosenOptions] = useState([]);
  const [dosenNIDKOptions, setDosenNIDKOptions] = useState([]);
  const [yearOptions, setYearOptions] = useState([]);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchNIDNOptions();
    fetchNIDKOptions();
    fetchYearOptions();
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

  const fetchYearOptions = async () => {
    try {
      const response = await axios.get('http://localhost:8080/years');
      console.log("Year options response: ", response.data); // Logging the response
      const yearOptions = response.data.map((year) => ({ value: year.id, label: year.year }));
      setYearOptions(yearOptions);
    } catch (error) {
      console.error("Error fetching year options:", error);
    }
  };

  const saveIku5Data = async (e) => {
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
    formData.append('jenis_karya', jenis_karya);
    formData.append('kategori_karya', kategori_karya);
    formData.append('judul_karya', judul_karya);
    formData.append('pendanaan', pendanaan);
    formData.append('kriteria', kriteria);
    formData.append('tahun', tahun);

    if (buktiPendukung) {
      formData.append('bukti_pendukung', buktiPendukung);
    }

    try {
      const response = await axios.post('http://localhost:8080/add/iku5', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      if (response.status === 201) {
        console.log('Data berhasil disimpan');
        navigate('/iku5list', { replace: true });
      } else {
        setErrors(response.data.errors); 
      }
    } catch (error) {
      console.error("Error while saving data:", error);
    }
  };

  const handleFileChange = (e) => {
    setBuktiPendukung(e.target.files[0]);
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

  const handleFocus = (setter) => {
    setter('');
  };

  const getKategoriOptions = () => {
    if (jenis_karya === 'Karya Tulis Ilmiah') {
      return [
        "Artikel Ilmiah",
        "Buku Akademik",
        "Bab (chapter) dalam buku akademik",
        "Karya rujukan",
        "Studi kasus",
        "Laporan penelitian untuk mitra"
      ];
    } else if (jenis_karya === 'Karya Terapan') {
      return [
        "Rekayasa Teknologi",
        "Inovasi Sosial",
        "Produk Terapan"
      ];
    } else if (jenis_karya === 'Karya Seni') {
      return [
        "Karya Seni Visual",
        "Karya Seni Audio",
        "Karya Seni Audio-Visual",
        "Karya Seni Pertunjukan",
        "Karya Seni Desain",
        "Karya Seni Novel",
        "Karya Seni Sajak",
        "Karya Seni Puisi",
        "Karya Seni Notasi Musik",
        "Karya Seni Preservasi"
      ];
    } else {
      return [];
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
                <div className="form-group">
                  <label className="label">Status</label>
                  <select
                    className="form-control"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="">Pilih Status</option>
                    <option value="mendapatkan rekognisi internasional">Mendapatkan Rekognisi Internasional</option>
                    <option value="diterapkan di masyarakat/industri/pemerintah">Diterapkan di Masyarakat/Industri/Pemerintah</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="label">Jenis Karya</label>
                  <select
                    className="form-control"
                    value={jenis_karya}
                    onChange={(e) => setJenisKarya(e.target.value)}
                  >
                    <option value="">Pilih Jenis Karya</option>
                    <option value="Karya Tulis Ilmiah">Karya Tulis Ilmiah</option>
                    <option value="Karya Terapan">Karya Terapan</option>
                    <option value="Karya Seni">Karya Seni</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="label">Kategori Karya</label>
                  <select
                    className="form-control"
                    value={kategori_karya}
                    onChange={(e) => setKategoriKarya(e.target.value)}
                  >
                    <option value="">Pilih Kategori Karya</option>
                    {getKategoriOptions().map((option, index) => (
                      <option key={index} value={option}>{option}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="label">Judul Karya</label>
                  <input
                    type="text"
                    className="form-control"
                    value={judul_karya}
                    onChange={(e) => setJudulKarya(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="label">Pendanaan</label>
                  <input
                    type="text"
                    className="form-control"
                    value={pendanaan}
                    onChange={(e) => setPendanaan(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label className="label">Kriteria</label>
                  <select
                    className="form-control"
                    value={kriteria}
                    onChange={(e) => setKriteria(e.target.value)}
                  >
                    <option value="">Pilih Kriteria</option>
                    <option value="buku referensi">Buku Referensi</option>
                    <option value="jurnal internasional bereputasi">Jurnal Internasional Bereputasi</option>
                    <option value="buku nasional/internasional yang mempunyai ISBN">Buku Nasional/Internasional yang Memiliki ISBN</option>
                    <option value="book chapter internasional">Book Chapter Internasional</option>
                    <option value="jurnal nasional berbahasa inggris atau bahasa resmi PBB terindeks pada DOAJ">Jurnal Nasional Berbahasa Inggris atau Bahasa Resmi PBB Terindeks pada DOAJ</option>
                    <option value="presiding internasional dalam seminar internasional">Presiding Internasional dalam Seminar Internasional</option>
                    <option value="dalam bentuk hak cipta/paten paten sederhana diakui secara internasional">Dalam Bentuk Hak Cipta/Paten Paten Sederhana Diakui Secara Internasional</option>
                    <option value="hasil rancangan teknologi/seni yang dipresentasikan dalam pameran/pentas seni nasional/internasional">Hasil Rancangan Teknologi/Seni yang Dipresentasikan dalam Pameran/Pentas Nasional/Internasional</option>
                    <option value="rekayasa sosial">Rekayasa Sosial</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="label">Bukti Pendukung</label>
                  <input
                    type="file"
                    className="form-control"
                    onChange={handleFileChange}
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

                <button type="submit" className="btn btn-primary">Submit</button>
              </form>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AddIku5;
