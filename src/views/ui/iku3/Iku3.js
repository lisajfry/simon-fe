import React, { useContext, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Card, CardBody, CardTitle, CardSubtitle, Table, Button, Row, Col } from 'reactstrap';
import ReactApexChart from 'react-apexcharts';
import Iku3Context from './Iku3Context';
import PrestasiContext from '../iku2/PrestasiContext';


const Iku3 = () => {
    const { totalDataIku3Tridharma, totalDataIku3Praktisi, totalCapaian } = useContext(Iku3Context);
    const { totalDataPrestasi } = useContext(PrestasiContext);

    const [modal, setModal] = useState(false);
    const [selectedIku3tridharma, setSelectedIku3tridharma] = useState(null);
    const [tahun, setTahun] = useState('');
    const [pieChartData, setPieChartData] = useState({
        series: [totalDataIku3Tridharma, totalDataIku3Praktisi, totalDataPrestasi],
        options: {
            labels: ['Tridharma di Kampus Lain', 'Praktisi di Dunia Industri', 'Membimbing Mahasiswa'],
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
        setPieChartData({
            ...pieChartData,
            series: [totalDataIku3Tridharma, totalDataIku3Praktisi, totalDataPrestasi]
        });
    }, [totalDataIku3Tridharma, totalDataIku3Praktisi, totalDataPrestasi]);

    const handleSearch = () => {
        console.log('Searching data for year:', tahun);
    };

    const toggleModal = () => setModal(!modal);

    const openEditModal = (iku3tridharma) => {
        setSelectedIku3tridharma(iku3tridharma);
        toggleModal();
    };

    return (
        <div className="p-3">
            <Row className="mb-3 align-items-center">
                <Col md="3">
                    <label className="input-group-text" htmlFor="inputGroupSelect01">Tahun</label>
                    <select 
                        className="form-select"
                        value={tahun}
                        onChange={(e) => setTahun(e.target.value)}
                    >
                        <option value="">Pilih</option>
                        <option value="2022">2022</option>
                        <option value="2023">2023</option>
                    </select>
                </Col>
                <Col md="3">
                    <Button color="primary" className="me-2" size="sm" onClick={handleSearch}>Cari</Button>
                    <Button color="secondary" size="sm">Reset</Button>
                </Col>
            </Row>

            <Row className="mb-3">
                <Col md="6">
                    <Card body className="text-center">
                        <CardTitle tag="h6" className="p-3 mb-0">Pie Chart Capaian IKU3</CardTitle>
                        <CardBody>
                            <ReactApexChart options={pieChartData.options} series={pieChartData.series} type="donut" height={260} />
                        </CardBody>
                    </Card>
                </Col>

                <Col md="6">
                    <Card body className="text-center" color="success" inverse>
                        <CardSubtitle className="small mb-2" style={{ color: 'black' }}>Capaian dari Target</CardSubtitle>
                        <CardTitle><p className="mb-0">{totalCapaian} dari 25%</p></CardTitle>
                        <NavLink to="/rekapiku3">
                            <Button color="light-success" className="mt-2" size="sm">Selengkapnya</Button>
                        </NavLink>
                    </Card>

                    <Card body className="text mt-3">
                        <Table size="sm" style={{ fontSize: '12px' }}>
                            <thead>
                                <tr>
                                    <th>Data IKU3</th>
                                    <th>Tautan</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Dosen Berkegiatan Tridharma</td>
                                    <td>
                                        <NavLink to="/iku3tridharmalist">
                                            <Button size="sm" style={{ fontSize: '12px' }}>Buka</Button>
                                        </NavLink>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Dosen Bekerja Sebagai Praktisi</td>
                                    <td>
                                        <NavLink to="/iku3praktisilist">
                                            <Button size="sm" style={{ fontSize: '12px' }}>Buka</Button>
                                        </NavLink>
                                    </td>
                                </tr>    
                                <tr>
                                    <td>Dosen Membimbing Mahasiswa Berkegiatan di Luar Prodi</td>
                                    <td>
                                        <NavLink to="/iku3membimbinglist">
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

export default Iku3;
