import React, { useState,useContext, useEffect } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import RespondenContext from './RespondenContext';
import {
    Card,
    CardBody,
    CardTitle,
    Button,
    Col,
    Table
} from "reactstrap";

const Iku1List = () => {
    const [iku1, setIku1] = useState([]);
    const { totalDataResponden } = useContext(RespondenContext);

    useEffect(() => {
        getIku1();
    }, []);

    const getIku1 = async () => {
        try {
            const response = await axios.get("http://localhost:8080/iku1");
            setIku1(response.data);
        } catch (error) {
            console.error("Error while fetching iku1 data:", error);
        }
    }

    const deleteIku1 = async (iku1_id) => {
        const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus pengguna?");
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:8080/delete/iku1/${iku1_id}`);
                getIku1();
            } catch (error) {
                console.error("Error while deleting iku1:", error);
            }
        }
    }


    return (
        <div>
            <Col>
                <Card>
                <div>
                        <p style={{ marginLeft: '10px' }}>Total data: {totalDataResponden}</p>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <CardTitle>TABEL Responden</CardTitle>
                    </div>
                    <CardBody>
                        <Table bordered>
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>No Ijazah</th>
                                    <th>Nama Alumni</th>
                                    <th>Status</th>
                                    <th>Gaji</th>
                                    <th>Masa Tunggu</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {iku1.map((iku_1, index) => (
                                    <tr key={iku_1.iku1_id}>
                                        <td>{index + 1}</td>
                                        <td>{iku_1.no_ijazah}</td>
                                        <td>{iku_1.nama_alumni}</td>
                                        <td>{iku_1.status}</td>
                                        <td>{iku_1.gaji}</td>
                                        <td>{iku_1.masa_tunggu}</td>
                                        <td>
                                            <Link to={`/update/iku1/${iku_1.iku1_id}`}>
                                                <Button className="btn" outline color="info">Edit</Button>
                                            </Link>
                                            <Button className="btn" outline color="danger" onClick={() => deleteIku1(iku_1.iku1_id)}>Delete</Button>
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

export default Iku1List;
