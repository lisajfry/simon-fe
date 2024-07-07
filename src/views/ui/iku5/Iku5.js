import React, { useContext, useState, useEffect } from 'react';
import { Card, CardBody, CardTitle, CardSubtitle, Table, Button, Row, Col } from 'reactstrap';
import ReactApexChart from 'react-apexcharts';
import { Iku5Context } from './Iku5Context';
import { NavLink } from 'react-router-dom';

const Iku5 = () => {
    const { totalDataIku5, selectedYear, setSelectedYear } = useContext(Iku5Context);
    const { totalCapaianIku5 } = totalDataIku5;
    const { totalDataKaryaIlmiah, totalDataKaryaTerapan, totalDataKaryaSeni } = totalDataIku5;

    // Function to generate a range of years
    const generateYears = (startYear, endYear) => {
        let years = [];
        for (let year = startYear; year <= endYear; year++) {
            years.push(year);
        }
        return years;
    };

    // Generate years from 2020 to the current year
    const currentYear = new Date().getFullYear();
    const years = generateYears(2020, currentYear);

    const [pieChartData, setPieChartData] = useState({
        series: [totalDataKaryaIlmiah, totalDataKaryaTerapan, totalDataKaryaSeni],
        options: {
            labels: ['Karya Ilmiah', 'Karya Terapan', 'Karya Seni'],
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
            series: [totalDataKaryaIlmiah, totalDataKaryaTerapan, totalDataKaryaSeni]
        });
    }, [totalDataKaryaIlmiah, totalDataKaryaTerapan, totalDataKaryaSeni]);

    const handleSearch = () => {
        // The data will automatically update due to the context's useEffect dependency on selectedYear
        setPieChartData({
            ...pieChartData,
            series: [totalDataKaryaIlmiah, totalDataKaryaTerapan, totalDataKaryaSeni],
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
                        <CardTitle tag="h6" className="p-3 mb-0">Pie Chart Capaian IKU5</CardTitle>
                        <CardBody>
                            <ReactApexChart options={pieChartData.options} series={pieChartData.series} type="donut" height={260} />
                        </CardBody>
                    </Card>
                </Col>

                <Col md="6">
                    <Card body className="text-center" color="success" inverse>
                        <CardSubtitle className="small mb-2" style={{ color: 'black' }}>Capaian dari Target</CardSubtitle>
                        <CardTitle><p className="mb-0">{totalCapaianIku5} dari 25%</p></CardTitle>
                        
                            <Button color="light-success" className="mt-2" size="sm">Selengkapnya</Button>
                       
                    </Card>

                    <Card body className="text mt-3">
                        <Table size="sm" style={{ fontSize: '12px' }}>
                            <thead>
                                <tr>
                                    <th>Data IKU5</th>
                                    <th>Tautan</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Karya Ilmiah, Karya Terapan, Karya Seni</td>
                                    <td>
                                        <NavLink to="/iku5list">
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

export default Iku5;
