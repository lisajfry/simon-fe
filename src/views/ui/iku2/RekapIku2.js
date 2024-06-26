import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Card, CardText, CardBody, CardTitle, Button, Col, Row } from "reactstrap";
import { FaExclamationCircle } from 'react-icons/fa';
import { AiOutlineFilePdf } from 'react-icons/ai';

const Iku2Rekap = () => {
  const [iku2kegiatan, setIku2kegiatan] = useState([]);
  const [iku2inbound, setIku2inbound] = useState([]);
  const [iku2prestasi, setIku2prestasi] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    getIku2kegiatan();
    getIku2inbound();
    getIku2prestasi();
  }, []);

  const getIku2kegiatan = async () => {
    const response = await axios.get("http://localhost:8080/iku2kegiatan");
    const iku2Data = response.data;

    // Fetch nama mahasiswa for each iku2kegiatan
    const iku2WithMahasiswa = await Promise.all(iku2Data.map(async (item) => {
      const namaMahasiswa = await fetchNamaMahasiswa(item.NIM);
      return { ...item, nama_mahasiswa: namaMahasiswa, bobot: calculateBobot(item) };
    }));

    setIku2kegiatan(iku2WithMahasiswa);
  };

  const getIku2inbound = async () => {
    const response = await axios.get("http://localhost:8080/iku2inbound");
    const iku2Data = response.data;

    // Fetch nama mahasiswa for each iku2inbound
    const iku2WithMahasiswa = await Promise.all(iku2Data.map(async (item) => {
      const namaMahasiswa = await fetchNamaMahasiswa(item.NIM);
      return { ...item, nama_mahasiswa: namaMahasiswa, bobot: calculateBobot(item) };
    }));

    setIku2inbound(iku2WithMahasiswa);
  };

  const getIku2prestasi = async () => {
    const response = await axios.get("http://localhost:8080/iku2prestasi");
    const iku2Data = response.data;

    // Fetch nama mahasiswa for each iku2inbound
    const iku2WithMahasiswa = await Promise.all(iku2Data.map(async (item) => {
      const namaMahasiswa = await fetchNamaMahasiswa(item.NIM);
      return { ...item, nama_mahasiswa: namaMahasiswa, bobot: calculateBobot(item) };
    }));

    setIku2prestasi(iku2WithMahasiswa);
  };

  const fetchNamaMahasiswa = async (NIM) => {
    try {
      const response = await axios.get(`http://localhost:8080/mahasiswa/${NIM}`);
      return response.data.nama_mahasiswa;
    } catch (error) {
      console.error("Error while fetching nama mahasiswa:", error);
      return null;
    }
  };

  const fetchIku2inbound = async () => {
    try {
        const response = await axios.get('http://localhost:8080/iku2inbound');
        const iku2inboundListWithNama = await Promise.all(response.data.map(async (iku2inbound) => {
            const namaMahasiswa = await fetchNamaMahasiswa(iku2inbound.NIM);
            return { ...iku2inbound, nama_mahasiswa: namaMahasiswa };
        }));
        setIku2inbound(iku2inboundListWithNama);
        } catch (error) {
            console.error('Error fetching IKU 2 Inbound list:', error);
        }
    };

  const deleteIku2kegiatan = async (iku2kegiatan_id) => {
    const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus pengguna?");
    if (confirmDelete) {
      await axios.delete(`http://localhost:8080/delete/iku2kegiatan/${iku2kegiatan_id}`);
      getIku2kegiatan();
    }
  };

  const calculateBobot = (data) => {
    // Logika perhitungan bobot sesuai dengan kondisi yang Anda tentukan
    const sks = parseFloat(data.sks);
    if (sks === 10) return 0.5;
    if (sks === 20) return 1.0;
    if (data.tingkat_kompetisi === "internasional") {
      if (data.prestasi === "juara1") return 1.0;
      if (data.prestasi === "juara2") return 0.9;
      if (data.prestasi === "juara3") return 0.8;
      if (data.prestasi === "peserta") return 0.7;
    } else if (data.tingkat_kompetisi === "nasional") {
      if (data.prestasi === "juara1") return 0.7;
      if (data.prestasi === "juara2") return 0.6;
      if (data.prestasi === "juara3") return 0.5;
    } else if (data.tingkat_kompetisi === "provinsi") {
      if (data.prestasi === "juara1") return 0.4;
      if (data.prestasi === "juara2") return 0.3;
      if (data.prestasi === "juara3") return 0.2;
    }
    return sks / 20;
  };

  // Perhitungan total bobot
  const totalBobotKegiatan = iku2kegiatan.reduce((accumulator, currentValue) => accumulator + (currentValue.bobot || 0), 0);
  const totalBobotInbound = iku2inbound.reduce((accumulator, currentValue) => accumulator + (currentValue.bobot || 0), 0);
  const totalBobotPrestasi = iku2prestasi.reduce((accumulator, currentValue) => accumulator + (currentValue.bobot || 0), 0);
  const totalBobot = (totalBobotKegiatan + totalBobotInbound + totalBobotPrestasi). toFixed(2);




  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = iku2kegiatan.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  // Calculate total pages
  const totalPages = Math.ceil(iku2kegiatan.length / itemsPerPage);

  return (
    <div>
      <Row>
        <Col md="6" lg="3">
          <Card body>
            <CardTitle tag="h5">Ketentuan Pembobotan</CardTitle>
            <CardText style={{ fontSize: 'small', color: '#999' }}>
              <FaExclamationCircle style={{ marginRight: '5px' }} />
              <div>sks 10 = 0.5</div>
              <div>sks 20 = 1.0.</div>
              <div>sks n = n/20</div>
            </CardText>
          </Card>
        </Col>
        <Col md="6" lg="4">
          <Card body>
            <CardTitle tag="h5">Ketentuan Pembobotan</CardTitle>
            <CardText style={{ fontSize: 'small', color: '#999' }}>
              <FaExclamationCircle style={{ marginRight: '5px' }} />
              <div>juara1 tingkat internasional = 1.0</div>
              <div>juara2 tingkat internasional = 0.9</div>
              <div>juara3 tingkat internasional = 0.8</div>
              <div>peserta tingkat internasional = 0.7</div>
            </CardText>
          </Card>
        </Col>
        <Col md="6" lg="3">
          <Card body>
            <CardTitle tag="h5">Ketentuan Pembobotan</CardTitle>
            <CardText style={{ fontSize: 'small', color: '#999' }}>
              <FaExclamationCircle style={{ marginRight: '5px' }} />
              <div>juara1 tingkat nasional = 0.7</div>
              <div>juara2 tingkat nasional = 0.6</div>
              <div>juara3 tingkat nasional = 0.5</div>
            </CardText>
          </Card>
        </Col>
        <Col md="6" lg="3">
          <Card body>
            <CardTitle tag="h5">Ketentuan Pembobotan</CardTitle>
            <CardText style={{ fontSize: 'small', color: '#999' }}>
              <FaExclamationCircle style={{ marginRight: '5px' }} />
              <div>juara1 tingkat provinsi = 0.4</div>
              <div>juara2 tingkat provinsi = 0.3</div>
              <div>juara3 tingkat provinsi = 0.2</div>
            </CardText>
          </Card>
        </Col>
        <Col md="6" lg="3">
          <Card body>
            <CardTitle tag="h5">{totalBobot}</CardTitle>
          </Card>
        </Col>
      </Row>
      <Col>
        <Card>
          <div style={{ textAlign: 'center' }}>
            <CardTitle>TABEL PEMBOBOTAN IKU2 KEGIATAN</CardTitle>
          </div>
          <CardBody>
            <div className='row'>
              <p style={{ marginLeft: '10px' }}>Total data: {iku2kegiatan.length}</p>
              <p style={{ marginLeft: '10px' }}>Total bobot: {totalBobotKegiatan}</p>
              <table className="table is-striped is-fullwidth">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>NIM</th>
                    <th>Nama Lulusan</th>
                    <th>Aktivitas</th>
                    <th>Tempat Kegiatan</th>
                    <th>SKS</th>
                    <th>Bobot</th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.map((iku_2kegiatan, index) => (
                    <tr key={iku_2kegiatan.iku2kegiatan_id}>
                      <td>{index + 1}</td>
                      <td>{iku_2kegiatan.NIM}</td>
                      <td>{iku_2kegiatan.nama_mahasiswa}</td>
                      <td>{iku_2kegiatan.aktivitas}</td>
                      <td>{iku_2kegiatan.tempat_kegiatan}</td>
                      <td>{iku_2kegiatan.sks}</td>
                      <td>{iku_2kegiatan.bobot}</td>
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

        <Card>
          <div style={{ textAlign: 'center' }}>
            <CardTitle>TABEL PEMBOBOTAN IKU2 INBOUND</CardTitle>
          </div>
          <CardBody>
            <div className='row'>
              <p style={{ marginLeft: '10px' }}>Total data: {iku2inbound.length}</p>
              <p style={{ marginLeft: '10px' }}>Total bobot: {totalBobotInbound}</p>
              <table className="table is-striped is-fullwidth">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>NIM</th>
                    <th>Nama Mahasiswa</th>
                    <th>Asal Negara</th>
                    <th>PTN Asal</th>
                    <th>SKS</th>
                    <th>Bobot</th>
                  </tr>
                </thead>
                <tbody>
                {iku2inbound.map((iku2inbound, index) => (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{iku2inbound.NIM}</td>
                                    <td>{iku2inbound.nama_mahasiswa}</td>
                                    <td>{iku2inbound.asal_negara}</td>
                                    <td>{iku2inbound.asal_ptn}</td>
                                    <td>{iku2inbound.sks}</td>
                        	          <td>{iku2inbound.bobot}</td>
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

        <Card>
          <div style={{ textAlign: 'center' }}>
            <CardTitle>TABEL PEMBOBOTAN IKU2 PRESTASI</CardTitle>
          </div>
          <CardBody>
            <div className='row'>
              <p style={{ marginLeft: '10px' }}>Total data: {iku2prestasi.length}</p>
              <p style={{ marginLeft: '10px' }}>Total bobot: {totalBobotPrestasi}</p>
              <table className="table is-striped is-fullwidth">
                <thead>
                  <tr>
                    <th>No</th>
                    <th>NIM</th>
                    <th>Nama Mahasiswa</th>
                    <th>Tingkat Kompetisi</th>
                    <th>Prestasi</th>
                    <th>Bobot</th>
                  </tr>
                </thead>
                <tbody>
                {iku2prestasi.map((iku2prestasi, index) => (
                                <tr key={index}>
                                    <th scope="row">{index + 1}</th>
                                    <td>{iku2prestasi.NIM}</td>
                                    <td>{iku2prestasi.nama_mahasiswa}</td>
                                    <td>{iku2prestasi.tingkat_kompetisi}</td>
                                    <td>{iku2prestasi.prestasi}</td>
                        	          <td>{iku2prestasi.bobot}</td>
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
