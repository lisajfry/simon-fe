import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Card, CardBody, CardTitle, CardSubtitle, Table, Button, Row, Col } from 'reactstrap';
import ReactApexChart from 'react-apexcharts';
import { RespondenContext } from './RespondenContext';

const Iku1 = () => {
    const { totalData, selectedYear, setSelectedYear } = useContext(RespondenContext);
    const { totalDataMendapatPekerjaan, totalDataWiraswasta, totalDataMelanjutkanStudi, totalCapaianIku1 } = totalData;

    // Function to generate a range of years
    const generateYears = (startYear, endYear) => {
        let years = [];
        for (let year = startYear; year <= endYear; year++) {
            years.push(year);
        }
        return years;
    };

    // Generate years from 2000 to the current year
    const currentYear = new Date().getFullYear();
    const years = generateYears(2020, currentYear);

    const [pieChartData, setPieChartData] = useState({
        series: [totalDataMendapatPekerjaan, totalDataWiraswasta, totalDataMelanjutkanStudi],
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

    const handleSearch = () => {
        // The data will automatically update due to the context's useEffect dependency on selectedYear
        setPieChartData({
            ...pieChartData,
            series: [totalDataMendapatPekerjaan, totalDataWiraswasta, totalDataMelanjutkanStudi],
        });
    };

    const handleReset = () => {
        setSelectedYear('');
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
                        <CardTitle><p className="mb-0">{totalCapaianIku1} dari 25%</p></CardTitle>
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
