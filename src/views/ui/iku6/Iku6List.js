import axios from 'axios';
import { NavLink, Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import {
  Card,
  CardTitle,
  Table,
  Button,
  Row,
  Col,
  CardBody
} from 'reactstrap';


const Iku6List = () => {
    const [iku6, setIku6] = useState([]);


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
        <Row>
        <Col lg="12">
            <Card>
                <CardTitle tag="h6" className="d-flex justify-content-between align-items-center border-bottom p-3 mb-0">
                    <span>
                        <i className="bi bi-card-text me-2"></i>
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
                                        <NavLink to={`/update/iku6/${iku6Item.iku6_id}`} className="btn btn-warning btn-small">
                                            <i className="fa fa-edit"></i>
                                        </NavLink>
                                        <button onClick={() => deleteIku6(iku6Item.iku6_id)} className="btn btn-danger btn-small">
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
    );
};




export default Iku6List;
