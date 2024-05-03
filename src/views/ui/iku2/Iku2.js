import axios from 'axios';
import { NavLink } from 'react-router-dom';
import React, { useState, useContext, useEffect } from 'react';
import MahasiswaContext from '../mahasiswa/MahasiswaContext';
import KegiatanContext from './KegiatanContext';
import PrestasiContext from './PrestasiContext';

import { FaFile, FaDatabase } from 'react-icons/fa';
import {
  Card,
  CardText,
  CardTitle,
  Button,
  Row,
  Col,
} from 'reactstrap';
import ReactApexChart from 'react-apexcharts';

const Iku2 = () => {
  const [options, setOptions] = useState({
    chart: {
      type: 'bar',
      height: 350,
      width: '100%',
    },
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
    xaxis: {
      categories: ['Bekerja', 'Wiraswasta', 'Melanjutkan Pekerjaan', 'Masih Mencari Pekerjaan'],
    },
    dataLabels: {
      enabled: false,
    },
    title: {
      text: 'Capaian IKU2',
    },
  });

  const [series, setSeries] = useState([
    {
      name: 'Total',
      data: [75, 20, 50, 30],
      colors: ['#008FFB', '#00E396', '#FEB019', '#FF4560'], // Set warna untuk setiap bar
    },
  ]);

  const [totalData, setTotalData] = useState(0);
  const { totalDataMahasiswa } = useContext(MahasiswaContext);
  const { totalDataKegiatan } = useContext(KegiatanContext);
  const { totalDataPrestasi } = useContext(PrestasiContext);
  

  useEffect(() => {
    fetchTotalData();
  }, []);

  const fetchTotalData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/iku2kegiatan');
      setTotalData(response.data.length); // Menggunakan panjang data sebagai total data
    } catch (error) {
      console.error('Error fetching total data:', error);
    }
  };

  

  return (
    <div>
      <Row>
        <h5 className="mb-3 mt-3">CAPAIAN IKU2 (MAHASISWA BERKEGIATAN DILUAR PROGRAM STUDI)</h5>
        <Row>
        <Col md="6" lg="4">
          <Card body className="text-center" color= "light-info">
            <CardTitle tag="h5">Input Kegiatan di Luar Prodi</CardTitle>
            <div>
            <NavLink to="/addiku2kegiatan">
              <Button color="info">Selengkapnya</Button>
              </NavLink>
            </div>
          </Card>
        </Col>
        <Col md="6" lg="4">
          <Card body className="text-center" color="light-info">
            <CardTitle tag="h5">Input Prestasi</CardTitle>
            <div>
            <NavLink to="/addiku2prestasi">
              <Button color="info">Selengkapnya</Button>
              </NavLink>
            </div>
          </Card>
        </Col>
        </Row>
        <Col md="6" lg="4">
          <Card body className="text-center">
            <CardTitle tag="h5">Jumlah Mahasiswa Berkegiatan di Luar Prodi</CardTitle>
            <CardText><p style={{ marginLeft: '50 px' }}>{totalDataKegiatan}</p></CardText>
            <div>
            <NavLink to="/iku2kegiatanlist">
              <Button color="light-warning">Selengkapnya</Button>
              </NavLink>
            </div>
          </Card>
        </Col>
        <Col md="6" lg="4">
        <Card body className="text-center">
          <CardTitle tag="h5">Jumlah Mahasiswa yang Diterima Pertukaran Pelajar </CardTitle>
            <CardText >
            <p style={{ marginLeft: '50 px' }}>{totalData}</p>
            </CardText>
         <div>
            <NavLink to="/iku2list">
              <Button color="light-danger">Selengkapnya</Button>
             </NavLink>
        </div>
        </Card>
        </Col>
        <Col md="6" lg="4">
          <Card body className="text-center">
            <CardTitle tag="h5">Jumlah Prestasi oleh Mahasiswa</CardTitle>
            <CardText><p style={{ marginLeft: '50 px' }}>{totalData}</p></CardText>
            <div>
            <NavLink to="/iku2prestasilist">
              <Button color="light-warning">Selengkapnya</Button>
              </NavLink>
            </div>
          </Card>
        </Col>
        </Row>
        <Row>
        <Col md="6" lg="4">
          <Card body className="text-center">
            <CardTitle tag="h5">Jumlah Mahasiswa yang Memenuhi Syarat</CardTitle>
            <CardText><p style={{ marginLeft: '50 px' }}>{totalDataKegiatan}</p></CardText>
            <div>
            <NavLink to="/lulusanlist">
              <Button color="light-warning">Selengkapnya</Button>
              </NavLink>
            </div>
          </Card>
        </Col>
        <Col md="6" lg="4">
          <Card body className="text-center">
            <CardTitle tag="h5">Total Mahasiswa Aktif</CardTitle>
            <CardText><p style={{ marginLeft: '50 px' }}>{totalDataMahasiswa}</p></CardText>
            <div>
            <NavLink to="/mahasiswalist">
              <Button color="light-warning">Selengkapnya</Button>
              </NavLink>
            </div>
          </Card>
        </Col>
        <Col md="6" lg="4">
          <Card body className="text-center">
            <CardTitle tag="h5">Pencapaian IKU2</CardTitle>
            <CardText><p style={{ marginLeft: '50 px' }}>{totalData}</p></CardText>
            <div>
            <NavLink to="/lulusanlist">
              <Button color="light-warning">Selengkapnya</Button>
              </NavLink>
            </div>
          </Card>
        </Col>
        </Row>
        
    </div>
  );
};

export default Iku2;
