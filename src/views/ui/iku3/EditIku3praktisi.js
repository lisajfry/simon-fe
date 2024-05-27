import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Card, Col, CardTitle, Button } from 'reactstrap';
import { useParams, useNavigate } from 'react-router-dom';

const EditIku3praktisi = () => {
    const { iku3praktisi_id } = useParams();
    const navigate = useNavigate();

    const [NIDN, setNIDN] = useState('');
    const [surat_sk, setSuratSk] = useState(null);
    const [instansi_praktisi, setInstansiPraktisi] = useState('');
    const [tgl_mulai_praktisi, setTglMulaiPraktisi] = useState('');
    const [tgl_selesai_praktisi, setTglSelesaiPraktisi] = useState('');

    useEffect(() => {
        fetchIku3praktisi();
    }, []);

    const fetchIku3praktisi = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/iku3praktisi/${iku3praktisi_id}`);
            const data = response.data;
            setNIDN(data.NIDN);
            setInstansiPraktisi(data.instansi_praktisi);
            setTglMulaiPraktisi(data.tgl_mulai_praktisi);
            setTglSelesaiPraktisi(data.tgl_selesai_praktisi);
        } catch (error) {
            console.error('Error fetching IKU 3 Praktisi:', error);
        }
    };

    const updateIku3praktisi = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('NIDN', NIDN);
        formData.append('surat_sk', surat_sk);
        formData.append('instansi_praktisi', instansi_praktisi);
        formData.append('tgl_mulai_praktisi', tgl_mulai_praktisi);
        formData.append('tgl_selesai_praktisi', tgl_selesai_praktisi);

        try {
            await axios.post(`http://localhost:8080/update/iku3praktisi/${iku3praktisi_id}`, formData);
            navigate('/iku3praktisilist', { replace: true });
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
                            <CardTitle><b>FORM EDIT IKU 3 DOSEN BEKERJA SEBAGAI PRAKTISI DI INSTANSI PRAKTISI</b></CardTitle>
                            <form onSubmit={updateIku3praktisi}>
                                <div className="form-group" style={{ marginTop: '20px' }}>
                                    <label htmlFor="NIDN">Dosen Praktisi</label>
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
                                    <label htmlFor="instansi_praktisi">Instansi Praktisi</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="instansi_praktisi"
                                        value={instansi_praktisi}
                                        onChange={(e) => setInstansiPraktisi(e.target.value)}
                                        placeholder="Instansi Praktisi"
                                    />
                                </div>
                                <div className="form-group" style={{ marginTop: '10px' }}>
                                    <label htmlFor="tgl_mulai_praktisi">Tanggal Mulai Praktisi</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="tgl_mulai_praktisi"
                                        value={tgl_mulai_praktisi}
                                        onChange={(e) => setTglMulaiPraktisi(e.target.value)}
                                    />
                                </div>
                                <div className="form-group" style={{ marginTop: '10px' }}>
                                    <label htmlFor="tgl_selesai_praktisi">Tanggal Selesai Praktisi</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="tgl_selesai_praktisi"
                                        value={tgl_selesai_praktisi}
                                        onChange={(e) => setTglSelesaiPraktisi(e.target.value)}
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

export default EditIku3praktisi;
