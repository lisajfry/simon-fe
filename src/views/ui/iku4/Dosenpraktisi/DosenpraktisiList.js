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
// import DosenpraktisiContext from './DosenContext';

const DosenpraktisiList = () => {
    // const { totalDataDosen } = useContext(DosenContext);
    const [dosenpraktisi, setDosenpraktisi] = useState([]);

    useEffect(() => {
        getDosenpraktisi();
    }, []);

    const getDosenpraktisi = async () => {
        try {
            const response = await axios.get("http://localhost:8080/dosenpraktisi");
            setDosenpraktisi(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    const deleteDosenpraktisi = async (NIDN_praktisi) => {
        const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus pengguna?");
        if (confirmDelete) {
            try {
                await axios.delete('http://localhost:8080/delete/dosenpraktisi/${NIDN_praktisi}');
                getDosenpraktisi();
            } catch (error) {
                console.error("Error deleting data:", error);
            }
        }
    }

    return (
        <div>
            <Col>
                <div className="form-group">
                    <Link to="/adddosenpraktisi">
                        <button type="submit" className="btn btn-primary">Input</button>
                    </Link>
                </div>
                <Card>
                    <div>
                        <p style={{ marginLeft: '10px' }}>Total data: </p>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <CardTitle>Tabel Dosen Praktisi</CardTitle>
                    </div>
                    <CardBody>
                        <div className='row'>
                            <table className="table is-striped is-fullwidth">
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>NIDN</th>
                                        <th>Nama Dosen</th>
                                        <th>Bukti PDF</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {dosenpraktisi.map((dosenpraktisi, index) => (
                                        <tr key={dosenpraktisi.NIDN_praktisi}>
                                            <td>{index + 1}</td>
                                            <td>{dosenpraktisi.NIDN_praktisi}</td>
                                            <td>{dosenpraktisi.nama_dosen_praktisi}</td>
                                            <td>
                                                <Link to={'/update/dosenpraktisi/${dosenpraktisi.NIDN_praktisi}'}>
                                                    <Button className="btn" outline color="info">Edit</Button>
                                                </Link>
                                                <Button className="btn" outline color="danger" onClick={() => deleteDosenpraktisi(dosenpraktisi.NIDN_praktisi)}>Delete</Button>
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

export default DosenpraktisiList;