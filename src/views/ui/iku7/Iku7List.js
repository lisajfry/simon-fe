import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import axios from "axios";
import {
    Card,
    // CardImg,
    // CardText,
    CardBody,
    CardTitle,
    // CardSubtitle,
    // CardGroup,
    Col,
} from "reactstrap";

const Iku7List = () => {
    const [iku7, setIku7] = useState([]);

    useEffect(() => {
        getIku7();
    }, []);

    const getIku7 = async () => {
        const response = await axios.get('http://localhost:8080/iku7');
        setIku7(response.data);
    }

    const deleteIku7 = async (iku7_id) => {
        const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus pengguna?");
        if (confirmDelete) {
            await axios.delete(`http://localhost:8080/delete/iku7/${iku7_id}`);
            getIku7();
        }
    }

    return (
        <div>
            <Col>
            <Card>
                <div style={{ textAlign: 'center' }}>
                    <CardTitle>TABEL IKU 7</CardTitle>
                </div>
                <div>
                    <NavLink to="/addiku7">
                        <button type="button" class="btn btn-primary">Add</button>
                    </NavLink>
                </div>
                <CardBody>
                    <div className='row'>
                        <table className="table is-striped is-fullwidth">
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>Kode MK</th>
                                    <th>Nama MK</th>
                                    <th>Tahun</th>
                                    <th>Semester</th>
                                    <th>Kelas</th>
                                    <th>Rancangan Tugas Dan Evaluasi</th>
                                    <th>RPS</th>
                                    <th>Presentase Bobot Terpenuhi</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {iku7.map((iku7, index) => (
                                    <tr key={iku7.iku7_id}>
                                        <td>{index + 1}</td>
                                        <td>{iku7.Kode_MK}</td>
                                        <td>{iku7.Nama_MK}</td>
                                        <td>{iku7.Tahun}</td>
                                        <td>{iku7.Semester}</td>
                                        <td>{iku7.Kelas}</td>
                                        <td>{iku7.Presentase_Bobot_Terpenuhi}</td>
                                        <td>
                                        <a href={`http://localhost:8080/uploads/${iku7.RPS}`} target="_blank" rel="noopener noreferrer">
                                            {iku7.RPS}
                                        </a>
                                        </td>
                                        <td>
                                        <a href={`http://localhost:8080/uploads/${iku7.Rancangan_Tugas_Dan_Evaluasi}`} target="_blank" rel="noopener noreferrer">
                                            {iku7.Rancangan_Tugas_Dan_Evaluasi}
                                        </a>
                                    </td>
                                        <td>
                                            <Link to={`/update/iku7/${iku7.iku7_id}`}>
                                                <button type="button" class="btn btn-primary">Edit</button>
                                            </Link>
                                            <button type="button" class="btn btn-danger" onClick={() => deleteIku7(iku7.iku1_id)}>Delete</button>
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
    )
}

export default Iku7List;
