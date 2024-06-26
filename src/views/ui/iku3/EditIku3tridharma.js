import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Card, Col, CardTitle, Button } from 'reactstrap';
import { useParams, useNavigate } from 'react-router-dom';

const EditIku3tridharma = ({ iku3tridharma, fetchIku3tridharmaList }) => {
    const navigate = useNavigate();

    const [NIDN, setNIDN] = useState(iku3tridharma.NIDN);
    const [surat_sk, setSuratSk] = useState(null);
    const [jenis_tridharma, setJenisTridharma] = useState(iku3tridharma.jenis_tridharma);
    const [nama_aktivitas_tridharma, setNamaAktivitasTridharma] = useState(iku3tridharma.nama_aktivitas_tridharma);
    const [tempat_tridharma, setTempatTridharma] = useState(iku3tridharma.tempat_tridharma);
    const [tgl_mulai_tridharma, setTglMulaiTridharma] = useState(iku3tridharma.tgl_mulai_tridharma);
    const [tgl_selesai_tridharma, setTglSelesaiTridharma] = useState(iku3tridharma.tgl_selesai_tridharma);

    const updateIku3tridharma = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('NIDN', NIDN);
        formData.append('surat_sk', surat_sk);
        formData.append('jenis_tridharma', jenis_tridharma);
        formData.append('nama_aktivitas_tridharma', nama_aktivitas_tridharma);
        formData.append('tempat_tridharma', tempat_tridharma);
        formData.append('tgl_mulai_tridharma', tgl_mulai_tridharma);
        formData.append('tgl_selesai_tridharma', tgl_selesai_tridharma);

        try {
            await axios.post(`http://localhost:8080/update/iku3tridharma/${iku3tridharma.iku3tridharma_id}`, formData);
            fetchIku3tridharmaList(); // Refresh data setelah update
            navigate('/iku3', { replace: true });
        } catch (error) {
            console.error('Error updating data:', error);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSuratSk(file);
    };

    return (
        <div>
            <Container fluid style={{ maxWidth: '80%' }}>
                <Row>
                    <Col xs="12" md="12" sm="12">
                        <Card style={{ maxWidth: '80%', marginLeft: '-5%', padding: '20px', marginTop: '20px' }}>
                            <CardTitle><b>FORM EDIT IKU 3 DOSEN BERTRIDHARMA DI KAMPUS LAIN</b></CardTitle>
                            <form onSubmit={updateIku3tridharma}>
                                <div className="form-group" style={{ marginTop: '20px' }}>
                                    <label htmlFor="NIDN">Dosen Tridharma</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="NIDN"
                                        value={NIDN}
                                        onChange={(e) => setNIDN(e.target.value)}
                                        placeholder="NIDN"
                                    />
                                </div>
                                <div className="form-group" style={{ marginTop: '10px' }}>
                                    <label htmlFor="surat_sk">Surat SK</label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        id="surat_sk"
                                        onChange={handleFileChange}
                                    />
                                </div>
                                <div className="form-group" style={{ marginTop: '10px' }}>
                                    <label className="label">Jenis Tridharma</label>
                                    <select
                                        className="form-control"
                                        value={jenis_tridharma}
                                        onChange={(e) => setJenisTridharma(e.target.value)}
                                    >
                                        <option value="">Pilih Jenis</option>
                                        <option value="pendidikan">Pendidikan</option>
                                        <option value="penelitian">Penelitian</option>
                                        <option value="pengabdian kepada masyarakat">Pengabdian Kepada Masyarakat</option>
                                    </select>
                                </div>
                                <div className="form-group" style={{ marginTop: '10px' }}>
                                    <label htmlFor="nama_aktivitas_tridharma">Nama Aktivitas Tridharma</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="nama_aktivitas_tridharma"
                                        value={nama_aktivitas_tridharma}
                                        onChange={(e) => setNamaAktivitasTridharma(e.target.value)}
                                        placeholder="Nama Aktivitas Tridharma"
                                    />
                                </div>
                                <div className="form-group" style={{ marginTop: '10px' }}>
                                    <label htmlFor="tempat_tridharma">Tempat Tridharma</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="tempat_tridharma"
                                        value={tempat_tridharma}
                                        onChange={(e) => setTempatTridharma(e.target.value)}
                                        placeholder="Tempat Tridharma"
                                    />
                                </div>
                                <div className="form-group" style={{ marginTop: '10px' }}>
                                    <label htmlFor="tgl_mulai_tridharma">Tanggal Mulai Tridharma</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="tgl_mulai_tridharma"
                                        value={tgl_mulai_tridharma}
                                        onChange={(e) => setTglMulaiTridharma(e.target.value)}
                                    />
                                </div>
                                <div className="form-group" style={{ marginTop: '10px' }}>
                                    <label htmlFor="tgl_selesai_tridharma">Tanggal Selesai Tridharma</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="tgl_selesai_tridharma"
                                        value={tgl_selesai_tridharma}
                                        onChange={(e) => setTglSelesaiTridharma(e.target.value)}
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary" style={{ marginTop: '10px' }}>Update</button>
                            </form>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default EditIku3tridharma;
