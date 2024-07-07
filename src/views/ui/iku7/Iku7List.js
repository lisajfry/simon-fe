import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import { Button, Card, CardTitle, CardBody, Col, Table, Row } from 'reactstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Iku7Context } from './Iku7Context';


const Iku7List = () => {
    const { iku7Data } = useContext(Iku7Context);
    const navigate = useNavigate();


    const [iku7List, setIku7List] = useState([]);


    useEffect(() => {
        getIku7List();
    }, []);


    const getIku7List = async () => {
        try {
            const response = await axios.get('http://localhost:8080/iku7');
            setIku7List(response.data);
        } catch (error) {
            console.error('Error fetching IKU7 data:', error);
        }
    };


    const deleteIku7 = async (iku7_id) => {
        const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus data?");
        if (confirmDelete) {
            await axios.delete(`http://localhost:8080/delete/iku7/${iku7_id}`);
            getIku7List();
        }
    };


    return (
        <div>
            <h3>IKU7 - Data Iku 7</h3>
            <Row>
                <Col lg="12">
                    <Card>
                        <CardTitle tag="h6" className="d-flex justify-content-between align-items-center border-bottom p-3 mb-0">
                            <span>
                                <i className="bi bi-card-text me-2"></i>
                                Tabel IKU7
                            </span>
                            <span>Jumlah Mata Kuliah Tayang: {iku7List.length}</span>
                            <NavLink to="/addiku7">
                                <Button type="button" className="btn btn-primary">Add New</Button>
                            </NavLink>
                        </CardTitle>
                        <CardBody>
                            <NavLink to="/iku7">
                                <Button type="button" className="btn btn-secondary mb-3">Kembali</Button>
                            </NavLink>
                            <Table bordered striped style={{ fontSize: '12px' }}>
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Kode Mata Kuliah</th>
                                        <th>Nama Mata Kuliah</th>
                                        <th>Tahun</th>
                                        <th>Semester</th>
                                        <th>Kelas</th>
                                        <th>Presentase Bobot</th>
                                        <th>RPS</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {iku7List.map((iku, index) => (
                                        <tr key={iku.iku7_id}>
                                            <td>{index + 1}</td>
                                            <td>{iku.kode_mk}</td>
                                            <td>{iku.nama_mk}</td>
                                            <td>{iku.tahun}</td>
                                            <td>{iku.semester === '1' ? 'Ganjil' : 'Genap'}</td>
                                            <td>{iku.kelas}</td>
                                            <td>{iku.presentase_bobot}</td>
                                            <td>
                                                {iku.rps ? (
                                                    <a href={`http://localhost:8080/${iku.rps}`} target="_blank" rel="noopener noreferrer">Lihat File</a>
                                                ) : (
                                                    'Belum Upload'
                                                )}
                                            </td>
                                            <td>
                                                <NavLink to={`/update/iku7/${iku.iku7_id}`} className="btn btn-warning me-2" style={{ fontSize: '12px' }}>
                                                    <FaEdit />
                                                </NavLink>
                                                <Button onClick={() => deleteIku7(iku.iku7_id)} className="btn btn-danger" style={{ fontSize: '12px' }}>
                                                    <FaTrash />
                                                </Button>
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


export default Iku7List;
