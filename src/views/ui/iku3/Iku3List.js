import React, { useState,useContext, useEffect } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import Iku3Context from './Iku3Context';
import {
    Card,
    CardBody,
    CardTitle,
    Button,
    Col,
    Table
} from "reactstrap";

const Iku3List = () => {
    const [iku3, setIku3] = useState([]);
    const { totalDataIku3 } = useContext(Iku3Context);

    useEffect(() => {
        getIku3();
    }, []);

    const getIku3 = async () => {
        try {
            const response = await axios.get("http://localhost:8080/iku3");
            setIku3(response.data);
        } catch (error) {
            console.error("Error while fetching iku3 data:", error);
        }
    }

    const deleteIku3 = async (iku3_id) => {
        const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus pengguna?");
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:8080/delete/iku3/${iku3_id}`);
                getIku3();
            } catch (error) {
                console.error("Error while deleting iku3:", error);
            }
        }
    }


    return (
        <div>
            <Col>
                <Card>
                <div>
                        <p style={{ marginLeft: '10px' }}>Total data: {totalDataIku3}</p>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                        <CardTitle>TABEL IKU3</CardTitle>
                    </div>
                    <CardBody>
                        <Table bordered>
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>NIDN</th>
                                    <th>Nama Dosen</th>
                                    <th>Aktivitas Dosen</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {iku3.map((iku_3, index) => (
                                    <tr key={iku_3.iku3_id}>
                                        <td>{index + 1}</td>
                                        <td>{iku_3.NIDN}</td>
                                        <td>{iku_3.nama_dosen}</td>
                                        <td>{iku_3.aktivitas_dosen}</td>
                                        <td>
                                            <Link to={`/update/iku3/${iku_3.iku3_id}`}>
                                                <Button className="btn" outline color="info">Edit</Button>
                                            </Link>
                                            <Button className="btn" outline color="danger" onClick={() => deleteIku3(iku_3.iku3_id)}>Delete</Button>
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

export default Iku3List;
