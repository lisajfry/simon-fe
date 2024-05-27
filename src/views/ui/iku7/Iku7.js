import axios from 'axios';
import { NavLink, Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import {
  Card,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Table,
  Button,
  Row,
  Col,
} from 'reactstrap';


const Iku7 = () => {
    useEffect(() => {
        fetchTotalData();
    }, []);


    const fetchTotalData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/iku7');
            console.log('Total data:', response.data.length);
        } catch (error) {
            console.error('Error fetching total data:', error);
        }
    };


    const [iku7, setIku7] = useState([]);


    useEffect(() => {
        getIku7();
    }, []);


    const getIku7 = async () => {
        try {
            const response = await axios.get('http://localhost:8080/iku7');
            setIku7(response.data);
        } catch (error) {
            console.error('Error fetching IKU7 data:', error);
        }
    };


    const deleteIku7 = async (iku7_id) => {
        const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus pengguna?");
        if (confirmDelete) {
            await axios.delete(`http://localhost:8080/delete/iku7/${iku7_id}`);
            getIku7();
        }
    };


    // State untuk menyimpan hasil perhitungan
    const [achievementPercentage, setAchievementPercentage] = useState(0);


    useEffect(() => {
        // Hitung data yang memenuhi syarat
        const countValidData = () => {
            let validCount = 0;
            iku7.forEach((data) => {
                if (parseInt(data.jum_bobot) > 50 && data.rps) {
                    validCount++;
                }
            });
            return validCount;
        };


        // Hitung persentase capaian
        const calculateAchievementPercentage = () => {
            const totalData = iku7.length;
            const validDataCount = countValidData();
            const percentage = (validDataCount / totalData) * 100;
            return percentage.toFixed(2); // Bulatkan menjadi 2 desimal
        };


        // Set nilai persentase capaian
        setAchievementPercentage(calculateAchievementPercentage());
    }, [iku7]);


    return (
        <div>
            <Row>
            <h5 className="mb-3 mt-3">CAPAIAN IKU7</h5>
            <div class="input-group mb-3">
                <label class="input-group-text" for="inputGroupSelect01">Tahun</label>
                <select class="form-select" id="inputGroupSelect01">
                    <option selected>Pilih</option>
                    <option value="1">2022</option>
                    <option value="2">2023</option>
                </select>
            </div>




            <div class="input-group mb-3">
                <label class="input-group-text" for="inputGroupSelect02">Semester</label>
                <select class="form-select" id="inputGroupSelect02">
                    <option selected>Pilih</option>
                    <option value="1">Semester 1</option>
                    <option value="2">Semester 2</option>
                </select>
            </div>




            <div class="input-group mb-3">
                <button class="btn btn-primary" type="button">Cari</button>
                <button class="btn btn-secondary" type="button">Reset Pencarian</button>
            </div>


            <Col md="6" lg="4">
            <Card body className="text-center" color="light-info">
                <CardTitle tag="h5">1885 (18.57%)</CardTitle>
                <CardSubtitle tag="p">Jumlah yang memenuhi persentase dan berkas </CardSubtitle>
                <CardText></CardText>
                <div>
                <Button color="info">Selengkapnya</Button>
                </div>
            </Card>
            </Col>
            <Col md="6" lg="4">
            <Card body className="text-center">
            <CardTitle tag="h5">1981 (19.51%)</CardTitle>
            <CardSubtitle tag="p" className="small">Jumlah yang memenuhi hanya presentasenya [Aktivitas Partisipatif - Team base project lebih dari 50] </CardSubtitle>
            <div>
                <Button color="light-info">Selengkapnya</Button>
            </div>
            </Card>
            </Col>
            <Col md="6" lg="4">
            <Card body className="text-center"color="secondary" inverse>
                <CardTitle tag="h5">8170 (80.40%)</CardTitle>
                <CardSubtitle tag="p" className="small">Jumlah tidak memenuhi presentasenya [Aktivitas Partisipatif - Team base project kurang dari 50] </CardSubtitle>
                <div>
                <NavLink to="/rekapiku7">
                <Button color="light">Selengkapnya</Button>
                </NavLink>
                </div>
            </Card>
            </Col>
            </Row>
            <Row>
            <Col md="6" lg="12">
            <Card body className="text-center" color="light-success">
                <CardTitle tag="h5">{iku7.length}</CardTitle>
                <CardSubtitle tag="p" className="small">Jumlah Mata Kuliah Tayang </CardSubtitle>
                <CardText></CardText>
                <div>
                <NavLink to="/iku7valid">
                <Button color="success">Selengkapnya</Button>
                </NavLink>
                </div>
            </Card>
            </Col>
            </Row>
            <Row>
                <Col md="6" lg="12">
                    <Card body className="text-center" color="light-danger">
                        <CardSubtitle tag="p" className="small">Capaian dari target </CardSubtitle>
                        <CardTitle tag="h5">{achievementPercentage}% dari 50%</CardTitle>
                        <CardText>{achievementPercentage >= 50 ? "Tercapai" : "Belum Tercapai"}</CardText>
                        <div>
                            <NavLink to="/iku7notvalid">
                                <Button color="danger">Selengkapnya</Button>
                            </NavLink>
                        </div>
                    </Card>
                </Col>
            </Row>


            <Row>
                <Col lg="12">
                    <Card>
                        <CardTitle tag="h6" className="d-flex justify-content-between align-items-center border-bottom p-3 mb-0">
                            <span>
                                <i className="bi bi-card-text me-2"> </i>
                                Tabel IKU7
                            </span>
                            <NavLink to="/addiku7">
                                <button type="button" className="btn btn-primary">Add</button>
                            </NavLink>
                        </CardTitle>
                        <CardBody className="">
                            <Table bordered striped>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Kode Mata Kulaih</th>
                                        <th>Nama Mata Kuliah</th>
                                        <th>Tahun</th>
                                        <th>Semester</th>
                                        <th>Kelas</th>
                                        <th>Presentase Bobot</th>
                                        <th>RPS</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {iku7.map((iku, index) => (
                                        <tr key={iku.iku7_id}>
                                            <td>{index + 1}</td>
                                            <td>{iku.kode_mk}</td>
                                            <td>{iku.nama_mk}</td>
                                            <td>{iku.tahun}</td>
                                            <td>{iku.semester}</td>
                                            <td>{iku.kelas}</td>
                                            <td>{iku.jum_bobot}</td>
                                            <td>
                                                {iku.rps ? (
                                                    <Button
                                                        type="button"
                                                        onClick={() => window.open(`http://localhost:8080/uploads/${iku.rps}`, '_blank')}
                                                    >
                                                        Lihat File
                                                    </Button>
                                                ) : (
                                                    <Button color="danger">Belum Upload</Button>
                                                )}
                                            </td>
                                            <td>
                                                <Link to={`/update/iku7/${iku.iku7_id}`}>
                                                    <button type="button" className="btn btn-primary">Edit</button>
                                                </Link>
                                                <Button type="button" className="btn btn-danger" onClick={() => deleteIku7(iku.iku7_id)}>Delete</Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};


export default Iku7;
