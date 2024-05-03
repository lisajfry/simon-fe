import React, { useState,useContext, useEffect } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import PrestasiContext from './PrestasiContext';
import {
    Card,
    CardBody,
    CardTitle,
    Button,
    Col,
    Table
} from "reactstrap";

const Iku2prestasiList = () => {
    const [iku2prestasi, setIku2prestasi] = useState([]);
    const { totalDataPrestasi } = useContext(PrestasiContext);

    useEffect(() => {
        getIku2prestasi();
    }, []);

    const getIku2prestasi = async () => {
        try {
            const response = await axios.get("http://localhost:8080/iku2prestasi");
            setIku2prestasi(response.data);
        } catch (error) {
            console.error("Error while fetching iku2prestasi data:", error);
        }
    }

    const deleteIku2prestasi = async (iku2prestasi_id) => {
        const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus pengguna?");
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:8080/delete/iku2prestasi/${iku2prestasi_id}`);
                getIku2prestasi();
            } catch (error) {
                console.error("Error while deleting iku2prestasi:", error);
            }
        }
    }


    return (
        <div>
            <Col>
                <Card>
                <div>
                        <p style={{ marginLeft: '10px' }}>Total data: {totalDataPrestasi}</p>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <CardTitle>TABEL Prestasi oleh Mahasiswa</CardTitle>
                    </div>
                    <CardBody>
                        <Table bordered>
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>NIM</th>
                                    <th>Nama Mahasiswa</th>
                                    <th>Angkatan</th>
                                    <th>Tingkat Lomba</th>
                                    <th>Prestasi</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {iku2prestasi.map((iku_2prestasi, index) => (
                                    <tr key={iku_2prestasi.iku2prestasi_id}>
                                        <td>{index + 1}</td>
                                        <td>{iku_2prestasi.NIM}</td>
                                        <td>{iku_2prestasi.nama_mahasiswa}</td>
                                        <td>{iku_2prestasi.angkatan}</td>
                                        <td>{iku_2prestasi.tingkat_lomba}</td>
                                        <td>{iku_2prestasi.prestasi}</td>
                                        <td>
                                            <Link to={`/update/iku2prestasi/${iku_2prestasi.iku2prestasi_id}`}>
                                                <Button className="btn" outline color="info">Edit</Button>
                                            </Link>
                                            <Button className="btn" outline color="danger" onClick={() => deleteIku2prestasi(iku_2prestasi.iku2prestasi_id)}>Delete</Button>
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

export default Iku2prestasiList;
