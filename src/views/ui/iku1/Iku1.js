import React, { useContext, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Card, CardBody, CardTitle, CardSubtitle, Table, Button, Row, Col } from 'reactstrap';
import ReactApexChart from 'react-apexcharts';
import { RespondenContext } from './RespondenContext';


const Iku1 = () => {
    const { totalDataMendapatPekerjaan, totalDataWiraswasta, totalDataMelanjutkanStudi, totalCapaian } = useContext(RespondenContext);

    
    const [tahun, setTahun] = useState('');
    const [pieChartData, setPieChartData] = useState({
        series: [totalDataMendapatPekerjaan, totalDataWiraswasta, totalDataMelanjutkanStudi,],
        options: {
            labels: ['Mendapat Pekerjaan', 'Wiraswasta', 'Melanjutkan Studi'],
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
            series: [totalDataMendapatPekerjaan, totalDataWiraswasta, totalDataMelanjutkanStudi,]
        });
    }, [totalDataMendapatPekerjaan, totalDataWiraswasta, totalDataMelanjutkanStudi,]);

    const handleSearch = () => {
        console.log('Searching data for year:', tahun);
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
                        <CardTitle tag="h6" className="p-3 mb-0">Pie Chart Capaian IKU1</CardTitle>
                        <CardBody>
                            <ReactApexChart options={pieChartData.options} series={pieChartData.series} type="donut" height={260} />
                        </CardBody>
                    </Card>
                </Col>

                <Col md="6">
                    <Card body className="text-center" color="success" inverse>
                        <CardSubtitle className="small mb-2" style={{ color: 'black' }}>Capaian dari Target</CardSubtitle>
                        <CardTitle><p className="mb-0">{totalCapaian} dari 25%</p></CardTitle>
                        <NavLink to="/rekapiku1">
                            <Button color="light-success" className="mt-2" size="sm">Selengkapnya</Button>
                        </NavLink>
                    </Card>

                    <Card body className="text mt-3">
                        <Table size="sm" style={{ fontSize: '12px' }}>
                            <thead>
                                <tr>
                                    <th>Data IKU1</th>
                                    <th>Tautan</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Lulusan Mendapat Pekerjaan, Wiraswasta, Melanjutkan Studi</td>
                                    <td>
                                        <NavLink to="/iku1list">
                                            <Button size="sm" style={{ fontSize: '12px' }}>Buka</Button>
                                        </NavLink>
                                    </td>
                                </tr>
                                <tr>
                                    <td>Data yang Sesuai Kriteria</td>
                                    <td>
                                        <NavLink to="/iku1sesuai">
                                            <Button size="sm" style={{ fontSize: '12px' }}>Buka</Button>
                                        </NavLink>
                                    </td>
                                </tr>    
                                <tr>
                                    <td>Data yang Tidak Sesuai Kriteria</td>
                                    <td>
                                        <NavLink to="/iku1tidaksesuai">
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

export default Iku1;
