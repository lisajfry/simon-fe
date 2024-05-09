import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Row, Card, Col } from "reactstrap";


const EditIku2kegiatan = () => {
    const [NIM, setNIM] = useState('');
    const [nama_mahasiswa, setNamaMahasiswa] = useState('');
    const [aktivitas, setAktivitas] = useState('');
    const [tempat_kegiatan, setTempatKegiatan] = useState('');
    const [sks, setSks] = useState('');
    const [tgl_mulai_kegiatan, setTglMulaiKegiatan] = useState('');
    const [tgl_selesai_kegiatan, setTglSelesaiKegiatan] = useState('');
    const navigate = useNavigate();
    const { iku2kegiatan_id } = useParams();

    useEffect(() => {
        const fetchIku2kegiatan = async () => {
            if (!iku2kegiatan_id) return; // Pemeriksaan untuk iku2kegiatan_id
            const response = await axios.get(`http://localhost:8080/iku2kegiatan/${iku2kegiatan_id}`);
            const iku2kegiatan = response.data;
            setNIM(iku2kegiatan.NIM);
            setTempatKegiatan(iku2kegiatan.tempat_kegiatan);
            setAktivitas(iku2kegiatan.aktivitas);
            setSks(iku2kegiatan.sks);
            setTglMulaiKegiatan(iku2kegiatan.tgl_mulai_kegiatan);
            setTglSelesaiKegiatan(iku2kegiatan.tgl_selesai_kegiatan);
        }
        fetchIku2kegiatan();
    }, [iku2kegiatan_id]);

    const saveIku2kegiatan = async (e) => {
        e.preventDefault();
        if (!iku2kegiatan_id) return; // Pemeriksaan untuk iku2kegiatan_id
        await axios.put(`http://localhost:8080/update/iku2kegiatan/${iku2kegiatan_id}`, {
            NIM: NIM,
            tempat_kegiatan: tempat_kegiatan,
            aktivitas: aktivitas,
            sks: sks,
            tgl_mulai_kegiatan: tgl_mulai_kegiatan,
            tgl_selesai_kegiatan: tgl_selesai_kegiatan,
        });
        navigate('/iku2kegiatanlist');
    }

    return (
        <div>
            <Container fluid style={{ maxWidth: '80%' }}>
                <Row>
                <Col xs="12" md="12" sm="12">
                    <Card style={{ maxWidth: '80%', marginLeft: '-5%', padding: '20px' }}>
            <h2>Edit Data</h2>
            <form onSubmit={saveIku2kegiatan}>
                <div className="form-group" >
                    <label className="label">NIM</label>
                    <input
                        type="text"
                        className="form-control"
                        value={NIM}
                        onChange={(e) => setNIM(e.target.value)}
                        placeholder="NIM" />
                </div>
                
                <div className="form-group">
                    <label className="label">Aktivitas</label>
                    <select
                        className="form-control"
                        value={aktivitas}
                        onChange={(e) => setAktivitas(e.target.value)}
                    >
                        <option value=""></option>
                            <option value="magang/praktek kerja">Magang/praktek kerja</option>
                            <option value="pertukaran pelajar">Pertukaran pelajar</option>
                            <option value="proyek kemanusiaan">proyek kemanusiaan</option>
                            <option value="mengajar di sekolah">Mengajar di sekolah</option>
                            <option value="studi/proyek independen">Studi/proyek independen</option>
                            <option value="proyek di desa/kkn">Proyek di desa/kkn</option>
                            <option value="kegiatan wirausaha">Kegiatan wirausaha</option>
                            <option value="penelitian atau riset">Penelitian atau riset</option>
                    </select>
                </div>
                <div className="form-group">
                    <label className="label">Tempat Kegiatan</label>
                    <input
                        className="form-control"
                        value={tempat_kegiatan}
                        onChange={(e) => setTempatKegiatan(e.target.value)}
                        placeholder="Tempat Kegiatan" />
                </div>
                <div className="form-group">
                    <label className="label">sks</label>
                    <input
                        className="form-control"
                        value={sks}
                        onChange={(e) => setSks(e.target.value)}
                        placeholder="sks" />
                </div>
                <div className="form-group">
                    <label className="label">Tanggal Mulai Kegiatan</label>
                    <input
                        type="date"
                        className="form-control"
                        value={tgl_mulai_kegiatan}
                        onChange={(e) => setTglMulaiKegiatan(e.target.value)}
                        placeholder="Tanggal Mulai Kegiatan" />
                </div>
                <div className="form-group">
                    <label className="label">Tanggal Selesai Kegiatan</label>
                    <input
                        type="date"
                        className="form-control"
                        value={tgl_selesai_kegiatan}
                        onChange={(e) => setTglSelesaiKegiatan(e.target.value)}
                        placeholder="Tanggal Selesai Kegiatan" />
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
    )
}

export default EditIku2kegiatan;
