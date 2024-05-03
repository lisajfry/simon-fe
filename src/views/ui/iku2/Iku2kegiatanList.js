import React, { useState,useContext, useEffect } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import KegiatanContext from './KegiatanContext';
import {
    Card,
    CardBody,
    CardTitle,
    Button,
    Col,
    Table
} from "reactstrap";

const Iku2kegiatanList = () => {
    const [iku2kegiatan, setIku2kegiatan] = useState([]);
    const { totalDataKegiatan } = useContext(KegiatanContext);

    useEffect(() => {
        getIku2kegiatan();
    }, []);

    const getIku2kegiatan = async () => {
        try {
            const response = await axios.get("http://localhost:8080/iku2kegiatan");
            setIku2kegiatan(response.data);
        } catch (error) {
            console.error("Error while fetching iku2kegiatan data:", error);
        }
    }

    const deleteIku2kegiatan = async (iku2kegiatan_id) => {
        const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus pengguna?");
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:8080/delete/iku2kegiatan/${iku2kegiatan_id}`);
                getIku2kegiatan();
            } catch (error) {
                console.error("Error while deleting iku2kegiatan:", error);
            }
        }
    }


    return (
        <div>
            <Col>
                <Card>
                <div>
                        <p style={{ marginLeft: '10px' }}>Total data: {totalDataKegiatan}</p>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <CardTitle>TABEL Kegiatan Diluar Prodi</CardTitle>
                    </div>
                    <CardBody>
                        <Table bordered>
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>NIM</th>
                                    <th>Nama Mahasiswa</th>
                                    <th>Angkatan</th>
                                    <th>Aktivitas</th>
                                    <th>SKS</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {iku2kegiatan.map((iku_2kegiatan, index) => (
                                    <tr key={iku_2kegiatan.iku2kegiatan_id}>
                                        <td>{index + 1}</td>
                                        <td>{iku_2kegiatan.NIM}</td>
                                        <td>{iku_2kegiatan.nama_mahasiswa}</td>
                                        <td>{iku_2kegiatan.angkatan}</td>
                                        <td>{iku_2kegiatan.aktivitas}</td>
                                        <td>{iku_2kegiatan.sks}</td>
                                        <td>
                                            <Link to={`/update/iku2kegiatan/${iku_2kegiatan.iku2kegiatan_id}`}>
                                                <Button className="btn" outline color="info">Edit</Button>
                                            </Link>
                                            <Button className="btn" outline color="danger" onClick={() => deleteIku2kegiatan(iku_2kegiatan.iku2kegiatan_id)}>Delete</Button>
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

export default Iku2kegiatanList;
