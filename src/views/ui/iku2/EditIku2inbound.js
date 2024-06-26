import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Card, Col, CardTitle, Button } from 'reactstrap';
import { useParams, useNavigate } from 'react-router-dom';

const EditIku2inbound = () => {
    const { iku2inbound_id } = useParams();
    const navigate = useNavigate();

    const [NIM, setNIM] = useState('');
    const [ptn_asal, setPtnAsal] = useState('');
    const [ptn_pertukaran, setPtnPertukaran] = useState('');
    const [surat_rekomendasi, setSuratRekomendasi] = useState(null);
    const [sks, setSks] = useState('');
    const [NIDN, setNIDN] = useState('');
    const [tgl_mulai_inbound, setTglMulaiInbound] = useState('');
    const [tgl_selesai_inbound, setTglSelesaiInbound] = useState('');

    useEffect(() => {
        fetchIku2inbound();
    }, []);

    const fetchIku2inbound = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/iku2inbound/${iku2inbound_id}`);
            const data = response.data;
            setNIM(data.NIM);
            setPtnAsal(data.ptn_asal);
            setPtnPertukaran(data.ptn_pertukaran);
            setSks(data.sks);
            setNIDN(data.NIDN);
            setTglMulaiInbound(data.tgl_mulai_inbound);
            setTglSelesaiInbound(data.tgl_selesai_inbound);
        } catch (error) {
            console.error('Error fetching IKU 2 Inbound:', error);
        }
    };

    const updateIku2inbound = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('NIM', NIM);
        formData.append('ptn_asal', ptn_asal);
        formData.append('ptn_pertukaran', ptn_pertukaran);
        formData.append('surat_rekomendasi', surat_rekomendasi);
        formData.append('sks', sks);
        formData.append('NIDN', NIDN);
        formData.append('tgl_mulai_inbound', tgl_mulai_inbound);
        formData.append('tgl_selesai_inbound', tgl_selesai_inbound);

        try {
            await axios.post(`http://localhost:8080/update/iku2inbound/${iku2inbound_id}`, formData);
            navigate('/iku2inboundlist', { replace: true });
        } catch (error) {
            console.error('Error updating data:', error);
        }
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setSuratRekomendasi(file);
    };

    return (
        <div>
            <Container fluid style={{ maxWidth: '80%' }}>
                <Row>
                    <Col xs="12" md="12" sm="12">
                        <Card style={{ maxWidth: '80%', marginLeft: '-5%', padding: '20px', marginTop: '20px' }}>
                            <CardTitle><b>FORM EDIT IKU 2 MAHASISWA INBOUND YANG PERTUKARAN PERLAJAR di D3 TI</b></CardTitle>
                            <form onSubmit={updateIku2inbound}>
                                <div className="form-group" style={{ marginTop: '20px' }}>
                                    <label htmlFor="NIM">Mahasiswa Inbound</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="NIM"
                                        value={NIM}
                                        onChange={(e) => setNIM(e.target.value)}
                                        placeholder="NIM"
                                    />
                                </div>
                                <div className="form-group" style={{ marginTop: '10px' }}>
                                    <label htmlFor="ptn_asal">PTN Asal</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="ptn_asal"
                                        value={ptn_asal}
                                        onChange={(e) => setPtnAsal(e.target.value)}
                                        placeholder="PTN Asal"
                                    />
                                </div>
                                <div className="form-group" style={{ marginTop: '10px' }}>
                                    <label htmlFor="ptn_pertukaran">PTN Tempat Pertukaran</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="ptn_pertukaran"
                                        value={ptn_pertukaran}
                                        onChange={(e) => setPtnPertukaran(e.target.value)}
                                        placeholder="PTN Pertukaran"
                                    />
                                </div>
                                <div className="form-group" style={{ marginTop: '10px' }}>
                                    <label htmlFor="surat_rekomendasi">Surat Rekomendasi</label>
                                    <input
                                        type="file"
                                        className="form-control"
                                        id="surat_rekomendasi"
                                        onChange={handleFileChange}
                                    />
                                </div>
                                <div className="form-group" style={{ marginTop: '10px' }}>
                                    <label htmlFor="sks">Sks</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="sks"
                                        value={sks}
                                        onChange={(e) => setSks(e.target.value)}
                                        placeholder="Sks"
                                    />
                                </div>
                                <div className="form-group" style={{ marginTop: '20px' }}>
                                    <label htmlFor="NIDN">Dosen Pembimbing</label>
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
                                    <label htmlFor="tgl_mulai_inbound">Tanggal Mulai Inbound</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="tgl_mulai_inbound"
                                        value={tgl_mulai_inbound}
                                        onChange={(e) => setTglMulaiInbound(e.target.value)}
                                    />
                                </div>
                                <div className="form-group" style={{ marginTop: '10px' }}>
                                    <label htmlFor="tgl_selesai_inbound">Tanggal Selesai Inbound</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="tgl_selesai_inbound"
                                        value={tgl_selesai_inbound}
                                        onChange={(e) => setTglSelesaiInbound(e.target.value)}
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

export default EditIku2inbound;
