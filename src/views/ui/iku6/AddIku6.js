import React, { useState } from 'react';
import axios from 'axios';
import { Container, Row, Card, Col, CardTitle, Label, Input, FormGroup, Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';


const AddIku6 = () => {
    const navigate = useNavigate();
    const [namaMitra, setNamaMitra] = useState('');
    const [namaKegiatan, setNamaKegiatan] = useState('');
    const [alamatMitra, setAlamatMitra] = useState('');
    const [tglMulaiKegiatan, setTglMulaiKegiatan] = useState('');
    const [tglSelesaiKegiatan, setTglSelesaiKegiatan] = useState('');
    const [kriteriaMitra, setKriteriaMitra] = useState('');
    const [mou, setMou] = useState(null);
    const [pks, setPks] = useState(null);
    const [error, setError] = useState('');


    const saveIku6Data = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('nama_mitra', namaMitra);
        formData.append('nama_kegiatan', namaKegiatan);
        formData.append('alamat_mitra', alamatMitra);
        formData.append('tgl_mulai_kegiatan', tglMulaiKegiatan);
        formData.append('tgl_selesai_kegiatan', tglSelesaiKegiatan);
        formData.append('kriteria_mitra', kriteriaMitra);
        if (mou) formData.append('mou', mou);
        if (pks) formData.append('pks', pks);


        try {
            await axios.post('http://localhost:8080/iku6', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            navigate('/iku6list');
        } catch (error) {
            console.error('Error saving data:', error);
            if (error.response && error.response.data) {
                setError(error.response.data.message || 'An error occurred while saving data.');
            } else {
                setError('An error occurred while saving data.');
            }
        }
    };


    const handleFileChange = (e, setFile) => {
        const file = e.target.files[0];
        setFile(file);
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
                                        value={namaMitra}
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
                                        value={namaKegiatan}
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
                                        value={alamatMitra}
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
                                        value={tglMulaiKegiatan}
                                        onChange={(e) => setTglMulaiKegiatan(e.target.value)}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <label htmlFor="tgl_selesai_kegiatan">Tanggal Selesai Kegiatan</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="tgl_selesai_kegiatan"
                                        value={tglSelesaiKegiatan}
                                        onChange={(e) => setTglSelesaiKegiatan(e.target.value)}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="kriteria_mitra">Kriteria Mitra</Label>
                                    <Input type="select" id="kriteria_mitra" value={kriteriaMitra} onChange={(e) => setKriteriaMitra(e.target.value)}>
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
                                        onChange={(e) => handleFileChange(e, setMou)}
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="pks">Dokumen PKS</Label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        id="pks"
                                        accept=".pdf"
                                        onChange={(e) => handleFileChange(e, setPks)}
                                    />
                                </FormGroup>
                                {error && <div className="alert alert-danger">{error}</div>}
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
