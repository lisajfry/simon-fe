import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Card, Col, CardTitle, Button, Form, FormGroup, Label, Input,CardBody } from 'reactstrap';
import { useParams, useNavigate } from 'react-router-dom';


const EditIku7 = () => {
    const { iku7_id } = useParams();
    const navigate = useNavigate();
    const [kode_mk, setKodeMK] = useState('');
    const [nama_mk, setNamaMK] = useState('');
    const [tahun, setTahun] = useState('');
    const [semester, setSemester] = useState('');
    const [kelas, setKelas] = useState('');
    const [case_method, setCaseMethod] = useState(0);
    const [tb_project, setTbProject] = useState(0);
    const [rps, setRPS] = useState(null);


    useEffect(() => {
        fetchIku7();
    }, );


    const fetchIku7 = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/iku7/${iku7_id}`);
            const iku7Data = response.data;
            setKodeMK(iku7Data.kode_mk);
            setNamaMK(iku7Data.nama_mk);
            setTahun(iku7Data.tahun);
            setSemester(iku7Data.semester);
            setKelas(iku7Data.kelas);
            setCaseMethod(iku7Data.case_method || 0);
            setTbProject(iku7Data.tb_project || 0);
            setRPS(iku7Data.rps);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };


    const updateIku7 = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('kode_mk', kode_mk);
        formData.append('nama_mk', nama_mk);
        formData.append('tahun', tahun);
        formData.append('semester', semester);
        formData.append('kelas', kelas);
        formData.append('case_method', case_method);
        formData.append('tb_project', tb_project);
        formData.append('presentase_bobot', parseInt(case_method) + parseInt(tb_project));
        if (rps) {
            formData.append('rps', rps);
        }


        try {
            await axios.put(`http://localhost:8080/update/iku7/${iku7_id}`, formData);
            navigate('/iku7', { replace: true });
        } catch (error) {
            console.error('Error updating data:', error);
        }
    };


    const handleFileChangeRPS = (e) => {
        const file = e.target.files[0];
        setRPS(file);
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
                                    <Input
                                        type="select"
                                        id="Tahun"
                                        value={tahun}
                                        onChange={(e) => setTahun(e.target.value)}
                                    >
                                        <option value="">Pilih Tahun</option>
                                        <option value="2022">2022</option>
                                        <option value="2023">2023</option>
                                    </Input>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="Semester">Semester</Label>
                                    <Input
                                        type="select"
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
                                    </Input>
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
                                    <Label for="Case_Method">Case Method</Label>
                                    <Input
                                        type="number"
                                        className="form-control"
                                        id="Case_Method"
                                        value={case_method}
                                        onChange={(e) => setCaseMethod(e.target.value)}
                                        placeholder="Case Method"
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="Team_Base_Project">Team Base Project</Label>
                                    <Input
                                        type="number"
                                        className="form-control"
                                        id="Team_Base_Project"
                                        value={tb_project}
                                        onChange={(e) => setTbProject(e.target.value)}
                                        placeholder="Team Base Project"
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="RPS">RPS</Label>
                                    <Input
                                        type="file"
                                        id="RPS"
                                        onChange={handleFileChangeRPS}
                                    />
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
