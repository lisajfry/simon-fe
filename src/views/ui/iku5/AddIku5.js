import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Card, Col, CardTitle } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

const AddIku5 = () => {
  const [NID, setNID] = useState('');
  const [status, setStatus] = useState('');
  const [jenis_karya, setJenisKarya] = useState('');
  const [kategori_karya, setKategoriKarya] = useState('');
  const [judul_karya, setJudulKarya] = useState('');
  const [pendanaan, setPendanaan] = useState('');
  const [kriteria, setKriteria] = useState('');
  const [buktiPendukung, setBuktiPendukung] = useState(null);
  const [tahun, setTahun] = useState('');
  const [options, setOptions] = useState([]);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchOptions();
  }, []);

  const fetchOptions = async () => {
    try {
      const responseNIDN = await axios.get('http://localhost:8080/dosen');
      const responseNIDK = await axios.get('http://localhost:8080/dosenNIDK');
      const combinedOptions = [
        ...responseNIDN.data.map((dosen) => ({ value: dosen.NIDN, label: `${dosen.NIDN} - ${dosen.nama_dosen}` })),
        ...responseNIDK.data.map((dosen) => ({ value: dosen.NIDK, label: `${dosen.NIDK} - ${dosen.nama_dosen}` })),
      ];
      setOptions(combinedOptions);
    } catch (error) {
      console.error("Error fetching NID options:", error);
    }
  };

  const saveIku5Data = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('NID', NID);
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
      console.log('Data yang akan dikirim:', {
        NID,
        status,
        jenis_karya,
        kategori_karya,
        judul_karya,
        pendanaan,
        kriteria,
        tahun,
        buktiPendukung
      });

      const response = await axios.post('http://localhost:8080/add/iku5', formData);
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

  useEffect(() => {
    console.log('Nilai tahun:', tahun);
  }, [tahun]);

  return (
    <div>
      <Container fluid style={{ maxWidth: '80%' }}>
        <Row>
          <Col xs="12" md="12" sm="12">
            <Card style={{ maxWidth: '80%', marginLeft: '-5%', padding: '20px', marginTop: '20px' }}>
              <CardTitle><b>FORM INPUT IKU 5</b></CardTitle>
              <form onSubmit={saveIku5Data}>
                <div className="form-group">
                  <label className="label">Dosen</label>
                  <select
                    className="form-control"
                    value={NID}
                    onChange={(e) => setNID(e.target.value)}
                  >
                    <option value="">Pilih NIDN/NIDK</option>
                    {options.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
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
                    <option value="Artikel Ilmiah">Artikel Ilmiah</option>
                    <option value="Buku Akademik">Buku Akademik</option>
                    <option value="Bab (chapter) dalam buku akademik">Bab (chapter) dalam buku akademik</option>
                    <option value="Karya rujukan">Karya rujukan</option>
                    <option value="Studi kasus">Studi kasus</option>
                    <option value="Laporan penelitian untuk mitra">Laporan penelitian untuk mitra</option>
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
                    <option value="dalam bentuk monograf">Dalam Bentuk Monograf</option>
                    <option value="hasil penelitian kerjasama industri termasuk penugasan dari kementerian atau LPNK yang tidak dipublikasikan">Hasil Penelitian Kerjasama Industri Termasuk Penugasan dari Kementerian atau LPNK yang Tidak Dipublikasikan</option>
                    <option value="diterapkan/digunakan/diaplikasikan pada Dunia Usaha dan Dunia Industri atau Masyarakat pada tingkat internasional atau Nasional">Diterapkan/Digunakan/Diaplikasikan pada Dunia Usaha dan Dunia Industri atau Masyarakat pada Tingkat Internasional atau Nasional</option>
                    <option value="hasil Rancangan Teknologi/Seni yang dipatenkan secara internasional">Hasil Rancangan Teknologi/Seni yang Dipatenkan Secara Internasional</option>
                    <option value="belum diterapkan tetapi sudah mendapatkan ijin edar atau sudah terstandarisasi">Belum Diterapkan Tetapi Sudah Mendapatkan Ijin Edar atau Sudah Terstandarisasi</option>
                    <option value="hasil Rancangan Teknologi/Seni yang dipatenkan secara Nasional;">Hasil Rancangan Teknologi/Seni yang Dipatenkan Secara Nasional</option>
                    <option value="melaksanakan pengembangan hasil pendidikan dan penelitian">Melaksanakan Pengembangan Hasil Pendidikan dan Penelitian</option>
                    <option value="melaksanakan dan/atau menghasilkan karya seni atau kegiatan seni pada tingkat internasional">Melaksanakan dan/atau Menghasilkan Karya Seni atau Kegiatan Seni pada Tingkat Internasional</option>
                    <option value="melaksanakan dan/atau menghasilkan karya seni atau kegiatan seni pada tingkat Nasional">Melaksanakan dan/atau Menghasilkan Karya Seni atau Kegiatan Seni pada Tingkat Nasional</option>
                    <option value="melaksanakan penelitian di bidang seni yang dipatenkan atau dipublikasikan dalam seminar nasional">Melaksanakan Penelitian di Bidang Seni yang Dipatenkan atau Dipublikasikan dalam Seminar Nasional</option>
                    <option value="melaksanakan dan/atau menghasilkan karya seni atau kegiatan seni pada tingkat lokal">Melaksanakan dan/atau Menghasilkan Karya Seni atau Kegiatan Seni Pada Tingkat Lokal</option>
                    <option value="membuat rancangan karya seni atau kegiatan seni tingkat nasional">Membuat Rancangan Karya Seni atau Kegiatan Seni Tingkat Nasional</option>
                    <option value="melaksanakan penelitian di bidang seni yang tidak dipatenkan atau dipublikasikan">Melaksanakan Penelitian di Bidang Seni yang Tidak Dipatenkan atau Dipublikasikan</option>
                  </select>
                </div>

                <div className="form-group" style={{ marginTop: '10px' }}>
                  <label htmlFor="bukti_pendukung">Bukti Pendukung</label>
                  <input
                    type="file"
                    className="form-control"
                    id="bukti_pendukung"
                    onChange={handleFileChange}
                  />
                </div>

                <div className="form-group">
                  <label className="label">Tahun</label>
                  <input
                    type="text" // Ubah ke 'number' jika hanya ingin angka
                    className="form-control"
                    value={tahun}
                    onChange={(e) => setTahun(e.target.value)}
                  />
                </div>

                <button type="submit" className="btn btn-primary" style={{ marginTop: '10px' }}>Tambahkan</button>
              </form>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AddIku5;
