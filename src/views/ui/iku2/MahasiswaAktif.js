import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardTitle, Button, Col,Table } from 'reactstrap';

const MahasiswaAktifList = () => {
    const [totalDataMahasiswaAktif, setTotalDataMahasiswaAktif] = useState(0);
    const [mahasiswa, setMahasiswa] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        getMahasiswa();
    }, []);

    const getMahasiswa = async () => {
        try {
            const response = await axios.get('http://localhost:8080/mahasiswa');
            setMahasiswa(response.data);

            const totalDataMahasiswaAktif = response.data.filter(mhs => mhs.keterangan === 'mahasiswa aktif').length;
            setTotalDataMahasiswaAktif(totalDataMahasiswaAktif);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // Get current posts
    const indexOfLastPost = currentPage * itemsPerPage;
    const indexOfFirstPost = indexOfLastPost - itemsPerPage;
    const currentPosts = mahasiswa.slice(indexOfFirstPost, indexOfLastPost);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    // Calculate total pages
    const totalPages = Math.ceil(mahasiswa.length / itemsPerPage);

    return (
        <Col>
            <Card>
                <div>
                    <p style={{ marginLeft: '10px', fontSize: '14px' }}>Total data Mahasiswa Aktif: {totalDataMahasiswaAktif}</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                <CardTitle tag="h5" style={{ fontWeight: 'bold', fontSize: '16px' }}>
                        TABEL MAHASISWA AKTIF 
                    </CardTitle>
                </div>
                <CardBody>
                <Table responsive>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>NIM</th>
                                <th>Nama Mahasiswa</th>
                                <th>Angkatan</th>
                                <th>Keterangan</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            
                                {currentPosts
                                    .filter(mhs => mhs.keterangan === 'mahasiswa aktif')
                                    .map((mahasiswa, index) => (
                                        <tr key={mahasiswa.NIM}>
                                            <th scope="row">{(currentPage - 1) * itemsPerPage + index + 1}</th>
                                            <td>{mahasiswa.NIM}</td>
                                            <td>{mahasiswa.nama_mahasiswa}</td>
                                            <td>{mahasiswa.angkatan}</td>
                                            <td>{mahasiswa.keterangan}</td>
                                            
                                        </tr>
                                    ))}
                            </tbody>
                            
                        </Table>
                        <div className="pagination-controls" style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                            <Button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} size="sm">Previous</Button>
                            <span style={{ margin: '0 10px', fontSize: '14px' }}>Page {currentPage}</span>
                            <Button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} size="sm">Next</Button>
                        </div>
                </CardBody>
            </Card>
        </Col>
    );
};

export default MahasiswaAktifList;
