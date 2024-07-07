import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { FaTrash } from 'react-icons/fa';
import { Card, CardTitle, CardBody, Table, Button } from 'reactstrap';


const Iku7NotValid = () => {
    const [iku7NotValidData, setIku7NotValidData] = useState([]);


    useEffect(() => {
        fetchIku7ValidData();
    }, []);


    const fetchIku7ValidData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/iku7');
            // Filter data IKU7 yang presentasenya lebih dari 50 dan telah mengupload file (RPS)
            const validData = response.data.filter(iku => parseInt(iku.presentase_bobot) < 50 && iku.rps);
            setIku7NotValidData(validData);
        } catch (error) {
            console.error('Error fetching valid IKU7 data:', error);
        }
    };


    const deleteIku7 = async (iku7_id) => {
        const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus data?");
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:8080/delete/iku7/${iku7_id}`);
                // Setelah hapus, ambil data terbaru
                fetchIku7ValidData();
            } catch (error) {
                console.error('Error deleting IKU7 data:', error);
            }
        }
    };


    return (
        <div>
            <h3>IKU7 - NotValid</h3>
            <Card>
                <CardTitle tag="h6" className="d-flex justify-content-between align-items-center border-bottom p-3 mb-0">
                    <span>
                        <i className="bi bi-card-text me-2"></i>
                        Data IKU7 yang Tidak Valid
                    </span>
                    <span>Jumlah Mata Kuliah: {iku7NotValidData.length}</span>
                </CardTitle>
                <CardBody>
                <NavLink to="/iku7">
                                <Button type="button" className="btn btn-secondary mb-3">Kembali</Button>
                            </NavLink>
                    <Table striped bordered>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Kode Mata Kuliah</th>
                                <th>Nama Mata Kuliah</th>
                                <th>Tahun</th>
                                <th>Semester</th>
                                <th>Kelas</th>
                                <th>Presentase Bobot</th>
                                <th>RPS</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {iku7NotValidData.map((iku, index) => (
                                <tr key={iku.iku7_id}>
                                    <td>{index + 1}</td>
                                    <td>{iku.kode_mk}</td>
                                    <td>{iku.nama_mk}</td>
                                    <td>{iku.tahun}</td>
                                    <td>{iku.semester === '1' ? 'Ganjil' : 'Genap'}</td>
                                    <td>{iku.kelas}</td>
                                    <td>{iku.presentase_bobot}</td>
                                    <td>
                                        {iku.rps ? (
                                            <a href={`http://localhost:8080/${iku.rps}`} target="_blank" rel="noreferrer">Lihat File</a>
                                        ) : (
                                            "Belum diunggah"
                                        )}
                                    </td>
                                    <td>
                                        <Button onClick={() => deleteIku7(iku.iku7_id)} className="btn btn-danger" size="sm">
                                            <FaTrash />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </CardBody>
            </Card>
        </div>
    );
};


export default Iku7NotValid;
