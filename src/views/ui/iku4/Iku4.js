import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import React, { useState, useContext, useEffect } from 'react';
import { FaDatabase } from 'react-icons/fa';
import { Card, CardText, CardTitle, Button, Row, Col, Table } from 'reactstrap';
import ReactApexChart from 'react-apexcharts';
import DosenContext from '../dosen/DosenContext';
import { useSertifikasiProfesi } from './SertifikasiProfesiContext';
import { useDosenKalanganPraktisi } from './DosenKalanganPraktisiContext';
import Iku4Context from './Iku4Context';


const Iku4 = () => {
    const navigate = useNavigate();
    const [iku4List, setIku4List] = useState([]);
    const { totalDataIku4, selectedYear, setSelectedYear, fetchDataByYear } = useContext(Iku4Context);
    const { totalDataDosen, totalDataDosenNIDK } = useContext(DosenContext);
    const { filteredIku4List: sertifikasiProfesiList, count: sertifikasiProfesiCount } = useSertifikasiProfesi();
    const { filteredIku4List: kalanganPraktisiList, count: kalanganPraktisiCount } = useDosenKalanganPraktisi();


    const totalDosen = totalDataDosen + totalDataDosenNIDK;
    const perhitungan = ((sertifikasiProfesiCount / totalDosen) * 60) + ((kalanganPraktisiCount / totalDosen) * 40);
    const buttonColor = perhitungan >= 50 ? 'success' : 'danger';
    const cardColor = perhitungan >= 50 ? 'success' : 'danger';
    const [years, setYears] = useState([]);


    useEffect(() => {
        const generateYears = (startYear, endYear) => {
            let years = [];
            for (let year = startYear; year <= endYear; year++) {
                years.push(year);
            }
            return years;
        };


        const currentYear = new Date().getFullYear();
        setYears(generateYears(2020, currentYear));
    }, []);


    const handleSearch = () => {
        fetchDataByYear(selectedYear);
    };


    const handleReset = () => {
        setSelectedYear('');
        fetchDataByYear('');
    };


    const handleOpenIku4List = () => {
        navigate(`/iku4list?year=${selectedYear}`);
    };


    const pieChartData = {
        series: [sertifikasiProfesiCount, kalanganPraktisiCount],
        options: {
            labels: ['Sertifikasi Profesi', 'Kalangan Praktisi'],
            colors: ['#28a745', '#007bff'],
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
    };


    useEffect(() => {
        if (selectedYear) {
            fetchDataByYear(selectedYear);
        }
    }, [selectedYear]);


    useEffect(() => {
        console.log('Total Data IKU4:', totalDataIku4);
        console.log('Selected Year:', selectedYear);
        console.log('Pie Chart Data:', pieChartData);
    }, [totalDataIku4, selectedYear, pieChartData]);


    return (
        <div className="p-3">
            <Row>
                <Row className="mb-3 align-items-center">
                    <Col md="3">
                        <label className="input-group-text" htmlFor="inputGroupSelect01">Tahun</label>
                        <select
                            className="form-select"
                            value={selectedYear}
                            onChange={(e) => setSelectedYear(e.target.value)}
                        >
                            <option value="">Pilih</option>
                            {years.map((year) => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </select>
                    </Col>
                    <Col md="3">
                        <Button color="primary" className="me-2" size="sm" onClick={handleSearch}>Cari</Button>
                        <Button color="secondary" size="sm" onClick={handleReset}>Reset</Button>
                    </Col>
                </Row>


                <Row>
                    <Col>
                        <Col md="12" lg='12'>
                            <Card body className="text-center">
                                <CardTitle tag="h6" className="p-3 mb-0">Pie Chart Capaian IKU4</CardTitle>
                                <CardText>
                                    <ReactApexChart options={pieChartData.options} series={pieChartData.series} type="donut" height={260} />
                                </CardText>
                            </Card>
                        </Col>
                    </Col>


                    <Col>
                        <Col md="10" lg="12">
                            <Card body className="text-center" color={cardColor}>
                                <CardTitle tag="h5">Capaian Target IKU 4</CardTitle>
                                <div>
                                    <p>{perhitungan.toFixed(2)}% dari 50%</p>
                                </div>
                                <div>
                                    <Button color="light-warning" onClick={handleOpenIku4List}>Buka</Button>
                                </div>
                            </Card>
                        </Col>


                        <Col md="12" lg="12">
                            <Card body className="text">
                                <div>
                                    <Table>
                                        <thead>
                                            <tr>
                                                <th>Data Raw</th>
                                                <th>Tautan</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <th>Dosen yang Memiliki Sertifikasi Kompetensi/Profesi</th>
                                                <th>
                                                    <NavLink to="/sertifikasiprofesi">
                                                        <Button>Buka</Button>
                                                    </NavLink>
                                                </th>
                                            </tr>
                                            <tr>
                                                <th>Dosen dari Kalangan Praktisi Profesional</th>
                                                <th>
                                                    <NavLink to="/dosenkalanganpraktisi">
                                                        <Button>Buka</Button>
                                                    </NavLink>
                                                </th>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </div>
                            </Card>
                        </Col>
                    </Col>
                </Row>
            </Row>
        </div>
    );
};


export default Iku4;
