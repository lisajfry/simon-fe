import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Card, CardText, CardBody, CardTitle, CardSubtitle, Table, Button, Row, Col} from 'reactstrap';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Iku7Context } from './Iku7Context';


Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);


const Iku7 = () => {
    const { iku7Data, totalCapaianiku7 } = useContext(Iku7Context);
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedSemester, setSelectedSemester] = useState('');


    const handleSearch = () => {
        // Panggil fungsi getIku7 dari Iku7Context untuk melakukan pencarian
    };


    const handleReset = () => {
        setSelectedYear('');
        setSelectedSemester('');
        // Panggil fungsi getIku7 dari Iku7Context untuk mereset pencarian
    };


    const barChartData = {
        labels: iku7Data.map(iku => iku.nama_mk),
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
                beginAt: 10,
                max: 100,
                ticks: {
                    stepSize: 10,
                },
            },
        },
    };


    return (
        <div>
            <Row>
                <h5 className="mb-3 mt-3">CAPAIAN IKU7 (Kelas yang Kolaboratif dan Partisipasif)</h5>
               
                <div className='card-header'>
                    <form action='' method='get' autoComplete='off'>
                        <div className='float-left'>
                            <input type='text' name='keyword' value='' className='form-control'style={{ width:' 500px' }} placeholder='Ketik Tahun'></input>
                        </div>
                    </form>
                </div>
                <div className="float-right mb-3">
                    <button className="btn btn-primary" type="submit" onClick={handleSearch}>Cari</button>
                    <button className="btn btn-secondary" type="button" onClick={handleReset}>Reset Pencarian</button>
                </div>


                <Row>
                    <Col md="6" lg="12">
                        <Card body className="text-center" color={totalCapaianiku7 >= 50 ? "light-success" : "light-danger"}>
                            <CardSubtitle tag="p" className="small">Capaian dari target</CardSubtitle>
                            <CardTitle tag="h5">{totalCapaianiku7}% dari 50%</CardTitle>
                            <CardText>{totalCapaianiku7 >= 50 ? "Tercapai" : "Belum Tercapai"}</CardText>
                        </Card>
                    </Col>
                </Row>
            </Row>
            <Row>
                <Col lg="12">
                    <Card>
                        <CardBody>
                            <Bar data={barChartData} options={barChartOptions} />
                        </CardBody>
                    </Card>
                </Col>
                <Col md="6" lg="12">
                    <Card body className="text-left">
                        <Table size="sm">
                            <tbody>
                                <tr>
                                    <td>Data Iku 7 </td>
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
                                    <td>Jumlah yang memenuhi hanya presentasenya [Aktivitas Partisipatif - Team base project lebih dari 50] </td>
                                    <td>
                                        <NavLink to="/iku7notvalid">
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
