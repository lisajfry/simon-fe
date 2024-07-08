import React, { useContext, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Card, CardBody, CardTitle, CardSubtitle, Table, Button, Row, Col, CardText } from 'reactstrap';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Iku7Context } from './Iku7Context';
import axios from 'axios';
import './Iku7.css';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const Iku7 = () => {
    const { iku7Data, totalCapaianiku7, setIku7Data } = useContext(Iku7Context);
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedSemester, setSelectedSemester] = useState('');
    const [searchedYear, setSearchedYear] = useState('');
    const [searchedSemester, setSearchedSemester] = useState('');
    const [noResultsFound, setNoResultsFound] = useState(false);

    useEffect(() => {
        // Fetch initial data if needed
        getIku7Data();
    }, []);

    const getIku7Data = async () => {
        try {
            const response = await axios.get('http://localhost:8080/iku7');
            setIku7Data(response.data);
        } catch (error) {
            console.error('Error fetching IKU7 data:', error);
        }
    };

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
        getIku7Data();
    };

    const barChartData = {
        labels: iku7Data.map(iku => iku.nama_mk),
        datasets: [
            {
                label: 'Case Method',
                data: iku7Data.map(iku => iku.case_method),
                backgroundColor: '#28a745',
                borderColor: '#28a745',
                borderWidth: 1,
            },
            {
                label: 'Team Base Project',
                data: iku7Data.map(iku => iku.tb_project),
                backgroundColor: '#007bff',
                borderColor:  '#007bff',
                borderWidth: 1,
            }
        ]
    };

    const barChartOptions = {
        scales: {
            y: {
                beginAtZero: true,
                max: 60,
                ticks: {
                    stepSize: 10,
                },
            },
        },
    };

    return (
        <div className="p-3">
            <Row className="mb-3 align-items-center">
                <Col md="3">
                    <label className="input-group-text" htmlFor="inputGroupSelect01">Tahun</label>
                    <input
                        type='text'
                        name='keyword'
                        value={selectedYear}
                        className='form-control'
                        placeholder='Ketik Tahun'
                        onChange={(e) => setSelectedYear(e.target.value)}
                    />
                </Col>
                <Col md="3">
                    <label className="input-group-text" htmlFor="inputGroupSelect02">Semester</label>
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
                <Col md="3">
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

            <Row className="mb-3">
                <Col md="6">
                    <Card body className="text-center">
                        <CardTitle tag="h6" className="p-3 mb-0">Bar Chart Capaian IKU7</CardTitle>
                        <CardBody>
                            <Bar data={barChartData} options={barChartOptions} />
                        </CardBody>
                    </Card>
                </Col>

                <Col md="6">
                    <Card body className="text-center" color={totalCapaianiku7 >= 50 ? "success" : "danger"} inverse>
                        <CardSubtitle className="small mb-2" style={{ color: 'black' }}>Capaian dari Target</CardSubtitle>
                        <CardTitle><p className="mb-0">{totalCapaianiku7}% dari 50%</p></CardTitle>
                    </Card>

                    <Card body className="text mt-3">
                        <Table size="sm" style={{ fontSize: '12px' }}>
                            <thead>
                                <tr>
                                    <th>Data IKU7</th>
                                    <th>Tautan</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>IKU7</td>
                                    <td>
                                        <NavLink to="/iku7list">
                                            <Button size="sm" style={{ fontSize: '12px' }}>Buka</Button>
                                        </NavLink>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </Card>
                </Col>
            </Row>

            
        </div>
    );
};

export default Iku7;
