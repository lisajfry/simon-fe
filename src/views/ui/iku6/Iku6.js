import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink, Link } from 'react-router-dom';
import { Row, Col, Button, Card, CardTitle, CardBody, Table } from 'reactstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Iku6Context } from './Iku6Context';


const Iku6 = () => {
    const { totalCapaianiku6 } = useContext(Iku6Context);
    const [iku6, setIku6] = useState([]);
    const cardClass = totalCapaianiku6 >= 50 ? 'bg-success' : 'bg-danger';


    useEffect(() => {
        getIku6List();
    }, []);


    const getIku6List = async () => {
        try {
            const response = await axios.get('http://localhost:8080/iku6');
            setIku6(response.data);
        } catch (error) {
            console.error('Error fetching IKU6 data:', error);
        }
    };


    const deleteIku6 = async (iku6_id) => {
        const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus data?");
        if (confirmDelete) {
            await axios.delete(`http://localhost:8080/delete/iku6/${iku6_id}`);
            getIku6List();
        }
    };
    return (
        <div>
            <Row>
                <h5 className="mb-3 mt-3">CAPAIAN IKU 6</h5>
            </Row>
            <Row>
                <p className="mb-3 mt-3">Pilih tahun untuk menampilkan capaian IKU 6 :</p>
            </Row>
            <Row>
                <div className="input-group mb-3">
                    <label className="input-group-text" htmlFor="inputGroupSelect01">Tahun</label>
                    <select className="form-select" id="inputGroupSelect01">
                        <option defaultValue>Pilih</option>
                        <option value="1">2022</option>
                        <option value="2">2023</option>
                    </select>
                </div>
            </Row>
            <Row>
            <div className="group mb-3">
                <button class="btn btn-primary" type="button">Cari</button>
                <button class="btn btn-secondary" type="button">Reset Pencarian</button>
            </div>
            </Row>
            <Row>
                <Col xl="5" lg="3">
                    <div className="card shadow mb-4">
                        <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                            <h6 className="m-0 font-weight-bold text-primary">Cara Perhitungan IKU 6</h6>
                            <div className="dropdown no-arrow">
                            </div>
                        </div>
                        <div className="card-body" style={{ height: "150px", display: "flex", alignItems: "center" }}>
                            <div className="chart-area">
                                <div className="text-center">
                                    <p>(Jumlah Mitra Bekerjasama x Total Program Studi) / Nilai Bobot Mitra</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col xl="5" lg="3">
                    <div className="card shadow mb-4">
                        <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                            <h6 className="m-0 font-weight-bold text-primary">Capaian IKU 6</h6>
                            <div className="dropdown no-arrow">
                            </div>
                        </div>
                        <div className="card-body">
                        <div className="chart-area">
                            <div className="text-center">
                            <div className={`card text-white shadow p-1 d-inline-block width=150px ${cardClass}`}>
                                <div className="card-body text-center">
                                Capaian: {totalCapaianiku6}%
                                </div>
                            </div>
                            </div>
                            <div className="text-center">
                            <p>Jumlah Mitra Bekerja Sama: {iku6.length}</p>
                            </div>
                        </div>
                        </div>
                    </div>
                </Col>
            </Row>
            <Row>
                <h6 className="mb-3 mt-3" style={{ fontWeight: 'bold' }}>Data Detai IKU 6</h6>
            </Row>
            <Row>
                <Col lg="12">
                    <Card>
                        <CardTitle tag="h6" className="d-flex justify-content-between align-items-center border-bottom p-3 mb-0">
                            <span>
                                <i className="bi bi-card-text me-2"> </i>
                                Tabel IKU 6
                            </span>
                            <NavLink to="/addiku6">
                                <Button type="button" className="btn btn-primary">Add New</Button>
                            </NavLink>
                        </CardTitle>
                        <CardBody className="">
                            <p>Jumlah Data: {iku6.length}</p>
                            <Table bordered striped>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Nama Mitra</th>
                                        <th>Nama Kegiatan</th>
                                        <th>Alamat Mitra</th>
                                        <th>Tanggal Mulai Kegiatan</th>
                                        <th>Tanggal Selesai Kegiatan</th>
                                        <th>Kriteria Mitra</th>
                                        <th>Dokumen Kesepahaman (MOU)</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {iku6.map((iku6Item, index) => (
                                        <tr key={iku6Item.iku6_id}>
                                            <td>{index + 1}</td> {/* This ensures the numbering starts from 1 */}
                                            <td>{iku6Item.nama_mitra}</td>
                                            <td>{iku6Item.nama_kegiatan}</td>
                                            <td>{iku6Item.alamat_mitra}</td>
                                            <td>{iku6Item.tgl_mulai_kegiatan}</td>
                                            <td>{iku6Item.tgl_selesai_kegiatan}</td>
                                            <td>{iku6Item.kriteria_mitra}</td>
                                            <td>
                                                <Button
                                                    type="button"
                                                    onClick={() => window.open(`http://localhost:8080/uploads/${iku6Item.mou}`, '_blank')}
                                                >
                                                    Lihat File
                                                </Button>
                                            </td>
                                            <td>
                                                <Link to={`/update/iku6/${iku6Item.iku6_id}`} className="btn btn-warning">
                                                    <FaEdit />
                                                </Link>
                                                <button onClick={() => deleteIku6(iku6Item.iku6_id)} className="btn btn-danger">
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
