import React, { useContext, useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Card, CardBody, CardTitle, CardSubtitle, Table, Button, Row, Col, CardText } from 'reactstrap';
import { Doughnut } from 'react-chartjs-2';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Iku6Context } from './Iku6Context';
import './Iku6.css';


const Iku6 = () => {
    const { totalCapaianiku6 } = useContext(Iku6Context);
    const [iku6, setIku6] = useState([]);
    const [selectedYear, setSelectedYear] = useState('');
    const [searchedYear, setSearchedYear] = useState('');
    const [noResultsFound, setNoResultsFound] = useState(false);
    const [doughnutData, setDoughnutData] = useState({
        labels: [],
        datasets: [
            {
                label: 'Dataset',
                data: [],
                backgroundColor: [],
                hoverBackgroundColor: []
            }
        ]
    });


    useEffect(() => {
        getIku6List();
    },);


    const getIku6List = async () => {
        try {
            const response = await axios.get('http://localhost:8080/iku6');
            setIku6(response.data);
            generateDoughnutData(response.data);
        } catch (error) {
            console.error('Error fetching IKU6 data:', error);
        }
    };


    const generateDoughnutData = (data) => {
        const kriteriaMitraCounts = {};
        data.forEach(item => {
            if (item.tahun === selectedYear) {
                if (kriteriaMitraCounts[item.kriteria_mitra]) {
                    kriteriaMitraCounts[item.kriteria_mitra]++;
                } else {
                    kriteriaMitraCounts[item.kriteria_mitra] = 1;
                }
            }
        });


        const labels = Object.keys(kriteriaMitraCounts);
        const dataValues = Object.values(kriteriaMitraCounts);


        const updatedDoughnutData = {
            labels: labels,
            datasets: [
                {
                    label: 'Dataset',
                    data: dataValues,
                    backgroundColor: [
                        '#FF6384',
                        '#36A2EB',
                        '#FFCE56',
                        '#4BC0C0',
                        '#9966FF',
                        '#FF9F40'
                    ],
                    hoverBackgroundColor: [
                        '#FF6384',
                        '#36A2EB',
                        '#FFCE56',
                        '#4BC0C0',
                        '#9966FF',
                        '#FF9F40'
                    ]
                }
            ]
        };


        setDoughnutData(updatedDoughnutData);
    };


    const handleSearch = async () => {
        try {
            const response = await axios.get('http://localhost:8080/iku6', {
                params: {
                    year: selectedYear
                }
            });
            setIku6(response.data);
            setSearchedYear(selectedYear);
            setNoResultsFound(response.data.length === 0);
            generateDoughnutData(response.data);
        } catch (error) {
            console.error('Error fetching filtered IKU6 data:', error);
        }
    };


    const handleReset = () => {
        setSelectedYear('');
        setSearchedYear('');
        setNoResultsFound(false);
        getIku6List(); // Optionally, re-fetch all data here
    };


    const deleteIku6 = async (iku6_id) => {
        const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus data?");
        if (confirmDelete) {
            await axios.delete(`http://localhost:8080/delete/iku7/${iku6_id}`);
            getIku6List();
        }
    };


    return (
        <div className="body-background">
            <h6 className="card-title-small">IKU6 - Valid</h6>
            <Row className="mb-0 align-items-center" color="white"></Row>
            <Row>
                <h5 className="mb-3 mt-3 card-title-small">CAPAIAN IKU 6 (Kemitraan Program Studi)</h5>
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
                </Col>
                <Col md="3" className="col-container">
                    <Button color="primary" className="me-2" size="sm" onClick={handleSearch}>Cari</Button>
                    <Button color="secondary" className="btn-small" size="sm" onClick={handleReset}>Reset</Button>
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
                <Col xl="5" lg="3">
                    <Card body className="text-center" color={totalCapaianiku6 >= 25 ? "light-success" : "light-danger"}>
                        <CardSubtitle tag="p" className="small card-text-small">Capaian dari target</CardSubtitle>
                        <CardTitle tag="h5" className="card-title-small">{totalCapaianiku6}% dari 25%</CardTitle>
                        <CardText className="card-text-small">{totalCapaianiku6 >= 25 ? "Tercapai" : "Belum Tercapai"}</CardText>
                        <CardText className="card-text-small">Jumlah Mitra Bekerja Sama: {iku6.length}</CardText>
                    </Card>
                </Col>
            </Row>
            <Row>
            <Col xl="5" lg="3">
                <div className="card shadow mb-4">
                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 className="m-0 font-weight-bold text-primary card-title-small">Cara Perhitungan IKU 6</h6>
                        <div className="dropdown no-arrow"></div>
                    </div>
                    <div className="card-body" style={{ height: "150px", display: "flex", alignItems: "center" }}>
                        <div className="chart-area">
                            <div className="text-center card-text-small">
                                <p>(Jumlah Mitra Bekerjasama x Total Program Studi) / Nilai Bobot Mitra</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Col>
            </Row>
            <Row>
            <Col xl="5" lg="5">
                <Card className="mb-4">
                    <CardBody>
                        <Doughnut data={doughnutData} />
                    </CardBody>
                </Card>
            </Col>
            </Row>
            <Row>
                <Col lg="12">
                    <Card>
                        <CardTitle tag="h6" className="d-flex justify-content-between align-items-center border-bottom p-3 mb-0 card-title-small">
                            <span>
                                <i className="bi bi-card-text me-2"> </i>
                                Tabel IKU 6
                            </span>
                            <NavLink to="/addiku6">
                                <Button type="button" className="btn btn-primary btn-small">Add New</Button>
                            </NavLink>
                        </CardTitle>
                        <CardBody className="card-text-small">
                            <p className="card-text-small">Jumlah Data: {iku6.length}</p>
                            <Table bordered responsive>
                                <thead className="table-secondary text-center">
                                    <tr>
                                        <th>No</th>
                                        <th>Nama Mitra</th>
                                        <th>Nama Kegiatan</th>
                                        <th>Alamat Mitra</th>
                                        <th>Tahun</th>
                                        <th>Tgl Mulai Kegiatan</th>
                                        <th>Tgl Selesai Kegiatan</th>
                                        <th>Kriteria Mitra</th>
                                        <th>MoU</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="text-center">
                                    {iku6.map((iku6Item, index) => (
                                        <tr key={iku6Item.iku6_id}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{iku6Item.nama_mitra}</td>
                                            <td>{iku6Item.nama_kegiatan}</td>
                                            <td>{iku6Item.alamat_mitra}</td>
                                            <td>{iku6Item.tahun}</td>
                                            <td>{iku6Item.tgl_mulai_kegiatan}</td>
                                            <td>{iku6Item.tgl_selesai_kegiatan}</td>
                                            <td>{iku6Item.kriteria_mitra}</td>
                                            <td>
                                                {iku6Item.mou ? (
                                                    <a href={`http://localhost:8080/${iku6Item.mou}`} target="_blank" rel="noopener noreferrer">Lihat File</a>
                                                ) : (
                                                    'Belum Upload'
                                                )}
                                            </td>
                                            <td>
                                                <Link to={`/update/iku6/${iku6Item.iku6_id}`} className="btn btn-warning btn-small">
                                                    <FaEdit />
                                                </Link>
                                                <button onClick={() => deleteIku6(iku6Item.iku6_id)} className="btn btn-danger btn-small">
                                                    <FaTrash />
                                                </button>
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


export default Iku6;


