import axios from 'axios';
import { NavLink } from 'react-router-dom';
import React, { useState, useContext, useEffect } from 'react';
import Iku3Context from './Iku3Context';
import { FaChartBar , FaFile, FaDatabase } from 'react-icons/fa';
import {
  Card,
  CardText,
  CardTitle,
  Button,
  Row,
  Col,
} from 'reactstrap';
import ReactApexChart from 'react-apexcharts';
import DosenContext from '../dosen/DosenContext';

const Iku3 = () => {
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
      text: 'Capaian IKU3',
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
  const { totalDataDosen } = useContext(DosenContext);
  const {totalDataIku3} = useContext(Iku3Context);

  

  useEffect(() => {
    fetchTotalData();
  }, []);

  const fetchTotalData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/iku3');
      setTotalData(response.data.length); // Menggunakan panjang data sebagai total data
    } catch (error) {
      console.error('Error fetching total data:', error);
    }
  };

  

  return (
    <div>
      <Row>
        <h5 className="mb-3 mt-3">CAPAIAN IKU3 (Dosen Berkegiatan di Luar Kampus)</h5>
        <Col md="6" lg="12">
          <Card body className="text-center"color="success" inverse>
            <CardTitle tag="h5">Pencapaian IKU3</CardTitle>
            <CardText>
              berapa persen
            </CardText>
            <div>
              <NavLink to="/rekapiku1">
              <Button color="light-success">Selengkapnya</Button>
              </NavLink>
            </div>
          </Card>
        </Col>
        <Col md="6" lg="12">
          <Card body className="text-center"color="light-info">
            <CardTitle tag="h5">Input</CardTitle>
            <CardText>
            <FaDatabase style={{ color: 'black', fontWeight: 'bold', fontSize: '35px', marginRight: '10px' }}/>
            </CardText>
            <div>
              <NavLink to="/addiku3tridharma">
              <Button body color="info">Input Data</Button>
              </NavLink>
            </div>
          </Card>
        </Col>
        
        <Col md="6" lg="4">
          <Card body className="text-center">
            <CardTitle tag="h5">Jumlah Dosen</CardTitle>
            <CardText><p style={{ marginLeft: '50 px' }}>{totalDataDosen}</p></CardText>
            <div>
            <NavLink to="/lulusanlist">
              <Button color="light-warning">Selengkapnya</Button>
              </NavLink>
            </div>
          </Card>
        </Col>
        
        
        </Row>
        <Row>
        
        <Col md="6" lg="4">
          <Card body className="text-center" color="light-success">
            <CardTitle tag="h5">Jumlah Dosen Melakukan Tridharma di Kampus Lain</CardTitle>
            <CardText></CardText>
            <div>`
            <NavLink to="/iku3tridharmalist">
              <Button color="success">Selengkapnya</Button>
              `</NavLink>
            </div>
          </Card>
        </Col>
        <Col md="6" lg="4">
          <Card body className="text-center" color="light-success">
            <CardTitle tag="h5">Jumlah Dosen Bekerja Sebagai Prakisi</CardTitle>
            <CardText></CardText>
            <div>
            <NavLink to="/iku3praktisilist">
              <Button color="success">Selengkapnya</Button>
              </NavLink>
            </div>
          </Card>
        </Col>

        <Col md="6" lg="4">
          <Card body className="text-center" color="light-success">
            <CardTitle tag="h5">Jumlah Dosen Membimbing Mahasiswa Berprestasi</CardTitle>
            <CardText></CardText>
            <div>
              <Button color="success">Selengkapnya</Button>
            </div>
          </Card>
        </Col>
        
        
        </Row>
    </div>
  );
};

export default Iku3;
