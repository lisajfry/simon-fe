import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Card, Col, CardTitle, Label, Input, FormGroup, Button } from 'reactstrap';
import { useParams, useNavigate } from 'react-router-dom';


const EditIku6 = () => {
    const { iku6_id } = useParams();
    const navigate = useNavigate();
    const [namaMitra, setNamaMitra] = useState('');
    const [namaKegiatan, setNamaKegiatan] = useState('');
    const [alamatMitra, setAlamatMitra] = useState('');
    const [tglMulaiKegiatan, setTglMulaiKegiatan] = useState('');
    const [tglSelesaiKegiatan, setTglSelesaiKegiatan] = useState('');
    const [kriteriaMitra, setKriteriaMitra] = useState('');
    const [mou, setMou] = useState('');
    const [pks, setPks] = useState('');


    useEffect(() => {
        fetchIku6();
    },);


    const fetchIku6 = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/iku6/${iku6_id}`);
            const iku6Data = response.data;
            setNamaMitra(iku6Data.nama_mitra);
            setNamaKegiatan(iku6Data.nama_kegiatan);
            setAlamatMitra(iku6Data.alamat_mitra);
            setTglMulaiKegiatan(iku6Data.tgl_mulai_kegiatan);
            setTglSelesaiKegiatan(iku6Data.tgl_selesai_kegiatan);
            setKriteriaMitra(iku6Data.kriteria_mitra);
            setMou(iku6Data.mou);
            setPks(iku6Data.pks);
        } catch (error) {
            console.error('Error fetching IKU 6:', error);
        }
    };


    const updateIku6 = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('nama_mitra', namaMitra);
        formData.append('nama_kegiatan', namaKegiatan);
        formData.append('alamat_mitra', alamatMitra);
        formData.append('tgl_mulai_kegiatan', tglMulaiKegiatan);
        formData.append('tgl_selesai_kegiatan', tglSelesaiKegiatan);
        formData.append('kriteria_mitra', kriteriaMitra);
        if (mou instanceof File) {
            formData.append('mou', mou);
        }
        if (pks instanceof File) {
            formData.append('pks', pks);
        }


        try {
            await axios.put(`http://localhost:8080/update/iku6/${iku6_id}`, formData);
            navigate('/iku6list');
        } catch (error) {
            console.error('Error updating data:', error);
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
                            <CardTitle><b>Edit Data</b></CardTitle>
                            <form onSubmit={updateIku6}>
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
                                <button type="submit" className="btn btn-primary" style={{ marginTop: '10px' }}>Update</button>
                            </form>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};


export default EditIku6;
