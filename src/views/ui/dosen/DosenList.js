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
import DosenContext from './DosenContext';

const DosenList = () => {
    const { totalDataDosen } = useContext(DosenContext);
    const [dosen, setDosen] = useState([]);

    useEffect(() => {
        getDosen();
    }, []);

    const getDosen = async () => {
        try {
            const response = await axios.get("http://localhost:8080/dosen");
            setDosen(response.data);
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

    return (
        <div>
            <Col>
                <div className="form-group">
                    <Link to="/adddosen">
                        <button type="submit" className="btn btn-primary">Input</button>
                    </Link>
                </div>
                <Card>
                    <div>
                        <p style={{ marginLeft: '10px' }}>Total data: {totalDataDosen}</p>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <CardTitle>TABEL Dosen</CardTitle>
                    </div>
                    <CardBody>
                        <div className='row'>
                            <table className="table is-striped is-fullwidth">
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
                                                    <Button className="btn" outline color="info">Edit</Button>
                                                </Link>
                                                <Button className="btn" outline color="danger" onClick={() => deleteDosen(dosen.NIDN)}>Delete</Button>
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

export default DosenList;
