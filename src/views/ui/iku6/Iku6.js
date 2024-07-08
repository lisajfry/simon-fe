import React, { useContext, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Card, CardBody, CardTitle, CardSubtitle, Table, Button, Row, Col } from 'reactstrap';
import ReactApexChart from 'react-apexcharts';
import { Iku6Context } from './Iku6Context';
import './Iku6.css';
import axios from 'axios';

const Iku6 = () => {
    const { totalCapaianiku6 } = useContext(Iku6Context);
    const [iku6, setIku6] = useState([]);
    const [selectedYear, setSelectedYear] = useState('');
    const [noResultsFound, setNoResultsFound] = useState(false);
    const [pieChartData, setPieChartData] = useState({
        series: [],
        options: {
            labels: [],
            colors: ['#28a745', '#007bff', '#dc3545'],
            legend: {
                show: true,
                position: 'bottom',
                horizontalAlign: 'center',
                fontSize: '12px',
                markers: {
                    width: 8,
                    height: 8,
                },
            },
            dataLabels: {
                enabled: true,
                formatter: (val, opts) => opts.w.config.series[opts.seriesIndex],
                dropShadow: {
                    enabled: false,
                },
            },
            plotOptions: {
                pie: {
                    size: 80,
                    donut: {
                        labels: {
                            show: true,
                            total: {
                                showAlways: true,
                                show: true,
                            },
                        },
                    },
                },
            },
        },
    });

    useEffect(() => {
        getIku6List();
    }, []);

    useEffect(() => {
        generatePieChartData(iku6);
    }, [selectedYear, iku6]);

    const getIku6List = async () => {
        try {
            const response = await axios.get('http://localhost:8080/iku6');
            setIku6(response.data);
            generatePieChartData(response.data);
        } catch (error) {
            console.error('Error fetching IKU6 data:', error);
        }
    };

    const generatePieChartData = (data) => {
        const kriteriaMitraCounts = {};
        data.forEach(item => {
            if (!selectedYear || item.tahun === selectedYear) {
                if (kriteriaMitraCounts[item.kriteria_mitra]) {
                    kriteriaMitraCounts[item.kriteria_mitra]++;
                } else {
                    kriteriaMitraCounts[item.kriteria_mitra] = 1;
                }
            }
        });

        const labels = Object.keys(kriteriaMitraCounts);
        const dataValues = Object.values(kriteriaMitraCounts);

        setPieChartData({
            ...pieChartData,
            series: dataValues,
            options: {
                ...pieChartData.options,
                labels: labels,
            },
        });
    };

    const handleSearch = async () => {
        try {
            const response = await axios.get('http://localhost:8080/iku6', {
                params: { year: selectedYear }
            });
            setIku6(response.data);
            setNoResultsFound(response.data.length === 0);
            generatePieChartData(response.data);
        } catch (error) {
            console.error('Error fetching filtered IKU6 data:', error);
        }
    };

    const handleReset = () => {
        setSelectedYear('');
        setNoResultsFound(false);
        getIku6List();
    };

    return (
        <div className="p-3">
            <Row className="mb-3 align-items-center">
                <Col md="3">
                    <label className="input-group-text" htmlFor="inputGroupSelect01">Tahun</label>
                    <select 
                        className="form-select"
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                    >
                        <option value="">Pilih</option>
                        {[2020, 2021, 2022, 2023, 2024].map((year) => (
                            <option key={year} value={year}>{year}</option>
                        ))}
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
                        <CardTitle tag="h6" className="p-3 mb-0">Pie Chart Capaian IKU6</CardTitle>
                        <CardBody>
                            <ReactApexChart options={pieChartData.options} series={pieChartData.series} type="donut" height={260} />
                        </CardBody>
                    </Card>
                </Col>

                <Col md="6">
                    <Card body className="text-center" color={totalCapaianiku6 >= 25 ? "success" : "danger"} inverse>
                        <CardSubtitle className="small mb-2" style={{ color: 'black' }}>Capaian dari Target</CardSubtitle>
                        <CardTitle><p className="mb-0">{totalCapaianiku6}% dari 25%</p></CardTitle>
                    </Card>

                    <Card body className="text mt-3">
                        <Table size="sm" style={{ fontSize: '12px' }}>
                            <thead>
                                <tr>
                                    <th>Data IKU6</th>
                                    <th>Tautan</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>IKU6</td>
                                    <td>
                                        <NavLink to="/iku6list">
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

export default Iku6;
