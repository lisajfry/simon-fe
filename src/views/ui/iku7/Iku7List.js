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
                                Tabel IKU 7
                            </span>
                            <NavLink to="/addiku7">
                                <Button type="button" className="btn btn-primary btn-small">Add New</Button>
                            </NavLink>
                        </CardTitle>
                        <CardBody className="card-text-small">
                            <p className="card-text-small">Jumlah Data: {iku7Data.length}</p>
                            <Table bordered responsive>
                                <thead className="table-secondary text-center">
                                    <tr>
                                        <th>No</th>
                                        <th>Nama MK</th>
                                        <th>Case Method</th>
                                        <th>Team Base Project</th>
                                        <th>Semester</th>
                                        <th>Tahun</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="text-center">
                                    {iku7Data.map((iku7Item, index) => (
                                        <tr key={iku7Item.id}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{iku7Item.nama_mk}</td>
                                            <td>{iku7Item.case_method}</td>
                                            <td>{iku7Item.tb_project}</td>
                                            <td>{iku7Item.semester}</td>
                                            <td>{iku7Item.tahun}</td>
                                            <td>
                                                <NavLink to={`/update/iku7/${iku7Item.id}`} className="btn btn-warning btn-small">
                                                    <i className="fa fa-edit"></i>
                                                </NavLink>
                                                <button onClick={() => deleteIku7(iku7Item.id)} className="btn btn-danger btn-small">
                                                    <i className="fa fa-trash"></i>
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


export default Iku7List;
