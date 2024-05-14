import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Card, Col, CardTitle, Button } from 'reactstrap';
import { useParams, useNavigate } from 'react-router-dom';

const EditIku3tridharma = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [NIDN, setNIDN] = useState('');
    const [surat_sk, setSuratSk] = useState(null);
    const [ptn_tridharma, setPtnTridharma] = useState('');
    const [tgl_mulai_tridharma, setTglMulaiTridharma] = useState('');
    const [tgl_selesai_tridharma, setTglSelesaiTridharma] = useState('');

    useEffect(() => {
        fetchIku3tridharma();
    }, []);

    const fetchIku3tridharma = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/iku3tridharma/${id}`);
            const data = response.data;
            setNIDN(data.NIDN);
            setPtnTridharma(data.ptn_tridharma);
            setTglMulaiTridharma(data.tgl_mulai_tridharma);
            setTglSelesaiTridharma(data.tgl_selesai_tridharma);
        } catch (error) {
            console.error('Error fetching IKU 3 Tridharma:', error);
        }
    };

    const updateIku3tridharma = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('NIDN', NIDN);
        formData.append('surat_sk', surat_sk);
        formData.append('ptn_tridharma', ptn_tridharma);
        formData.append('tgl_mulai_tridharma', tgl_mulai_tridharma);
        formData.append('tgl_selesai_tridharma', tgl_selesai_tridharma);

        try {
            await axios.post(`http://localhost:8080/update/iku3tridharma/${id}`, formData);
            navigate('/iku3tridharmalist', { replace: true });
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
                                    <label htmlFor="ptn_tridharma">PTN Tridharma</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="ptn_tridharma"
                                        value={ptn_tridharma}
                                        onChange={(e) => setPtnTridharma(e.target.value)}
                                        placeholder="PTN Tridharma"
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
