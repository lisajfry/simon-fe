import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import {
    Card,
    CardBody,
    CardTitle,
    Button,
    Col,
} from "reactstrap";

const Iku7List = () => {
    const [iku7, setIku7] = useState([]);

    useEffect(() => {
        getIku7();
    }, []);

    const getIku7 = async () => {
        const response = await axios.get("http://localhost:8080/iku7");
        setIku7(response.data);
    }

    const deleteIku7 = async (iku7_id) => {
        const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus pengguna?");
        if (confirmDelete) {
            await axios.delete('http://localhost:8080/delete/iku7/${iku7_id}');
            getIku7();
        }
    }

    return (
        <div>
            <Col>
                <Card>
                    <div style={{ textAlign: 'center' }}>
                        <CardTitle>TABEL iku7</CardTitle>
                    </div>

                    <CardBody>
                        <div className='row'>
                            <table className="table is-striped is-fullwidth">
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Kode_MK</th>
                                        <th>Nama_MK</th>
                                        <th>Tahun</th>
                                        <th>Semester</th>
                                        <th>Kelas</th>
                                        <th>Presentase_Bobot_Terpenuhi</th>
                                        <th>RPS</th>
                                        <th>Rancangan_Tugas_Dan_Evaluasi</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {iku7.map((iku_7, index) => (
                                        <tr key={iku_7.iku7_id}>
                                            <td>{index + 1}</td>
                                            <td>{iku_7.kode_mk}</td>
                                            <td>{iku_7.nama_mk}</td>
                                            <td>{iku_7.tahun}</td>
                                            <td>{iku_7.semester}</td>
                                            <td>{iku_7.kelas}</td>
                                            <td>{iku_7.presentase_bobot_terpenuhi}</td>
                                            <td>{iku_7.rps}</td>
                                            <td>{iku_7.rancangan_tugas_dan_evaluasi}</td>
                                            <td>
                                                <Link to={`/update/iku7/${iku_7.iku7_id}`}>
                                                    <Button className="btn" outline color="info">Edit</Button>
                                                </Link>
                                                <Button className="btn" outline color="danger" onClick={() => deleteIku7(iku_7.iku7_id)}>Delete</Button>
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

export default Iku7List;