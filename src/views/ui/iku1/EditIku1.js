import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Row, Card, Col } from "reactstrap";

const EditIku1 = () => {
    const [NIM, setNIM] = useState('');
    const [status, setStatus] = useState('');
    const [gaji, setGaji] = useState('');
    const [masa_tunggu, setMasaTunggu] = useState('');
    const navigate = useNavigate();
    const { iku1_id } = useParams();

    useEffect(() => {
        const fetchIku1 = async () => {
            if (!iku1_id) return; // Pemeriksaan untuk iku1_id
            const response = await axios.get(`http://localhost:8080/iku1/${iku1_id}`);
            console.log(response.data)
            const iku1 = response.data;
            setNIM(iku1.NIM);
            setStatus(iku1.status);
            setGaji(iku1.gaji);
            setMasaTunggu(iku1.masa_tunggu);
        }
        fetchIku1();
    }, [iku1_id]);

    const fetchNamaMahasiswa = async (NIM) => {
        if (!NIM) return null; // Tambahkan baris ini
        try {
            const response = await axios.get(`http://localhost:8080/mahasiswa/${NIM}`);
            return response.data.nama_mahasiswa;
        } catch (error) {
            console.error("Error while fetching nama mahasiswa:", error);
            return null;
        }
    };
    
    useEffect(() => {
        fetchNamaMahasiswa(NIM);
    }, [NIM]);
    

    const saveIku1 = async (e) => {
        e.preventDefault();
        if (!iku1_id) return; // Pemeriksaan untuk iku1_id
        await axios.put(`http://localhost:8080/update/iku1/${iku1_id}`, {
            NIM: NIM,
            status: status,
            gaji: gaji,
            masa_tunggu: masa_tunggu
        });
        navigate('/iku1list');
    }

    return (
        <div>
            <Container fluid style={{ maxWidth: '80%' }}>
                <Row>
                <Col xs="12" md="12" sm="12">
                    <Card style={{ maxWidth: '80%', marginLeft: '-5%', padding: '20px' }}>
            <h2>Edit Data</h2>
            <form onSubmit={saveIku1}>
                <div className="field">
                    <label className="label">NIM</label>
                    <input
                        type="text"
                        className="form-control"
                        value={NIM}
                        onChange={(e) => setNIM(e.target.value)}
                        placeholder="NIM" />
                </div>
                <div className="field">
                    <label className="label">Status</label>
                    <select
                        className="form-control"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="">Pilih Status</option>
                        <option value="mendapat pekerjaan">Mendapat Pekerjaan</option>
                        <option value="melanjutkan studi">Melanjutkan Studi</option>
                        <option value="wiraswasta">Wiraswasta</option>
                        <option value="mencari pekerjaan">Mencari Pekerjaan</option>
                    </select>
                </div>
                <div className="field">
                    <label className="label">Gaji</label>
                    <select
                        className="form-control"
                        value={gaji}
                        onChange={(e) => setGaji(e.target.value)}
                    >
                        <option value="">Pilih Gaji</option>
                        <option value="lebih dari 1.2xUMP">Lebih dari 1.2xUMP</option>
                        <option value="kurang dari 1.2xUMP">Kurang dari 1.2xUMP</option>
                        <option value="belum berpendapatan">Belum berpendapatan</option>
                    </select>
                </div>
                <div className="field">
                    <label className="label">Masa Tunggu</label>
                    <select
                        className="form-control"
                        value={masa_tunggu}
                        onChange={(e) => setMasaTunggu(e.target.value)}
                    >
                        <option value="">Pilih Masa Tunggu</option>
                        <option value="kurang dari 6 bulan">Kurang dari 6 bulan</option>
                        <option value="antara 6 sampai 12bulan">Antara 6 sampai 12 bulan</option>
                    </select>
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

export default EditIku1;