import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import React, { useState, useContext, useEffect } from 'react';
import { FaDatabase } from 'react-icons/fa';
import { Card, CardText, CardTitle, Button, Row, Col, Table } from 'reactstrap';
import ReactApexChart from 'react-apexcharts';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import DosenContext from '../dosen/DosenContext'; // Pastikan path ini benar
import { useSertifikasiProfesi } from './SertifikasiProfesiContext';
import { useDosenKalanganPraktisi } from './DosenKalanganPraktisiContext';


// Daftarkan elemen
ChartJS.register(ArcElement, Tooltip, Legend);


const Iku4 = () => {
  const navigate = useNavigate(); // Hook untuk navigasi
  const [iku4List, setIku4List] = useState([]);
  const { totalDataDosen, totalDataDosenNIDK } = useContext(DosenContext);
  const { filteredIku4List: sertifikasiProfesiList, count: sertifikasiProfesiCount } = useSertifikasiProfesi();
  const { filteredIku4List: kalanganPraktisiList, count: kalanganPraktisiCount } = useDosenKalanganPraktisi();


  // Lakukan perhitungan berdasarkan rumus yang diberikan
  const totalDosen = totalDataDosen + totalDataDosenNIDK;
  const perhitungan = ((sertifikasiProfesiCount / totalDosen) * 60) + ((kalanganPraktisiCount / totalDosen) * 40);
  const buttonColor = perhitungan >= 50 ? 'success' : 'danger';
  const statusCapaian = perhitungan >= 50 ? 'Hasil Memenuhi' : 'Hasil Tidak Memenuhi';
  const cardColor = perhitungan >= 50 ? 'success' : 'danger';


  const [selectedYear, setSelectedYear] = useState('');


  const handleSearch = async () => {
    try {
      const response = await axios.get('http://localhost:8080/iku4', {
        params: {
          year: selectedYear,
        }
      });
      setIku4List(response.data);
    } catch (error) {
      console.error('Error fetching filtered IKU4 data:', error);
    }
  };


  const handleReset = () => {
    setSelectedYear('');
  };


  const handleOpenIku4List = () => {
    navigate(`/iku4list?year=${selectedYear}`);
  };


  const [pieChartData, setPieChartData] = useState({
    series: [sertifikasiProfesiCount, kalanganPraktisiCount],
    options: {
      labels: ['Sertifikasi Profesi', 'Kalangan Praktisi'],
      colors: ['#FF6384', '#36A2EB'],
      legend: {
        show: true,
        position: 'bottom',
        horizontalAlign: 'center',
        fontSize: '12px',
        markers: {
          width: 8,
          height: 8,
        },
      },
      dataLabels: {
        enabled: true,
        formatter: (val, opts) => opts.w.config.series[opts.seriesIndex],
        dropShadow: {
          enabled: false,
        },
      },
      plotOptions: {
        pie: {
          size: 80,
          donut: {
            labels: {
              show: true,
              total: {
                showAlways: true,
                show: true,
              },
            },
          },
        },
      },
    },
  });


  return (
    <div>
      <Row>
        <Row className="mb-3 align-items-center">
          <Col md="3">
            <label className="input-group-text" htmlFor="inputGroupSelect01">Tahun</label>
            <select
              className="form-select"
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
            >
              <option value="">Pilih</option>
              <option value="2021">2021</option>
              <option value="2022">2022</option>
              <option value="2023">2023</option>
              <option value="2024">2024</option>
            </select>
          </Col>
          <Col md="3">
            <Button color="primary" className="me-2" size="sm" onClick={handleSearch}>Cari</Button>
            <Button color="secondary" size="sm" onClick={handleReset}>Reset</Button>
          </Col>
        </Row>


        <Row>
          <Col>
            <Col md="12" lg='12'>
              <Card body className="text-center">
                <CardTitle tag="h6" className="p-3 mb-0">Pie Chart Capaian IKU4</CardTitle>
                <CardText>
                  <ReactApexChart options={pieChartData.options} series={pieChartData.series} type="donut" height={260} />
                </CardText>
              </Card>
            </Col>
          </Col>


          <Col>
            <Col md="10" lg="12">
              <Card body className="text-center" color="danger">
                <CardTitle tag="h5"  size="sm" style={{ fontSize: '12px' }}>Capaian Target IKU 4</CardTitle>
                <div>
                  <p>{perhitungan.toFixed(2)}% dari 50%</p>
                </div>
                <div>
                  <Button color="light-warning" size="sm" style={{ fontSize: '12px' }}onClick={handleOpenIku4List}>Buka</Button>
                </div>
              </Card>
            </Col>


            <Col md="12" lg="12">
              <Card body className="text mt-3" >
                <div>
                  <Table size="sm" style={{ fontSize: '12px' }}>
                    <thead>
                      <tr>
                        <th>Data Raw</th>
                        <th>Tautan</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <th>Dosen yang Memiliki Sertifikasi Kompetensi/Profesi</th>
                        <th>
                          <NavLink to="/sertifikasiprofesi">
                          <Button size="sm" style={{ fontSize: '12px' }}>Buka</Button>
                          </NavLink>
                        </th>
                      </tr>
                      <tr>
                        <th>Dosen dari Kalangan Praktisi Profesional</th>
                        <th>
                          <NavLink to="/dosenkalanganpraktisi">
                          <Button size="sm" style={{ fontSize: '12px' }}>Buka</Button>
                          </NavLink>
                        </th>
                      </tr>                  
                    </tbody>
                  </Table>
                </div>
              </Card>
            </Col>
          </Col>
        </Row>
      </Row>
    </div>
  );
};


export default Iku4;
