import React, { useContext, useEffect, useState } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import { Card, CardBody, CardTitle, Button, Col, Table } from "reactstrap";
import MahasiswaContext from './MahasiswaContext';
import { FaEdit, FaTrash } from 'react-icons/fa';

const MahasiswaList = () => {
    const { totalDataMahasiswa } = useContext(MahasiswaContext);
    const { totalData } = useContext(MahasiswaContext);
    const [mahasiswa, setMahasiswa] = useState([]);
    const [filter, setFilter] = useState('');
    
    const handleReset = () => {
        setFilter(''); // Atur ulang filter
        setMahasiswa([]); // Kosongkan tabel
    }

    useEffect(() => {
        getMahasiswa();
    }, []);

    const getMahasiswa = async () => {
        try {
            const response = await axios.get('http://localhost:8080/mahasiswa');
            const filteredData = response.data.filter(mhs => mhs.angkatan === filter);
            setMahasiswa(filteredData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }    

    const handleSearch = () => {
        getMahasiswa();
    }

    const deleteMahasiswa = async (NIM) => {
        const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus pengguna?");
        if (confirmDelete) {
            try {
                await axios.delete(`http://localhost:8080/delete/mahasiswa/${NIM}`);
                getMahasiswa();
            } catch (error) {
                console.error("Error deleting data:", error);
            }
        }
    }

    return (
        <div>
            <Col md="3" className="mb-3">
                <div className="input-group mb-3">
                    <label className="input-group-text" htmlFor="inputGroupSelect01">Angkatan</label>
                    <select className="form-select" id="inputGroupSelect01" value={filter} onChange={(e) => setFilter(e.target.value)}>
                        <option value="">Pilih</option>
                        <option value="TI 2020">2020</option>
                        <option value="TI 2021">2021</option>
                        <option value="TI 2022">2022</option>
                        <option value="TI 2023">2023</option>
                    </select>
                </div>
                <div className="d-flex">
                    <Button color="primary" className="me-2" size="sm" onClick={handleSearch}>Cari</Button>
                    <Button color="secondary" size="sm" onClick={handleReset}>Reset</Button>
                </div>
            </Col>
            
            <Col>
                <div className="mb-3">
                    <Link to="/addmahasiswa">
                        <Button color="primary" size="sm">Input</Button>
                    </Link>
                </div>
                <Card>
                    <div>
                        <p style={{ marginLeft: '10px' }}>Total data: {totalDataMahasiswa}</p>
                    </div>
                    <CardTitle tag="h6" className="border-bottom p-3 mb-0 text-center">
                        <i className="bi bi-card-text me-2"> </i>         
                        Tabel Mahasiswa
                    </CardTitle>
                    <CardBody>
                        <Table bordered striped>
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>NIM</th>
                                    <th>Nama Mahasiswa</th>
                                    <th>Angkatan</th>
                                    <th>Keterangan</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {mahasiswa.map((mahasiswa, index) => (
                                    <tr key={mahasiswa.NIM}>
                                        <td>{index + 1}</td>
                                        <td>{mahasiswa.NIM}</td>
                                        <td>{mahasiswa.nama_mahasiswa}</td>
                                        <td>{mahasiswa.angkatan}</td>
                                        <td>{mahasiswa.keterangan}</td> 
                                        <td>
                                            <Link to={`/update/mahasiswa/${mahasiswa.NIM}`}>
                                                <Button outline color="info" size="sm" className="me-2"><FaEdit /></Button>
                                            </Link>
                                            <Button outline color="danger" size="sm" onClick={() => deleteMahasiswa(mahasiswa.NIM)}><FaTrash /></Button>
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

export default MahasiswaList;
