import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {  Table, Col, Card, CardBody, CardTitle, Button } from 'reactstrap';
// import RespondenContext from './RespondenContext';

const Iku5List = () => {
    const [iku5List, setIku5List] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // const { totalDataResponden } = useContext(RespondenContext);
    
    useEffect(() => {
        fetchIku5List();
        console.log(typeof iku5List); // Check the data type
        console.log(iku5List); // Check the actual value
    }, []);

    const fetchNamaDosen = async (NIDN) => {
        try {
            const response = await axios.get('http://localhost:8080/dosen/${NIDN}');
            return response.data.nama_dosen;
        } catch (error) {
            console.error("Error while fetching nama dosen:", error);
            return null;
        }
    };

    const fetchIku5List = async () => {
        try {
            const response = await axios.get('http://localhost:8080/iku5');
            const iku5ListWithNama = await Promise.all(response.data.map(async (iku5) => {
                const namaDosen = await fetchNamaDosen(iku5.NIDN);
                return { ...iku5, nama_dosen: namaDosen };
            }));
            setIku5List(iku5ListWithNama);
            setLoading(false);
        } catch (error) {
            setError("Terjadi kesalahan saat mengambil data IKU 5.");
            setLoading(false);
            console.error('Error fetching IKU 5 list:', error);
        }
    };

    const deleteIku5 = async (iku5_id) => {
        const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus pengguna?");
        if (confirmDelete) {
            try {
                await axios.delete('http://localhost:8080/delete/iku5/${iku5_id}');
                fetchIku5List();
            } catch (error) {
                console.error("Error deleting data:", error);
            }
        }
    }

    return (
        <Col>
            <Card>
                <div>
                    {/* <p style={{ marginLeft: '10px' }}>Total Data: {totalDataResponden}</p> */}
                </div>
                <div style={{ textAlign: 'center' }}>
                    <CardTitle>Tabel Responden</CardTitle>
                </div>
                <CardBody>
                    <Table>
                        <thead>
                            <tr> 
                                <th>No</th>
                                <th>NIDN</th>
                                <th>Nama Dosen</th>
                                <th>Hasil Kerja</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {iku5List.map((iku5, index) => (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{iku5.NIDN}</td>
                                    <td>{iku5.nama_dosen}</td>
                                    <td>{iku5.hasilkerjadosen}</td>
                                    <td>
                                        <Link to={'/update/iku5/${iku5.iku5_id}'}>
                                            <Button className="btn" outline color="info">Edit</Button>
                                        </Link>
                                        <Button className="btn" outline color="danger" onClick={() => deleteIku5(iku5.iku5_id)}>Delete</Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </CardBody>
            </Card>
        </Col>
    );
};

export default Iku5List;