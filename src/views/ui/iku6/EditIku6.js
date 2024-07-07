import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Card, Col, CardTitle, Label, Input, FormGroup} from 'reactstrap';
import { useParams, useNavigate } from 'react-router-dom';




const EditIku6 = () => {
    const { iku6_id } = useParams();
    const navigate = useNavigate();
    const [nama_mitra, setNamaMitra] = useState('');
    const [nama_kegiatan, setNamaKegiatan] = useState('');
    const [alamat_mitra, setAlamatMitra] = useState('');
    const [tahun, setTahun] = useState('');
    const [tgl_mulai_kegiatan, setTglMulaiKegiatan] = useState('');
    const [tgl_selesai_kegiatan, setTglSelesaiKegiatan] = useState('');
    const [kriteria_mitra, setKriteriaMitra] = useState('');
    const [mou, setMou] = useState(null);


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
            setTahun(iku6Data.tahun);
            setTglMulaiKegiatan(iku6Data.tgl_mulai_kegiatan);
            setTglSelesaiKegiatan(iku6Data.tgl_selesai_kegiatan);
            setKriteriaMitra(iku6Data.kriteria_mitra);
            setMou(iku6Data.mou);
        } catch (error) {
            console.error('Error fetching IKU 6:', error);
        }
    };








    const updateIku6 = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('nama_mitra', nama_mitra);
        formData.append('nama_kegiatan', nama_kegiatan);
        formData.append('alamat_mitra', alamat_mitra);
        formData.append('tahun', tahun);
        formData.append('tgl_mulai_kegiatan', tgl_mulai_kegiatan);
        formData.append('tgl_selesai_kegiatan', tgl_selesai_kegiatan);
        formData.append('kriteria_mitra', kriteria_mitra);
        if (mou) {
            formData.append('mou', mou);
        }
   
        try {
            await axios.put(`http://localhost:8080/update/iku6/${iku6_id}`, formData); // Sesuaikan dengan endpoint yang benar
            navigate('/iku6', { replace: true });
        } catch (error) {
            console.error('Error updating data:', error);
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
                            <CardTitle><b>Edit Data</b></CardTitle>
                            <form onSubmit={updateIku6}>
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
                                <div className="form-group">
                                    <label htmlFor="tahun">Tahun</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="tahun"
                                        value={tahun}
                                        onChange={(e) => setTahun(e.target.value)}
                                        placeholder="Tahun"
                                    />
                                    </div>
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
