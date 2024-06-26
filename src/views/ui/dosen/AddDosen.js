import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { Container, Row, Card, Col, CardTitle } from "reactstrap";

const AddDosen = () => {
  const [NIDN, setNIDN] = useState('');
  const [nama_dosen, setNamaDosen] = useState('');
  const navigate = useNavigate();


  const saveDosenData = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('NIDN', NIDN);
    formData.append('nama_dosen', nama_dosen);

    try {
      await axios.post('http://localhost:8080/add/dosen', formData);
      navigate('/dosenlist', { replace: true });
    } catch (error) {
      console.error("Error while saving data:", error);
    }
  };

  return (
    <div>
      <Container fluid style={{ maxWidth: '80%' }}>
      
        <Row>
          <Col xs="12" md="12" sm="12">
          
            <Card style={{ maxWidth: '80%', marginLeft: '-5%', padding: '20px', marginTop: '20px' }}>
            <CardTitle><b>FORM INPUT DOSEN DENGAN NIDN</b></CardTitle>
              <form onSubmit={saveDosenData}>
                <div className="form-group" style={{marginTop: '20px'}}>
                  <label htmlFor="NIDN">NIDN</label>
                  <input
                    type="text"
                    className="form-control"
                    id="NIDN"
                    value={NIDN}
                    onChange={(e) => setNIDN(e.target.value)}
                    placeholder="NIDN"
                  />
                </div>
                <div className="form-group" style={{marginTop: '10px'}}>
                  <label htmlFor="nama_dosen">Nama Dosen</label>
                  <input
                    type="text"
                    className="form-control"
                    id="nama_dosen"
                    value={nama_dosen}
                    onChange={(e) => setNamaDosen(e.target.value)}
                    placeholder="Nama Dosen"
                  />
                </div>
                <div>
                  <p></p>
                <div className="form-group">
                <p><button type="submit" className="btn btn-primary">Tambahkan</button></p>
                </div>
                </div>
              </form>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AddDosen;