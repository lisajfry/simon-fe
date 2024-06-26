import React, { useState } from 'react';
import axios from 'axios';
import { Container, Row, Card, Col, CardTitle, Label, Input, FormGroup } from 'reactstrap';
import { useNavigate } from 'react-router-dom';




const AddIku6 = () => {
    const [nama_mitra, setNamaMitra] = useState('');
    const [nama_kegiatan, setNamaKegiatan] = useState('');
    const [alamat_mitra, setAlamatMitra] = useState('');
    const [tgl_mulai_kegiatan, setTglMulaiKegiatan] = useState('');
    const [tgl_selesai_kegiatan, setTglSelesaiKegiatan] = useState('');
    const [kriteria_mitra, setKriteriaMitra] = useState('');
    const [mou, setMou] = useState(null);
    const navigate = useNavigate();


    const saveIku6Data = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('nama_mitra', nama_mitra);
        formData.append('nama_kegiatan', nama_kegiatan);
        formData.append('alamat_mitra', alamat_mitra);
        formData.append('tgl_mulai_kegiatan', tgl_mulai_kegiatan);
        formData.append('tgl_selesai_kegiatan', tgl_selesai_kegiatan);
        formData.append('kriteria_mitra', kriteria_mitra);
        if (mou) {
            formData.append('mou', mou);
        }




        try {
            await axios.post('http://localhost:8080/add/iku6', formData); // Sesuaikan dengan endpoint yang benar
            navigate('/iku6', { replace: true });
          } catch (error) {
            console.error("Error while saving data:", error);
          }
        };
     
        const handleFileChangeMOU = (e) => {
          const file = e.target.files[0];
          setMou(file);
        };


    return (
        <div>
            <Container fluid style={{ maxWidth: '80%' }}>
                <Row>
                    <Col xs="12" md="12" sm="12">
                        <Card style={{ maxWidth: '80%', marginLeft: '-5%', padding: '20px', marginTop: '20px' }}>
                            <CardTitle><b>Add Data</b></CardTitle>
                            <form onSubmit={saveIku6Data}>
                                <FormGroup>
                                    <label htmlFor="nama_mitra">Nama Mitra</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="nama_mitra"
                                        value={nama_mitra}
                                        onChange={(e) => setNamaMitra(e.target.value)}
                                        placeholder="Nama Mitra"
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <label htmlFor="nama_kegiatan">Nama Kegiatan</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="nama_kegiatan"
                                        value={nama_kegiatan}
                                        onChange={(e) => setNamaKegiatan(e.target.value)}
                                        placeholder="Nama Kegiatan"
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <label htmlFor="alamat_mitra">Alamat Mitra</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="alamat_mitra"
                                        value={alamat_mitra}
                                        onChange={(e) => setAlamatMitra(e.target.value)}
                                        placeholder="Alamat Mitra"
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <label htmlFor="tgl_mulai_kegiatan">Tanggal Mulai Kegiatan</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="tgl_mulai_kegiatan"
                                        value={tgl_mulai_kegiatan}
                                        onChange={(e) => setTglMulaiKegiatan(e.target.value)}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <label htmlFor="tgl_selesai_kegiatan">Tanggal Selesai Kegiatan</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="tgl_selesai_kegiatan"
                                        value={tgl_selesai_kegiatan}
                                        onChange={(e) => setTglSelesaiKegiatan(e.target.value)}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="kriteria_mitra">Kriteria Mitra</Label>
                                    <Input type="select" id="kriteria_mitra" value={kriteria_mitra} onChange={(e) => setKriteriaMitra(e.target.value)}>
                                        <option value="">Pilih Kriteria Mitra</option>
                                        <option value="perusahaan multinasional">Perusahaan Multinasional</option>
                                        <option value="perusahaan nasional berstandar tinggi, BUMN, dan/atau BUMD">Perusahaan Nasional Berstandar Tinggi, BUMN, dan/atau BUMD</option>
                                        <option value="perusahaan teknologi global">Perusahaan Teknologi Global</option>
                                        <option value="perusahaan rintisan (startup company) teknologi">Perusahaan Rintisan (Startup Company) Teknologi</option>
                                        <option value="organisasi nirlaba kelas dunia">Organisasi Nirlaba Kelas Dunia</option>
                                        <option value="institusi/organisasi multilateral">Institusi/Organisasi Multilateral</option>
                                        <option value="perguruan tinggi yang masuk dalam daftar QS200 berdasarkan bidang ilmu (QS200 by subject) perguruan tinggi luar negeri">Perguruan Tinggi yang Masuk dalam Daftar QS200 Berdasarkan Bidang Ilmu (QS200 by Subject) Perguruan Tinggi Luar Negeri</option>
                                        <option value="perguruan tinggi yang masuk dalam daftar QS200 berdasarkan bidang ilmu (QS200 by subject) perguruan tinggi dalam negeri">Perguruan Tinggi yang Masuk dalam Daftar QS200 Berdasarkan Bidang Ilmu (QS200 by Subject) Perguruan Tinggi Dalam Negeri</option>
                                        <option value="instansi pemerintah">Instansi Pemerintah</option>
                                        <option value="rumah sakit">Rumah Sakit</option>
                                        <option value="lembaga riset pemerintah, swasta, nasional, maupun internasional">Lembaga Riset Pemerintah, Swasta, Nasional, maupun Internasional</option>
                                        <option value="lembaga kebudayaan berskala nasional/bereputasi">Lembaga Kebudayaan Berskala Nasional/Bereputasi</option>
                                    </Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="mou">Dokumen Kesepahaman (MOU)</Label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        id="mou"
                                        accept=".pdf"
                                        onChange={(e) => handleFileChangeMOU(e, setMou)}
                                    />
                                </FormGroup>
                                <button type="submit" className="btn btn-primary" style={{ marginTop: '10px' }}>Submit</button>
                            </form>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};




export default AddIku6;
