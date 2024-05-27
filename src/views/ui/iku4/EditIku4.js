import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Row, Card, Col } from "reactstrap";

const EditIku4 = () => {
    const [NIDN, setNIDN] = useState('');
    const [status, setStatus] = useState('');
    const navigate = useNavigate();
    const { iku4_id } = useParams();

    useEffect(() => {
        const fetchIku4 = async () => {
            if (!iku4_id) return;
            try {
                const response = await axios.get('http://localhost:8080/iku4/${iku4_id}');
                const iku4 = response.data;
                setNIDN(iku4.NIDN);
                setStatus(iku4.status);
            } catch (error) {
                console.error("Error fetching IKU4 data:", error);
            }
        }
        fetchIku4();
    }, [iku4_id]);

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
    

    const saveIku4 = async (e) => {
        e.preventDefault();
        if (!iku4_id) return;
        try {
            await axios.put('http://localhost:8080/update/iku4/${iku4_id}', {
                NIDN: NIDN,
                status: status,
            });
            navigate('/iku4list');
        } catch (error) {
            console.error("Error updating IKU4 data:", error);
        }
    }

    return (
        <div>
            <Container fluid style={{ maxWidth: '80%' }}>
                <Row>
                    <Col xs="12" md="12" sm="12">
                        <Card style={{ maxWidth: '80%', marginLeft: '-5%', padding: '20px' }}>
                            <h2>Edit Data</h2>
                            <form onSubmit={saveIku4}>
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

export default EditIku4;