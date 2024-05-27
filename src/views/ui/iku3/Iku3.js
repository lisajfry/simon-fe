import axios from 'axios';
import { NavLink } from 'react-router-dom';
import React, { useState, useContext, useEffect } from 'react';
import { FaChartBar , FaFile, FaDatabase } from 'react-icons/fa';
import {Card,CardText,CardTitle,Button,Row,Col, CardSubtitle} from 'reactstrap';
import ReactApexChart from 'react-apexcharts';
import Iku3Context from './Iku3Context';
import PrestasiContext from '../iku2/PrestasiContext';

const Iku3 = () => {

  const [totalData, setTotalData] = useState(0);
  const {totalDataIku3tridharma} = useContext(Iku3Context);
  const {totalDataIku3Praktisi} = useContext(Iku3Context);
  const {persentaseTridharma} = useContext(Iku3Context);
  const {totalDataPrestasi} = useContext(PrestasiContext);
  const {persentasePrestasi} = useContext(PrestasiContext);
  const {persentasePraktisi} = useContext(Iku3Context);

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
              <Card body className="text-center" color="success" inverse>
                  <CardTitle tag="h5"> <p style={{  color: 'black' }}>0  (0%)</p></CardTitle>
                  <CardSubtitle tag="p" className="small" style={{ color: 'black' }}>Pencapaian IKU3</CardSubtitle>
                  <CardText></CardText>
                  <div>
                      <NavLink to="/rekapiku1">
                          <Button color="light-success">Selengkapnya</Button>
                      </NavLink>
                  </div>
              </Card>
          </Col>
        
        </Row>
        <Row>
        
        <Col md="6" lg="4">
          <Card body className="text-center" >
          <CardTitle tag="h5"> <p style={{ marginLeft: '50 px' }}>{totalDataIku3tridharma} ({persentaseTridharma})</p></CardTitle>
            <CardSubtitle tag="p" className="small" style={{ color: 'black' }}>Jumlah Dosen Melakukan Tridharma di Kampus Lain</CardSubtitle>
            <CardText></CardText>
            <div>
            <NavLink to="/iku3tridharmalist">
              <Button color="light-danger">Selengkapnya</Button>
              </NavLink>
            </div>
          </Card>
        </Col>
        <Col md="6" lg="4">
          <Card body className="text-center" color="light-success">
          <CardTitle tag="h5"> <p style={{ marginLeft: '50 px' }}>{totalDataIku3Praktisi} ({persentasePraktisi})</p></CardTitle>
            <CardSubtitle tag="p" className="small" style={{ color: 'black' }}>Jumlah Dosen Bekerja Sebagai Praktisi di Dunia Industri</CardSubtitle>
            <CardText></CardText>
            <div>
            <NavLink to="/iku3praktisilist">
              <Button color="success">Selengkapnya</Button>
              </NavLink>
            </div>
          </Card>
        </Col>

        <Col md="6" lg="4">
          <Card body className="text-center" color="light-danger">
            <CardTitle tag="h5">{totalDataPrestasi} ({persentasePrestasi})</CardTitle>
            <CardSubtitle tag="p" className="small" style={{ color: 'black' }}>Jumlah Dosen Membimbing Mahasiswa Berprestasi</CardSubtitle>
            <CardText></CardText>
            <div>
            <NavLink to="/iku2prestasilist">
              <Button color="danger">Selengkapnya</Button>
            </NavLink>
            </div>
          </Card>
        </Col>
        </Row>
    </div>
  );
};

export default Iku3;
