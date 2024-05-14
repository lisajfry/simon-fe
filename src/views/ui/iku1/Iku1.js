import axios from 'axios';
import { NavLink } from 'react-router-dom';
import React, { useState, useContext, useEffect } from 'react';
import RespondenContext from './RespondenContext';
import SesuaiContext from './RespondenContext';
import TidakSesuaiContext from './RespondenContext';
import {  FaDatabase } from 'react-icons/fa';
import { MahasiswaContext } from '../mahasiswa/MahasiswaContext';
import {Card,CardText,CardTitle,Button,Row,Col,} from 'reactstrap';
import ReactApexChart from 'react-apexcharts';

const Iku1 = () => {
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
      text: 'Capaian IKU1',
    },
  });

  const [series, setSeries] = useState([
    {
      name: 'Total',
      data: [75, 20, 50, 30],
      colors: ['#008FFB', '#00E396', '#FEB019', '#FF4560'], // Set warna untuk setiap bar
    },
  ]);


  const {totalDataResponden} = useContext(RespondenContext);
  const {totalDataSesuai} = useContext(SesuaiContext);
  const {totalDataTidakSesuai} = useContext(TidakSesuaiContext);
  const { totalDataLulus } = useContext(MahasiswaContext);
  const [totalData, setTotalData] = useState(null);
  

  useEffect(() => {
    fetchTotalData();
  }, []);

  const fetchTotalData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/iku1');
      setTotalData(response.data.length); // Menggunakan panjang data sebagai total data
    } catch (error) {
      console.error('Error fetching total data:', error);
    }
  };

  

  return (
    <div>
      <Row>
        <h5 className="mb-3 mt-3">CAPAIAN IKU1 (LULUSAN MENDAPAT PEKERJAAN YANG LAYAK)</h5>

            <div class="input-group mb-3">
                <label class="input-group-text" for="inputGroupSelect01">Tahun</label>
                <select class="form-select" id="inputGroupSelect01">
                    <option selected>Pilih</option>
                    <option value="1">2022</option>
                    <option value="2">2023</option>
                </select>
            </div>

           
            <div class="input-group mb-3">
                <button class="btn btn-primary" type="button">Cari</button>
                <button class="btn btn-secondary" type="button">Reset Pencarian</button>
            </div>


            <Col md="6" lg="12">
          <Card body className="text-center"color="success" inverse>
            <CardTitle tag="h5">Pencapaian IKU1</CardTitle>
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
      
        <Col md="6" lg="4">
          <Card body className="text-center">
            <CardTitle tag="h5">Total Data Lulusan</CardTitle>
            <CardText><p style={{ marginLeft: '50 px' }}>{totalDataLulus}</p></CardText>
            <div>
              <NavLink to="/lulusanlist">
                <Button color="light-warning">Selengkapnya</Button>
              </NavLink>
            </div>
          </Card>
        </Col>
        <Col md="6" lg="4">
        <Card body className="text-center">
          <CardTitle tag="h5">Jumlah responden</CardTitle>
            <CardText >
            <p style={{ marginLeft: '10px' }}>{totalDataResponden}</p>
            </CardText> 
         <div>
            <NavLink to="/iku1list">
              <Button color="light-danger">Selengkapnya</Button>
             </NavLink>
        </div>
        </Card>
        </Col>
        </Row>
        <Row>
        <Col md="6" lg="4">
          <Card body className="text-center" color="light-success">
            <CardTitle tag="h5">Data Sesuai</CardTitle>
            <CardText><p style={{ marginLeft: '10px' }}>{totalDataSesuai}</p></CardText>
            <div>
            
            <NavLink to="/iku1valid">
              <Button color="success">Selengkapnya</Button>
              </NavLink>
           
            </div>
          </Card>
        </Col>
        <Col md="6" lg="4">
        <Card body className="text-center" color="light-warning"> 
          <CardTitle tag="h5">Tidak Sesuai</CardTitle>
          <CardText><p style={{ marginLeft: '10px' }}>{totalDataTidakSesuai}</p></CardText>
         <div>
            <NavLink to="/iku1notvalid">
              <Button color="warning">Selengkapnya</Button>
             </NavLink>
        </div>
        </Card>
        </Col>
        
        </Row>

        <Col md="6" lg="12">
          <Card body className="text-center"color="light-info">
            <CardTitle tag="h5">Raw Data</CardTitle>
            <CardText>
            <FaDatabase style={{ color: 'black', fontWeight: 'bold', fontSize: '35px', marginRight: '10px' }}/>
            </CardText>
            <div>
              <NavLink to="/addiku1">
              <Button body color="info">Input Data</Button>
              </NavLink>
            </div>
          </Card>
        </Col>
        
        
    </div>
  );
};

export default Iku1;
