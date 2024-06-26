import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table, Col, Card, CardBody, CardTitle, Button } from 'reactstrap';
import { useSertifikasiProfesi } from './SertifikasiProfesiContext';
import axios from 'axios';

const SertifikasiProfesiList = () => {
    const { filteredIku4List, count, loading, error, fetchIku4List } = useSertifikasiProfesi();

    useEffect(() => {
        fetchIku4List();
    }, [fetchIku4List]);

    const deleteIku4 = async (iku4_id) => {
        const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus pengguna?");
        if (confirmDelete) {
            try {
                await axios.delete('http://localhost:8080/delete/iku4/${iku4_id}');
                fetchIku4List();
            } catch (error) {
                console.error("Error saat menghapus data:", error);
            }
        }
    };

  
    return (
        <Col>
            <div>
                <p style={{ marginLeft: '10px' }}>Total data: {count}</p>
            </div>

            <Card>
                <div style={{ textAlign: 'center' }}>
                    <CardTitle>Tabel Dosen yang Memiliki Sertifikasi</CardTitle>
                </div>
                <CardBody>
                    <Table>
                        <thead>
                            <tr> 
                                <th>No</th>
                                <th>NIDN</th>
                                <th>Nama Dosen</th>
                                <th>Status</th>
                                <th>Bukti PDF</th>
                                <th>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredIku4List.map((iku4, index) => (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{iku4.NIDN}</td>
                                    <td>{iku4.nama_dosen}</td>
                                    <td>{iku4.status}</td>
                                    <td>{iku4.bukti_pdf}</td>
                                    <td>
                                        <div style={{ display: 'flex', gap: '5px' }}>
                                            <Link to={'/update/iku4/${iku4.iku4_id}'}>
                                                <Button className="btn" outline color="info">Edit</Button>
                                            </Link>
                                            <Button className="btn" outline color="danger" onClick={() => deleteIku4(iku4.iku4_id)}>Delete</Button>
                                        </div>
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

export default SertifikasiProfesiList;