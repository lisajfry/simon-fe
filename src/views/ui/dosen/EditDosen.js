import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
import { Container, Row, Card, Col } from "reactstrap";


const EditDosen = () => {
    const [nama_dosen, setNamaDosen] = useState('');
    const navigate = useNavigate();
    const { NIDN } = useParams();

    useEffect(() => {
        const fetchDosen = async () => {
            if (!NIDN) return; // Pemeriksaan untuk NIM
            const response = await axios.get(`http://localhost:8080/dosen/${NIDN}`);
            const dosen = response.data;
            setNamaDosen(dosen.nama_dosen);
        }
        fetchDosen();
    }, [NIDN]);

    const saveDosen = async (e) => {
        e.preventDefault();
        if (!NIDN) return; // Pemeriksaan untuk NIM
        await axios.put(`http://localhost:8080/update/dosen/${NIDN}`, {
            NIDN: NIDN,
            nama_dosen: nama_dosen,
        });
        navigate('/dosenlist');
    }

    return (
    <div>
      <Container fluid style={{ maxWidth: '80%' }}>
        <Row>
          <Col xs="12" md="12" sm="12">
            <Card style={{ maxWidth: '80%', marginLeft: '-5%', padding: '20px' }}>
            <h2>Edit Data</h2>
            <form onSubmit={saveDosen}>
                <div className="form-group">
                    <label className="label">NIDN</label>
                    <input
                        type="text"
                        className="form-control"
                        value={NIDN}
                        placeholder="NIDN" />
                </div>
                <div className="form-group">
                    <label className="label">Nama Dosen</label>
                    <input
                        type="text"
                        className="form-control"
                        value={nama_dosen}
                        onChange={(e) => setNamaDosen(e.target.value)}
                        placeholder="Nama Dosen" />
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

export default EditDosen;
