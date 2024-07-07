import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Card, CardBody, CardTitle, CardSubtitle, Table, Button, Row, Col, CardText } from 'reactstrap';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Iku7Context } from './Iku7Context';
import './Iku7.css';
import axios from 'axios';


Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);


const Iku7 = () => {
    const { iku7Data, totalCapaianiku7, setIku7Data } = useContext(Iku7Context);
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedSemester, setSelectedSemester] = useState('');
    const [searchedYear, setSearchedYear] = useState('');
    const [searchedSemester, setSearchedSemester] = useState('');
    const [noResultsFound, setNoResultsFound] = useState(false);


    const handleSearch = async () => {
        try {
            const response = await axios.get('http://localhost:8080/iku7', {
                params: {
                    year: selectedYear,
                    semester: selectedSemester
                }
            });
            setIku7Data(response.data);
            setNoResultsFound(response.data.length === 0);
            setSearchedYear(selectedYear);
            setSearchedSemester(selectedSemester);
        } catch (error) {
            console.error('Error fetching filtered IKU7 data:', error);
        }
    };


    const handleReset = () => {
        setSelectedYear('');
        setSelectedSemester('');
        setSearchedYear('');
        setSearchedSemester('');
        setNoResultsFound(false);
        // Optionally, re-fetch all data here
        // getIku7Data();
    };


    const barChartData = {
        labels: iku7Data.map(iku => `${iku.nama_mk}`),
        datasets: [
            {
                label: 'Case Method',
                data: iku7Data.map(iku => iku.case_method),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
            {
                label: 'Team Base Project',
                data: iku7Data.map(iku => iku.tb_project),
                backgroundColor: 'rgba(153, 102, 255, 0.6)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1,
            }
        ]
    };


    const barChartOptions = {
        scales: {
            y: {
                beginAt: 0,
                max: 60,
                ticks: {
                    stepSize: 10,
                },
            },
        },
    };


    return (
        <div className="body-background">
            <h6>IKU7 - Valid</h6>
            <CardBody>
                <Row className="mb-0 align-items-center" color="white"></Row>
                <Row>
                    <h5 className="mb-3 mt-3">CAPAIAN IKU 7 (Kelas yang Kolaboratif dan Partisipatif)</h5>
                </Row>
                <Row className="mb-0 align-items-center">
                    <Col md="3" className="col-container">
                        <div className='float-left'>
                            <input
                                type='text'
                                name='keyword'
                                value={selectedYear}
                                className='form-control'
                                placeholder='Ketik Tahun'
                                onChange={(e) => setSelectedYear(e.target.value)}
                            />
                        </div>
                        <select
                            className="form-select"
                            value={selectedSemester}
                            onChange={(e) => setSelectedSemester(e.target.value)}
                        >
                            <option value="">Pilih Semester</option>
                            <option value="ganjil">Ganjil</option>
                            <option value="genap">Genap</option>
                        </select>
                    </Col>
                    <Col md="3" className="col-container">
                        <Button color="primary" className="me-2" size="sm" onClick={handleSearch}>Cari</Button>
                        <Button color="secondary" size="sm" onClick={handleReset}>Reset</Button>
                    </Col>
                </Row>
                {noResultsFound && (
                    <Row>
                        <Col>
                            <div className="alert alert-warning mt-3" role="alert">
                                Data yang dicari tidak ditemukan.
                            </div>
                        </Col>
                    </Row>
                )}
                <Row>
                    <Col md="6" lg="12">
                        <Card body className="text-center capai-target-card" color={totalCapaianiku7 >= 50 ? "light-success" : "light-danger"}>
                            <CardSubtitle tag="p" className="small">Capaian dari target</CardSubtitle>
                            <CardTitle tag="h5">{totalCapaianiku7}% dari 50%</CardTitle>
                            <CardText>{totalCapaianiku7 >= 50 ? "Tercapai" : "Belum Tercapai"}</CardText>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col lg="12">
                        <Card className="bar-chart-card">
                            <CardSubtitle tag="h5" className="text-center fs-5">
                                {searchedYear && searchedSemester && `Tahun: ${searchedYear}  Semester: ${searchedSemester}`}
                            </CardSubtitle>
                            <CardBody>
                                <Bar data={barChartData} options={barChartOptions} />
                            </CardBody>
                        </Card>
                    </Col>
                    <Col md="6" lg="12">
                        <Card className="text mt-3">
                            <CardBody>
                                <Table size="sm" style={{ fontSize: '12px' }}>
                                    <thead>
                                        <tr>
                                            <th>Data Iku 7</th>
                                            <th>Tautan</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Data IKU 7</td>
                                            <td>
                                                <NavLink to="/iku7list">
                                                    <Button size="sm" style={{ fontSize: '12px' }}>Buka</Button>
                                                </NavLink>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Jumlah yang memenuhi persentase dan Berkas</td>
                                            <td>
                                                <NavLink to="/iku7valid">
                                                    <Button size="sm" style={{ fontSize: '12px' }}>Buka</Button>
                                                </NavLink>
                                            </td>
                                        </tr>    
                                        <tr>
                                            <td>Jumlah yang presentasenya Tidak Memenuhi</td>
                                            <td>
                                                <NavLink to="/iku7notvalid">
                                                    <Button size="sm" style={{ fontSize: '12px' }}>Buka</Button>
                                                </NavLink>
                                            </td>
                                        </tr>                  
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </CardBody>
        </div>
    );
};


export default Iku7;
