import React, { useState, useContext, useEffect } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import { Card, CardText,CardBody,CardTitle,Button,Col,Row} from "reactstrap";
import { FaExclamationCircle } from 'react-icons/fa';

    const Iku2Rekap = () => {
      const [iku2, setIku2] = useState([]);
      const [currentPage, setCurrentPage] = useState(1);
        const itemsPerPage = 10;
        

    useEffect(() => {
        getIku2();
    }, []);

    const getIku2 = async () => {
        const response = await axios.get("http://localhost:8080/iku2");
        const iku2Data = response.data;

        // Fetch nama mahasiswa for each iku1
        const iku2WithMahasiswa = await Promise.all(iku2Data.map(async (iku2) => {
            const namaMahasiswa = await fetchNamaMahasiswa(iku2.NIM);
            return { ...iku2, nama_mahasiswa: namaMahasiswa, bobot: calculateBobot(iku2) };
        }));

        setIku2(iku2WithMahasiswa);
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

    const deleteIku2 = async (iku2_id) => {
        const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus pengguna?");
        if (confirmDelete) {
            await axios.delete(`http://localhost:8080/delete/iku2/${iku2_id}`);
            getIku2();
        }
    }

    const totalData = iku2.length;

    // Filter data based on criteria
    const filteredIku2 = iku2.filter((data) => {
        if (data.status === "wiraswasta" || data.status === "mendapat pekerjaan" || data.status === "melanjutkan studi") {
            return true;
        } else if (data.status === "belum berpendapatan" && data.mahasiswa) {
            return true;
        }
        return false;
    });

    const calculateBobot = (data) => {
        // Logika perhitungan bobot sesuai dengan kondisi yang Anda tentukan
        if (data.status === "mendapat pekerjaan" && data.gaji === "lebih dari 1.2xUMP" && data.masa_tunggu === "kurang dari 6 bulan") {
            return 1.0;
        } else if (data.status === "mendapat pekerjaan" && data.gaji === "kurang dari 1.2xUMP" && data.masa_tunggu === "kurang dari 6 bulan") {
            return 0.7;
        } else if (data.status === "mendapat pekerjaan" && data.gaji === "lebih dari 1.2xUMP" && data.masa_tunggu === "antara 6 sampai 12bulan") {
            return 0.8;
        } else if (data.status === "mendapat pekerjaan" && data.gaji === "kurang dari 1.2xUMP" && data.masa_tunggu === "antara 6 sampai 12bulan") {
            return 0.5;
        } else if (data.status === "wiraswasta" && data.gaji === "lebih dari 1.2xUMP" && data.masa_tunggu === "kurang dari 6 bulan") {
            return 1.2;
        } else if (data.status === "wiraswasta" && data.gaji === "kurang dari 1.2xUMP" && data.masa_tunggu === "kurang dari 6 bulan") {
            return 1.0;
        } else if (data.status === "wiraswasta" && data.gaji === "lebih dari 1.2xUMP" && data.masa_tunggu === "antara 6 sampai 12bulan") {
            return 1.0;
        } else if (data.status === "wiraswasta" && data.gaji === "kurang dari 1.2xUMP" && data.masa_tunggu === "antara 6 sampai 12bulan") {
            return 0.8;
        } else if (data.status === "melanjutkan studi") {
            return 1;
        }
        return null;
    };

    // Perhitungan total bobot
    const totalBobot = filteredIku2.reduce((accumulator, currentValue) => accumulator + currentValue.bobot, 0);


    // Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredIku2.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate total pages
  const totalPages = Math.ceil(filteredIku2.length / itemsPerPage);

    return (
        <div>
          <Row>
        <Col md="6" lg="4">
          <Card body>
            <CardTitle tag="h5">Ketentuan Pembobotan</CardTitle>
            <CardText style={{ fontSize: 'small', color: '#999' }}>
              <FaExclamationCircle style={{ marginRight: '5px' }} />
              <div>mendapat pekerjaan lebih dari 1.2xUMP kurang dari 6 bulan = 1.0</div>
              <div>mendapat pekerjaan kurang dari 1.2xUMP kurang dari 6 bulan = 0.7</div>
              <div>mendapat pekerjaan lebih dari 1.2xUMP antara 6 sampai 12bulan = 0.8</div>
              <div>mendapat pekerjaan kurang dari 1.2xUMP antara 6 sampai 12bulan = 0.5</div>
              
              <div>wiraswasta lebih dari 1.2xUMP kurang dari 6 bulan = 1.2</div>
              <div>wiraswasta kurang dari 1.2xUMP kurang dari 6 bulan = 1.0</div>
              <div>wiraswasta lebih dari 1.2xUMP antara 6 sampai 12bulan = 1.0</div>
              <div>wiraswasta kurang dari 1.2xUMP antara 6 sampai 12bulan = 0.8</div>
              
              <div>mahasiswa = 1</div>
            </CardText>
          </Card>
        </Col>
        <Col md="6" lg="4">
          <Card body>
            <CardTitle tag="h5">Responden Minimum</CardTitle>
            <CardText style={{ fontSize: 'small', color: '#999' }}>
              <FaExclamationCircle style={{ marginRight: '5px' }} />
              <div>jumlah responden minimum = </div>
              <div>jumlah lulusan </div>
              <div>______________ </div>
              <div>jumlah lulusan * galat(2,5%)^2 + 1</div>
              <div>
              <div>Jika tidak memenuhi jumlah responden minimum, maka pencapaian IKU 1 akan dihitung 0</div>
              </div>
            </CardText>
          </Card>
        </Col>
        </Row>
            <Col>
                <Card>
                    <div style={{ textAlign: 'center' }}>
                        <CardTitle>TABEL PEMBOBOTAN IKU1</CardTitle>
                    </div>
                    <CardBody>
                        <div className='row'>
                            <p style={{ marginLeft: '10px' }}>Total data: {filteredIku2.length}</p>
                            <p style={{ marginLeft: '10px' }}>Total bobot: {totalBobot}</p>
                            <table className="table is-striped is-fullwidth">
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>NIM</th>
                                        <th>Nama Lulusan</th>
                                        <th>Status</th>
                                        <th>Gaji</th>
                                        <th>Masa Tunggu</th>
                                        <th>Bobot</th>
                                       
                                    </tr>
                                </thead>
                                <tbody>
                                {currentItems.map((iku_2, index) => (
                                    
                                        <tr key={iku_2.iku1_id}>
                                            <td>{index + 1}</td>
                                            <td>{iku_2.NIM}</td>
                                            <td>{iku_2.nama_mahasiswa}</td>
                                            <td>{iku_2.status}</td>
                                            <td>{iku_2.gaji}</td>
                                             <td>{iku_2.masa_tunggu}</td>
                                            <td>{iku_2.bobot}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
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


export default Iku2Rekap;