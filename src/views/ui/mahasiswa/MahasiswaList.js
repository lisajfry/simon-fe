import React, { useContext, useEffect, useState } from 'react';
import axios from "axios";

import { Link } from 'react-router-dom';
import {
    Card,
    CardBody,
    CardTitle,
    Button,
    Col,
} from "reactstrap";
import MahasiswaContext from './MahasiswaContext';

const MahasiswaList = () => {
    const { totalDataMahasiswa } = useContext(MahasiswaContext);
    const [mahasiswa, setMahasiswa] = useState([]);

    useEffect(() => {
        getMahasiswa();
    }, []);

    const getMahasiswa = async () => {
        try {
            const response = await axios.get("http://localhost:8080/mahasiswa");
            setMahasiswa(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    const deleteMahasiswa = async (NIM) => {
        const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus pengguna?");
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:8080/delete/mahasiswa/${NIM}`);
                getMahasiswa();
            } catch (error) {
                console.error("Error deleting data:", error);
            }
        }
    }

    return (
        <div>
            <Col>
                <div className="form-group">
                    <Link to="/addmahasiswa">
                        <button type="submit" className="btn btn-primary">Input</button>
                    </Link>
                </div>
                <Card>
                    <div>
                        <p style={{ marginLeft: '10px' }}>Total data: {totalDataMahasiswa}</p>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <CardTitle>TABEL Mahasiswa</CardTitle>
                    </div>
                    <CardBody>
                        <div className='row'>
                            <table className="table is-striped is-fullwidth">
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>NIM</th>
                                        <th>Nama Mahasiswa</th>
                                        <th>Angkatan</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {mahasiswa.map((mahasiswa, index) => (
                                        <tr key={mahasiswa.NIM}>
                                            <td>{index + 1}</td>
                                            <td>{mahasiswa.NIM}</td>
                                            <td>{mahasiswa.nama_mahasiswa}</td>
                                            <td>{mahasiswa.angkatan}</td>
                                            <td>
                                                <Link to={`/update/mahasiswa/${mahasiswa.NIM}`}>
                                                    <Button className="btn" outline color="info">Edit</Button>
                                                </Link>
                                                <Button className="btn" outline color="danger" onClick={() => deleteMahasiswa(mahasiswa.NIM)}>Delete</Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardBody>
                </Card>
            </Col>
        </div>
    );
}

export default MahasiswaList;
