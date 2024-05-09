import axios from 'axios';
import { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Row, Col } from 'reactstrap';
import { FaUsers, FaTrophy } from 'react-icons/fa';


const Iku6 = () => {
    useEffect(() => {
        fetchTotalData();
    }, []);

    const fetchTotalData = async () => {
        try {
            const response = await axios.get('http://localhost:8080/iku6');
            console.log('Total data length:', response.data.length);
        } catch (error) {
            console.error('Error fetching total data:', error);
        }
    };
    
    return (
        <div>
            <Row>
                <h5 className="mb-3 mt-3">CAPAIAN IKU 6</h5>
            </Row>
            <Row>
                <p className="mb-3 mt-3">Pilih tahun untuk menampilkan capaian IKU 6 :</p>
            </Row>
            <Row>
                <div className="input-group mb-3">
                    <label className="input-group-text" htmlFor="inputGroupSelect01">Tahun</label>
                    <select className="form-select" id="inputGroupSelect01">
                        <option defaultValue>Pilih</option>
                        <option value="1">2022</option>
                        <option value="2">2023</option>
                    </select>
                </div>
            </Row>
            <Row>
                <div className="input-group mb-3">
                    <button className="btn btn-primary" type="button">Cari</button>
                    <button className="btn btn-secondary" type="button">Reset Pencarian</button>
                </div>
            </Row>
            <Row>
                <Col xl="5" lg="3">
                    <div className="card shadow mb-4">
                        <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                            <h6 className="m-0 font-weight-bold text-primary">Cara Perhitungan IKU 6</h6>
                            <div className="dropdown no-arrow">
                            </div>
                        </div>
                        <div className="card-body" style={{ height: "200px", display: "flex", alignItems: "center" }}>
                            <div className="chart-area">
                                <div className="text-center">
                                    <p>(Jumlah Program Studi Bekerjasama : Total Program Studi Akhir) X 100%</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col xl="5" lg="3">
                    <div className="card shadow mb-4">
                        <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                            <h6 className="m-0 font-weight-bold text-primary">Capaian IKU 6</h6>
                            <div className="dropdown no-arrow">
                            </div>
                        </div>
                        <div className="card-body">
                            <div className="chart-area">
                                <div className="text-center">
                                    <div className="card bg-danger text-white shadow p-1 d-inline-block width=150px ">
                                        <div className="card-body text-center">Capaian : 563.76%</div>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <p>Jumlah Prodi Bekerja Sama :</p>
                                </div>
                                <div className="text-center">
                                    <p>Total Prodi Aktif :</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
            </Row>
            <Row>
                <h6 className="mb-3 mt-3" style={{ fontWeight: 'bold' }}>Data Detai IKU 6</h6>
            </Row>
            <Row>
                <Col xl="5" lg="3">
                    <div className="card shadow mb-4">
                        <div className="card-body bg-light-danger" style={{ height: "150px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                            <div>
                                <FaUsers style={{ color: 'black', fontWeight: 'bold', fontSize: '80px', marginBottom: '10px' }}/>
                            </div>
                            <div className="chart-area">
                                <div className="text-center">
                                    <p style={{ fontWeight: 'bold' }}>Mbuh</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="d-grid gap-2" style={{ marginTop: "-10px" }}>
                        <button className="btn btn-danger" type="button">Selengkapnya</button>
                    </div>
                </Col>
                <Col xl="5" lg="3">
                    <div className="card shadow mb-4">
                        <div className="card-body bg-light-primary" style={{ height: "150px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                            <div>
                                <FaTrophy style={{ color: 'black', fontWeight: 'bold', fontSize: '60px', marginBottom: '10px' }}/>
                            </div>
                            <div className="chart-area">
                                <div className="text-center">
                                    <p style={{ fontWeight: 'bold' }}>Data Per Jenis Kerjasama</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="d-grid gap-2" style={{ marginTop: "-10px" }}>
                        <button className="btn btn-primary" type="button">Selengkapnya</button>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default Iku6;