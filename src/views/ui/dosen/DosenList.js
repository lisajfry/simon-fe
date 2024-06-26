import React, { useContext, useEffect, useState } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import {Card,CardBody,CardTitle,Button,Col,Table} from "reactstrap";
import DosenContext from './DosenContext';
import { FaEdit, FaTrash } from 'react-icons/fa';

const DosenList = () => {
    const { totalDataDosen } = useContext(DosenContext);
    const { totalDataDosenNIDK } = useContext(DosenContext);
    const [dosen, setDosen] = useState([]);
    const [dosenNIDK, setDosenNIDK] = useState([]);


    useEffect(() => {
        getDosen();
        getDosenNIDK();
    }, []);

    const getDosen = async () => {
        try {
            const response = await axios.get("http://localhost:8080/dosen");
            setDosen(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    const getDosenNIDK = async () => {
        try {
            const response = await axios.get("http://localhost:8080/dosenNIDK");
            setDosenNIDK(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    const deleteDosen = async (NIDN) => {
        const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus pengguna?");
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:8080/delete/dosen/${NIDN}`);
                getDosen();
            } catch (error) {
                console.error("Error deleting data:", error);
            }
        }
    }

    const deleteDosenNIDK = async (NIDK) => {
        const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus pengguna?");
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:8080/delete/dosenNIDK/${NIDK}`);
                getDosenNIDK();
            } catch (error) {
                console.error("Error deleting data:", error);
            }
        }
    }

    return (
        <div>
            <Col>
                <div className="form-group">
                    <Link to="/adddosen">
                        <button type="submit" className="btn btn-primary">Input</button>
                    </Link>
                </div>
                <Card style={{ marginTop: '10px' }}>
                    <div>
                        <p style={{ marginLeft: '10px' }}>Total data: {totalDataDosen}</p>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                    <CardTitle tag="h6" className="border-bottom p-3 mb-0">
                    <i className="bi bi-card-text me-2"> </i>         
                    Tabel Dosen Dengan NIDN
                </CardTitle>
                </div>
                 <CardBody className="">
                    <Table bordered striped>
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>NIDN</th>
                                        <th>Nama Dosen</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dosen.map((dosen, index) => (
                                        <tr key={dosen.NIDN}>
                                            <td>{index + 1}</td>
                                            <td>{dosen.NIDN}</td>
                                            <td>{dosen.nama_dosen}</td>
                                            <td>
                                                <Link to={`/update/dosen/${dosen.NIDN}`}>
                                                <Button outline color="info" size="sm"><FaEdit /></Button>
                                                </Link>
                                                <Button outline color="danger" size="sm" onClick={() => deleteDosen(dosen.NIDN)}><FaTrash /></Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                    </CardBody>
                </Card>
            </Col>

            <Col>
                <div className="form-group">
                    <Link to="/adddosenNIDK">
                        <button type="submit" className="btn btn-primary">Input</button>
                    </Link>
                </div>
                <Card style={{ marginTop: '10px' }}>
                    <div>
                        <p style={{ marginLeft: '10px' }}>Total data: {totalDataDosenNIDK}</p>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                    <CardTitle tag="h6" className="border-bottom p-3 mb-0">
                    <i className="bi bi-card-text me-2"> </i>         
                    Tabel Dosen Dengan NIDK
                </CardTitle>
                </div>
                 <CardBody className="">
                    <Table bordered striped>
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>NIDK</th>
                                        <th>Nama Dosen</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dosenNIDK.map((dosenNIDK, index) => (
                                        <tr key={dosenNIDK.NIDK}>
                                            <td>{index + 1}</td>
                                            <td>{dosenNIDK.NIDK}</td>
                                            <td>{dosenNIDK.nama_dosen}</td>
                                            <td>
                                                <Link to={`/update/dosenNIDK/${dosenNIDK.NIDK}`}>
                                                <Button outline color="info" size="sm"><FaEdit /></Button>
                                                </Link>
                                                <Button outline color="danger" size="sm" onClick={() => deleteDosenNIDK(dosenNIDK.NIDK)}><FaTrash /></Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                    </CardBody>
                </Card>
            </Col>
        </div>
    );
}

export default DosenList;
