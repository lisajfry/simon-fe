import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import { Table, Col, Card, CardBody, CardTitle, Button } from "reactstrap";
import { FaEdit, FaTrash } from 'react-icons/fa';

const Iku1Sesuai = () => {
    const [iku1, setIku1] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        getIku1();
    }, []);

    const getIku1 = async () => {
        const response = await axios.get("http://localhost:8080/iku1");
        const iku1Data = response.data;
    
        // Fetch nama mahasiswa for each iku1
        const iku1WithMahasiswa = await Promise.all(iku1Data.map(async (iku1) => {
            const namaMahasiswa = await fetchNamaMahasiswa(iku1.NIM);
            return { ...iku1, nama_mahasiswa: namaMahasiswa };
        }));
    
        setIku1(iku1WithMahasiswa);
    }
    

    const fetchNamaMahasiswa = async (NIM) => {
        try {
            const response = await axios.get(`http://localhost:8080/mahasiswa/${NIM}`);
            return response.data.nama_mahasiswa;
        } catch (error) {
            console.error("Error while fetching nama mahasiswa:", error);
            return null;
        }
    };

    const deleteIku1 = async (iku1_id) => {
        const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus pengguna?");
        if (confirmDelete) {
          await axios.delete(`http://localhost:8080/delete/iku1/${iku1_id}`);
          getIku1();
        }
    }

    // Filter data based on criteria
    const filteredIku1 = iku1.filter((data) => {
        if (data.status === "wiraswasta" || data.status === "mendapat pekerjaan" || data.status === "melanjutkan studi") {
            return true;
        }
        return false;
    });

    // Get current posts
    const indexOfLastPost = currentPage * itemsPerPage;
    const indexOfFirstPost = indexOfLastPost - itemsPerPage;
    const currentPosts = filteredIku1.slice(indexOfFirstPost, indexOfLastPost); // Use filteredIku1 here

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    // Calculate total pages
    const totalPages = Math.ceil(filteredIku1.length / itemsPerPage); // Use filteredIku1 here

    return (
        <div>
            <Col>
            <Card>
            <p style={{ marginLeft: '10px' }}>Total data: {filteredIku1.length}</p> {/* Use filteredIku1 here */}
            <div style={{textAlign: 'center'}}>
                <CardTitle tag="h5" style={{ fontWeight: 'bold', fontSize: '16px' }}>
                    TABEL DATA LULUSAN YANG SESUAI KRITERIA
                </CardTitle>
            </div>

            <CardBody>
                <div className='row'>
                    <Table responsive>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>NIM</th>
                                <th>Nama Lulusan</th>
                                <th>Status</th>
                                <th>Gaji</th>
                                <th>Masa Tunggu</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentPosts.map((iku_1, index) => (
                                <tr key={iku_1.iku1_id}>
                                    <th scope="row">{(currentPage - 1) * itemsPerPage + index + 1}</th>
                                    <td>{iku_1.NIM}</td>
                                    <td>{iku_1.nama_mahasiswa}</td>
                                    <td>{iku_1.status}</td>
                                    <td>{iku_1.gaji}</td>
                                    <td>{iku_1.masa_tunggu}</td>
                                    
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <div className="pagination-controls" style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                        <Button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} size="sm">Previous</Button>
                        <span style={{ margin: '0 10px', fontSize: '14px' }}>Page {currentPage}</span>
                        <Button onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} size="sm">Next</Button>
                    </div>
                </div>
            </CardBody>
            </Card>
            </Col>
        </div>
    );
}

export default Iku1Sesuai;
