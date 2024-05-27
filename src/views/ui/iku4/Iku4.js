import axios from 'axios';
import { NavLink } from 'react-router-dom';
import React, { useState, useContext, useEffect } from 'react';
import {  FaDatabase } from 'react-icons/fa';
import {Card,CardText,CardTitle,Button,Row,Col,} from 'reactstrap';
import ReactApexChart from 'react-apexcharts';

const Iku4 = () => {
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
      text: 'Capaian IKU4',
    },
  });

  const [series, setSeries] = useState([
    {
      name: 'Total',
      data: [75, 20, 50, 30],
      colors: ['#008FFB', '#00E396', '#FEB019', '#FF4560'], // Set warna untuk setiap bar
    },
  ]);


  return (
    <div>
      <Row>
        <h5 className="mb-3 mt-3">CAPAIAN IKU4 (Praktisi Mengajar di Dalam Kampus)</h5>

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
            <CardTitle tag="h5">Pencapaian IKU4</CardTitle>
            <CardText>
              berapa persen
            </CardText>
            <div>
              <NavLink to="/rekapiku4">
              <Button color="light-success">Selengkapnya</Button>
              </NavLink>
            </div>
          </Card>
        </Col>


        <Col md="4" lg="4">
          <Card body className="text-center">
            <CardTitle tag="h5">Data Dosen</CardTitle>
            <div>
              <NavLink to="/dosenlist">
                <Button color="light-warning">Buka</Button>
              </NavLink>
            </div>
          </Card>
        </Col>
        <Col md="4" lg="4">
          <Card body className="text-center">
            <CardTitle tag="h5">Data Dosen Praktisi</CardTitle>
            <div>
              <NavLink to="/dosenpraktisilist">
                <Button color="light-warning">Buka</Button>
              </NavLink>
            </div>
          </Card>
        </Col>

        <Col md="4" lg="4">
        <Card body className="text-center">
          <CardTitle tag="h5">Dosen Berkualifikasi S3</CardTitle>
         <div>
            <NavLink to="/dosenberkualifikasis3">
              <Button color="light-warning">Buka</Button>
             </NavLink>
        </div>
        </Card>
        </Col>

        <Col md="4" lg="4">
        <Card body className="text-center">
          <CardTitle tag="h5">Sertifikasi Kompetensi Dosen</CardTitle>
         <div>
            <NavLink to="/sertifikasikompetensidosen">
              <Button color="light-warning">Buka</Button>
             </NavLink>
        </div>
        </Card>
        </Col>

        <Col md="4" lg="4">
        <Card body className="text-center">
          <CardTitle tag="h5">Praktisi Menjadi Dosen</CardTitle>
         <div>
            <NavLink to="/praktisimenjadidosen">
              <Button color="light-warning">Buka</Button>
             </NavLink>
        </div>
        </Card>
        </Col>

        <Col md="4" lg="4">
        <Card body className="text-center">
          <CardTitle tag="h5">Total Responden</CardTitle>
         <div>
            <NavLink to="/iku4list">
              <Button color="light-warning">Buka</Button>
             </NavLink>
        </div>
        </Card>
        </Col>
        
        </Row>
        

        <Col md="6" lg="12">
          <Card body className="text-center"color="light-info">
            <CardTitle tag="h5">Pengisian Data</CardTitle>
            <CardText>
            <FaDatabase style={{ color: 'black', fontWeight: 'bold', fontSize: '35px', marginRight: '10px' }}/>
            </CardText>
            <div>
              <NavLink to="/addiku4">
              <Button body color="info">Input Data</Button>
              </NavLink>
            </div>
          </Card>
        </Col>
        
    </div>
  );
};

export default Iku4;