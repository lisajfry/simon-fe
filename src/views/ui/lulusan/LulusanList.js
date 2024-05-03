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
import LulusanContext from './LulusanContext';

const LulusanList = () => {
    const { totalDataLulusan } = useContext(LulusanContext);
    const [lulusan, setLulusan] = useState([]);

    useEffect(() => {
        getLulusan();
    }, []);

    const getLulusan = async () => {
        try {
            const response = await axios.get("http://localhost:8080/lulusan");
            setLulusan(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }

    const deleteLulusan = async (no_ijazah) => {
        const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus pengguna?");
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:8080/delete/lulusan/${no_ijazah}`);
                getLulusan();
            } catch (error) {
                console.error("Error deleting data:", error);
            }
        }
    }

    return (
        <div>
            <Col>
                <div className="form-group">
                    <Link to="/addlulusan">
                        <button type="submit" className="btn btn-primary">Input</button>
                    </Link>
                </div>
                <Card>
                    <div>
                        <p style={{ marginLeft: '10px' }}>Total data: {totalDataLulusan}</p>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <CardTitle>TABEL Lulusan</CardTitle>
                    </div>
                    <CardBody>
                        <div className='row'>
                            <table className="table is-striped is-fullwidth">
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>No Ijazah</th>
                                        <th>Nama Alumni</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {lulusan.map((lulusan, index) => (
                                        <tr key={lulusan.no_ijazah}>
                                            <td>{index + 1}</td>
                                            <td>{lulusan.no_ijazah}</td>
                                            <td>{lulusan.nama_alumni}</td>
                                            <td>
                                                <Link to={`/update/lulusan/${lulusan.no_ijazah}`}>
                                                    <Button className="btn" outline color="info">Edit</Button>
                                                </Link>
                                                <Button className="btn" outline color="danger" onClick={() => deleteLulusan(lulusan.no_ijazah)}>Delete</Button>
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

export default LulusanList;
