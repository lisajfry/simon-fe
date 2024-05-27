import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Row, Card, Col } from "reactstrap";

const EditIku5 = () => {
    const [NIDN, setNIDN] = useState('');
    const [status, setStatus] = useState('');
    const navigate = useNavigate();
    const { iku5_id } = useParams();

    useEffect(() => {
        const fetchIku5 = async () => {
            if (!iku5_id) return;
            try {
                const response = await axios.get('http://localhost:8080/iku5/${iku5_id}');
                const iku5 = response.data;
                setNIDN(iku5.NIDN);
                setStatus(iku5.status);
            } catch (error) {
                console.error("Error fetching IKU5 data:", error);
            }
        }
        fetchIku5();
    }, [iku5_id]);

    const fetchNamaDosen = async (NIDN) => {
        if (!NIDN) return null;
        try {
            const response = await axios.get('http://localhost:8080/dosen/${NIDN}');
            return response.data.nama_dosen;
        } catch (error) {
            console.error("Error while fetching nama dosen:", error);
            return null;
        }
    };
    
    useEffect(() => {
        fetchNamaDosen(NIDN);
    }, [NIDN]);
    

    const saveIku5 = async (e) => {
        e.preventDefault();
        if (!iku5_id) return;
        try {
            await axios.put('http://localhost:8080/update/iku5/${iku5_id}', {
                NIDN: NIDN,
                status: status,
            });
            navigate('/iku5list');
        } catch (error) {
            console.error("Error updating IKU5 data:", error);
        }
    }

    return (
        <div>
            <Container fluid style={{ maxWidth: '80%' }}>
                <Row>
                    <Col xs="12" md="12" sm="12">
                        <Card style={{ maxWidth: '80%', marginLeft: '-5%', padding: '20px' }}>
                            <h2>Edit Data</h2>
                            <form onSubmit={saveIku5}>
                                <div className="field">
                                    <label className="label">NIDN</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={NIDN}
                                        onChange={(e) => setNIDN(e.target.value)}
                                        placeholder="NIDN" />
                                </div>
                                <div className="field">
                                    <label className="label">Status</label>
                                    <select
                                        className="form-control"
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}
                                    >
                                        <option value="">Pilih Status</option>
                                        <option value="Dosen Berkualifikasi S3">Dosen Berkualifikasi S3</option>
                                        <option value="Sertifikasi Kompetensi Dosen">Sertifikasi Kompetensi Dosen</option>
                                        <option value="Praktisi Menjadi Dosen">Praktisi Menjadi Dosen</option>
                                        <option value="Praktisi Mengajar (Flagship)">Praktisi Mengajar (Flagship)</option>
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

export default EditIku5;