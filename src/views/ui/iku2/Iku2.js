import axios from 'axios';
import { NavLink } from 'react-router-dom';
import React, { useState, useContext, useEffect } from 'react';
import MahasiswaContext from '../mahasiswa/MahasiswaContext';
import KegiatanContext from './KegiatanContext';
import PrestasiContext from './PrestasiContext';
import {  FaDatabase } from 'react-icons/fa';
import {Card,CardText,CardTitle,Button,Row,Col, CardSubtitle} from 'reactstrap';

const Iku2 = () => {

  const [totalData, setTotalData] = useState(0);
  const { totalDataMahasiswaAktif } = useContext(MahasiswaContext);
  const { totalDataKegiatan } = useContext(KegiatanContext);
  const {persentaseKegiatan} = useContext(KegiatanContext);
  const { totalDataPertukaranPelajar } = useContext(KegiatanContext);
  const {persentasePertukaranPelajar} = useContext(KegiatanContext);
  const { totalDataPrestasi } = useContext(PrestasiContext);
  const {persentasePrestasi} = useContext(PrestasiContext);
  

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
                  <CardSubtitle tag="p" className="small" style={{ color: 'black' }}>Pencapaian IKU2</CardSubtitle>
                  <CardText></CardText>
                  <div>
                      <NavLink to="/rekapiku1">
                          <Button color="light-success">Selengkapnya</Button>
                      </NavLink>
                  </div>
              </Card>
          </Col>

          <Col md="6" lg="12">
          <Card body className="text-center" color="light-warning">
            <CardTitle tag="h5"> <p style={{ marginLeft: '50 px' }}>{totalDataMahasiswaAktif}</p></CardTitle>
            <CardSubtitle tag="p" className="small" style={{ color: 'black' }}>Jumlah Mahasiswa Aktif</CardSubtitle>
            <CardText></CardText>
            <div>
            <NavLink to="/mahasiswaaktif">
              <Button color="warning">Selengkapnya</Button>
              </NavLink>
            </div>
          </Card>
        </Col>


        <Col md="6" lg="4">
          <Card body className="text-center"  >
            <CardTitle tag="h5"> <p style={{ marginLeft: '50 px' }} >{totalDataKegiatan} ({persentaseKegiatan}) </p></CardTitle>
            <CardSubtitle tag="p" className="small" style={{ color: 'black' }}>Jumlah Mahasiswa Berkegiatan di Luar Program Studi</CardSubtitle>
            <CardText></CardText>
            <div>
            <NavLink to="/iku2kegiatanlist">
              <Button color="light-danger">Selengkapnya</Button>
              </NavLink>
            </div>
          </Card>
        </Col>

        <Col md="6" lg="4">
        <Card body className="text-center" color="light-success" >
          <CardTitle tag="h5"><p style={{ marginLeft: '50 px' }}>{totalDataPertukaranPelajar} ({persentasePertukaranPelajar})</p></CardTitle>
          <CardSubtitle tag="p" className="small" style={{ color: 'black' }}>Jumlah Mahasiswa Inbound yang Diterima Pertukaran Pelajar</CardSubtitle>
            <CardText >
            </CardText>
         <div>
            <NavLink to="/iku2inboundlist">
              <Button color="success">Selengkapnya</Button>
             </NavLink>
        </div>
        </Card>
        </Col>

        <Col md="6" lg="4">
          <Card body className="text-center" color="light-danger">
            <CardTitle tag="h5"> <p style={{ marginLeft: '50 px' }}>{totalDataPrestasi} ({persentasePrestasi})</p></CardTitle>
            <CardSubtitle tag="p" className="small" style={{ color: 'black' }}>Jumlah Mahasiswa Berprestasi Tingkat Provinsi, Nasional, dan Internasional</CardSubtitle>
            <CardText></CardText>
            <div>
            <NavLink to="/iku2prestasilist">
              <Button color="danger">Selengkapnya</Button>
              </NavLink>
            </div>
          </Card>
        </Col>
        
        </Row>
        
        </Row>
        
    </div>
  );
};

export default Iku2;
