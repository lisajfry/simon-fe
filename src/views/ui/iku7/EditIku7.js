import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Card, CardBody, CardTitle, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { useParams, useNavigate } from 'react-router-dom';


const EditIku7 = () => {
    const { iku7_id } = useParams();
    const navigate = useNavigate();
    const [kode_mk, setKodeMK] = useState('');
    const [nama_mk, setNamaMK] = useState('');
    const [tahun, setTahun] = useState('');
    const [semester, setSemester] = useState('');
    const [kelas, setKelas] = useState('');
    const [jum_bobot, setJumBobot] = useState('');
    const [rps, setRPS] = useState(null);
    const [fileUploaded, setFileUploaded] = useState(false);


    useEffect(() => {
        fetchIku7();
    },);


    const fetchIku7 = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/iku7/${iku7_id}`);
            const iku7Data = response.data;
            setKodeMK(iku7Data.kode_mk);
            setNamaMK(iku7Data.nama_mk);
            setTahun(iku7Data.tahun);
            setSemester(iku7Data.semester);
            setKelas(iku7Data.kelas);
            setJumBobot(iku7Data.jum_bobot);
            setRPS(iku7Data.rps);
            if (iku7Data.rps) {
                setFileUploaded(true);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    const updateIku7 = async (e) => {
        e.preventDefault();
        try {
            // Upload file if it's selected
            if (rps) {
                const formData = new FormData();
                formData.append('file', rps);
                await axios.post(`http://localhost:8080/upload/iku7/${iku7_id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                setFileUploaded(true);
            }


            // Update other data
            await axios.put(`http://localhost:8080/update/iku7/${iku7_id}`, {
                kode_mk,
                nama_mk,
                tahun,
                semester,
                kelas,
                jum_bobot,
                rps: rps ? rps.name : null
            });
            navigate('/iku7');
        } catch (error) {
            console.error('Error updating data:', error);
        }
    };


    return (
        <Container fluid style={{ maxWidth: '80%' }}>
            <Row>
                <Col xs="12" md="12" sm="12">
                    <Card style={{ maxWidth: '80%', marginLeft: '-5%', padding: '20px', marginTop: '20px' }}>
                        <CardTitle><b>Edit Data</b></CardTitle>
                        <CardBody>
                            <Form onSubmit={updateIku7}>
                                <FormGroup>
                                    <Label for="Kode_MK">Kode MK</Label>
                                    <Input
                                        type="text"
                                        id="Kode_MK"
                                        value={kode_mk}
                                        onChange={(e) => setKodeMK(e.target.value)}
                                        placeholder="Kode MK"
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="Nama_MK">Nama MK</Label>
                                    <Input
                                        type="text"
                                        id="Nama_MK"
                                        value={nama_mk}
                                        onChange={(e) => setNamaMK(e.target.value)}
                                        placeholder="Nama MK"
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="Tahun">Tahun</Label>
                                    <select
                                        className="form-control"
                                        id="Tahun"
                                        value={tahun}
                                        onChange={(e) => setTahun(e.target.value)}
                                    >
                                        <option value="">Pilih Tahun</option>
                                        <option value="2022">2022</option>
                                        <option value="2023">2023</option>
                                    </select>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="Semester">Semester</Label>
                                    <select
                                        className="form-control"
                                        id="Semester"
                                        value={semester}
                                        onChange={(e) => setSemester(e.target.value)}
                                    >
                                        <option value="">Pilih Semester</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>
                                    </select>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="Kelas">Kelas</Label>
                                    <Input
                                        type="text"
                                        id="Kelas"
                                        value={kelas}
                                        onChange={(e) => setKelas(e.target.value)}
                                        placeholder="Kelas"
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="Jum_Bobot">Presentase Bobot</Label>
                                    <Input
                                        type="number"
                                        className="form-control"
                                        id="Jum_Bobot"
                                        value={jum_bobot}
                                        onChange={(e) => setJumBobot(e.target.value)}
                                        placeholder="Presentase Bobot"
                                    />
                                </FormGroup>
                                <FormGroup>
                                    {fileUploaded ? (
                                        <Button
                                            type="button"
                                            onClick={() => window.open(`http://localhost:8080/uploads/${rps}`, '_blank')}
                                        >
                                            Lihat File
                                        </Button>
                                    ) : (
                                        <Input
                                            type="file"
                                            id="RPS"
                                            onChange={(e) => setRPS(e.target.files[0])}
                                        />
                                    )}
                                </FormGroup>
                                <Button type="submit" color="primary">Simpan</Button>
                            </Form>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};


export default EditIku7;


