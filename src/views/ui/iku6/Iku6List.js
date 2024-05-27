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
                            <i className="bi bi-card-text me-2"> </i>
                            Tabel IKU 6
                        </span>
                        <NavLink to="/addiku6">
                            <Button type="button" className="btn btn-primary">Add</Button>
                        </NavLink>
                    </CardTitle>
                    <CardBody className="">
                        <p>Jumlah Data: {iku6.length}</p> {/* Tambahkan baris ini untuk menampilkan jumlah data */}
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
                                    <th>Dokumen Kesepahaman (MOU) </th>
                                    <th>Dokumen Kesepakatan (PKS) </th>
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
                                            <Button
                                                type="button"
                                                onClick={() => window.open(`http://localhost:8080/uploads/${iku6Item.pks}`, '_blank')}
                                            >
                                                Lihat File
                                            </Button>
                                        </td>
                                        <td>
                                            <Link to={`/update/iku6/${iku6Item.iku6_id}`}>
                                                <Button type="button" className="btn btn-primary">Edit</Button>
                                            </Link>
                                            <Button type="button" className="btn btn-danger" onClick={() => deleteIku6(iku6Item.iku6_id)}>Delete</Button>
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
