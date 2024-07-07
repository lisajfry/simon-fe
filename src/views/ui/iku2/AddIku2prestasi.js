import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Card, Col, CardTitle } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';

const AddIku2prestasi = () => {
  const [NIM, setNIM] = useState('');
  const [NIDN, setNIDN] = useState('');
  const [tahun, setTahun] = useState('');
  const [nama_kompetisi, setNamaKompetisi] = useState('');
  const [penyelenggara, setPenyelenggara] = useState('');
  const [tingkat_kompetisi, setTingkatKompetisi] = useState('');
  const [prestasi, setPrestasi] = useState('');
  const [countries, setCountries] = useState([]);
  const [provinces, setProvinces] = useState([]);
  const [jmlh_peserta, setJmlhPeserta] = useState('');
  const [jmlh_negara_mengikuti, setJmlhNegaraMengikuti] = useState('');
  const [jmlh_provinsi_mengikuti, setJmlhProvinsiMengikuti] = useState('');
  const [selectedCountries, setSelectedCountries] = useState([]);
  const [selectedProvinces, setSelectedProvinces] = useState([]);
  const [sertifikat, setSertifikat] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch options for univ and provinsi if needed when tingkatKompetisi changes
    if (tingkat_kompetisi) {
      fetchOptions(tingkat_kompetisi);
    }

    // Fetch country data when component mounts
    axios
      .get('https://api.first.org/data/v1/countries')
      .then((response) => {
        const countryData = response.data.data;
        const countryOptions = Object.keys(countryData).map((code) => ({
          value: countryData[code].country,
          label: countryData[code].country,
        }));
        setCountries(countryOptions);
      })
      .catch((error) => console.error('Error fetching country data:', error));

    axios
      .get('https://staggingabsensi.labura.go.id/api-wilayah-indonesia/static/api/provinces.json')
      .then((response) => {
        const provinsiData = response.data;
        const provinsiOptions = provinsiData.map((province) => ({
          value: province.id,
          label: province.name,
        }));
        setProvinces(provinsiOptions);
      })
      .catch((error) => console.error('Error fetching province data:', error));
  }, [tingkat_kompetisi]);

  const fetchOptions = async (tingkat) => {
    try {
      const response = await axios.post('/iku2prestasi/getDataByTingkat', {
        tingkat: tingkat,
      });
      // Handle the response data if needed
    } catch (error) {
      console.error('Error while fetching data:', error);
    }
  };

  const handleTingkatChange = (e) => {
    setTingkatKompetisi(e.target.value);
  };

  const handleCountryChange = (selectedOptions) => {
    setSelectedCountries(selectedOptions);
  };

  const handleProvincesChange = (selectedOptions) => {
    setSelectedProvinces(selectedOptions);
  };

  const handleSertifikatChange = (e) => {
    const file = e.target.files[0];
    setSertifikat(file);
  };

  const saveIku2prestasiData = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('NIM', NIM);
    formData.append('tahun', tahun);
    formData.append('NIDN', NIDN);
    formData.append('tingkat_kompetisi', tingkat_kompetisi);
    formData.append('jmlh_peserta', jmlh_peserta);
    formData.append('prestasi', prestasi);
    if (tingkat_kompetisi === 'internasional') {
      formData.append(
        'countries',
        JSON.stringify(selectedCountries.map((option) => option.value))
      );
      formData.append('jmlh_negara_mengikuti', jmlh_negara_mengikuti);
    } else if (tingkat_kompetisi === 'nasional') {
      formData.append(
        'provinces',
        JSON.stringify(selectedProvinces.map((option) => option.value))
      );
      formData.append('jmlh_provinsi_mengikuti', jmlh_provinsi_mengikuti);
    }
    formData.append('sertifikat', sertifikat);

    // Log the formData object
    console.log("FormData:", formData);

    try {
      await axios.post('http://localhost:8080/add/iku2prestasi', formData);
      navigate('/iku2prestasilist', { replace: true });
    } catch (error) {
      console.error('Error while saving data:', error);
    }
  };

  const handleFocus = (setter) => {
    setter('');
  };



  return (
    <div>
      <Container fluid style={{ maxWidth: '80%' }}>
        <Row>
          <Col xs="12" md="12" sm="12">
            <Card
              style={{
                maxWidth: '80%',
                marginLeft: '-5%',
                padding: '20px',
                marginTop: '20px',
              }}
            >
              <CardTitle>
                <b>FORM INPUT IKU 2 Prestasi</b>
              </CardTitle>
              <form onSubmit={saveIku2prestasiData}>
                <div className="form-group" style={{ marginTop: '20px' }}>
                  <label htmlFor="NIM">Mahasiswa Berprestasi</label>
                  <input
                    type="text"
                    className="form-control"
                    id="NIM"
                    value={NIM}
                    onChange={(e) => setNIM(e.target.value)}
                    placeholder="NIM"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="tahun">Tahun</label>
                  <input
                    type="number"
                    className="form-control"
                    id="tahun"
                    value={tahun}
                    onFocus={() => handleFocus(setTahun)}
                    onChange={(e) => setTahun(e.target.value)}
                    placeholder="Tahun"
                  />
                </div>
                <div className="form-group" style={{ marginTop: '20px' }}>
                  <label htmlFor="NIDN">Dosen Pembimbing</label>
                  <input
                    type="text"
                    className="form-control"
                    id="NIDN"
                    value={NIDN}
                    onChange={(e) => setNIDN(e.target.value)}
                    placeholder="NIDN"
                  />
                </div>
                <div className="form-group" style={{ marginTop: '10px' }}>
                  <label htmlFor="nama_kompetisi">Nama Kompetisi</label>
                  <input
                    type="text"
                    className="form-control"
                    id="nama_kompetisi"
                    value={nama_kompetisi}
                    onChange={(e) => setNamaKompetisi(e.target.value)}
                    placeholder="Nama Kompetisi"
                  />
                </div>
                <div className="form-group" style={{ marginTop: '10px' }}>
                  <label htmlFor="penyelenggara">Penyelenggara</label>
                  <input
                    type="text"
                    className="form-control"
                    id="penyelenggara"
                    value={penyelenggara}
                    onChange={(e) => setPenyelenggara(e.target.value)}
                    placeholder="Penyelenggara"
                  />
                </div>
                <div className="form-group" style={{ marginTop: '10px' }}>
                  <label className="label">Tingkat Kompetisi</label>
                  <select
                    className="form-control"
                    value={tingkat_kompetisi}
                    onChange={handleTingkatChange}
                  >
                    <option value="">Pilih Tingkat Kompetisi</option>
                    <option value="internasional">Internasional</option>
                    <option value="nasional">Nasional</option>
                    <option value="provinsi">Provinsi</option>
                  </select>
                </div>
                <div className="form-group" style={{ marginTop: '10px' }}>
                  <label htmlFor="jmlh_peserta">Jumlah Peserta</label>
                  <input
                    type="text"
                    className="form-control"
                    id="jmlh_peserta"
                    value={jmlh_peserta}
                    onChange={(e) => setJmlhPeserta(e.target.value)}
                    placeholder="Misal 1000 peserta"
                  />
                </div>
                {tingkat_kompetisi === 'internasional' && (
                  <>
                    <div className="form-group" style={{ marginTop: '10px' }}>
                      <label htmlFor="jmlh_negara_mengikuti">
                        Jumlah Negara yang Mengikuti
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="jmlh_negara_mengikuti"
                        value={jmlh_negara_mengikuti}
                        onChange={(e) =>
                          setJmlhNegaraMengikuti(e.target.value)
                        }
                        placeholder="Minimal 2 negara"
                      />
                    </div>
                    <div className="form-group" style={{ marginTop: '10px' }}>
                      <label htmlFor="countries">Negara yang Mengikuti</label>
                      <Select
                        isMulti
                        name="countries"
                        options={countries}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        value={selectedCountries}
                        onChange={handleCountryChange}
                      />
                    </div>
                  </>
                )}
                {tingkat_kompetisi === 'nasional' && (
                  <>
                    <div className="form-group" style={{ marginTop: '10px' }}>
                      <label htmlFor="jmlh_provinsi_mengikuti">
                        Jumlah Provinsi yang Mengikuti
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="jmlh_provinsi_mengikuti"
                        value={jmlh_provinsi_mengikuti}
                        onChange={(e) =>
                          setJmlhProvinsiMengikuti(e.target.value)
                        }
                        placeholder="Minimal 4 provinsi"
                      />
                    </div>
                    <div className="form-group" style={{ marginTop: '10px' }}>
                      <label htmlFor="provinces">Provinsi yang Mengikuti</label>
                      <Select
                        isMulti
                        name="provinces"
                        options={provinces}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        value={selectedProvinces}
                        onChange={handleProvincesChange}
                      />
                    </div>
                  </>
                )}

                {tingkat_kompetisi === 'provinsi' && (
                  <>
                    <div className="form-group" style={{ marginTop: '10px' }}>
                      <label htmlFor="jmlh_provinsi_mengikuti">
                        Jumlah Provinsi yang Mengikuti
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="jmlh_provinsi_mengikuti"
                        value={jmlh_provinsi_mengikuti}
                        onChange={(e) =>
                          setJmlhProvinsiMengikuti(e.target.value)
                        }
                        placeholder="Diikuti antara 1-3 provinsi"
                      />
                    </div>
                    <div className="form-group" style={{ marginTop: '10px' }}>
                      <label htmlFor="provinces">Provinsi yang Mengikuti</label>
                      <Select
                        isMulti
                        name="provinces"
                        options={provinces}
                        className="basic-multi-select"
                        classNamePrefix="select"
                        value={selectedProvinces}
                        onChange={handleProvincesChange}
                      />
                    </div>
                  </>
                )}
                <div className="form-group" style={{ marginTop: '10px' }}>
                  <label className="label">Prestasi</label>
                  <select
                    className="form-control"
                    value={prestasi}
                    onChange={(e) => setPrestasi(e.target.value)}
                  >
                    <option value="">Pilih Prestasi</option>
                    <option value="juara1">Juara 1</option>
                    <option value="juara2">Juara 2</option>
                    <option value="juara3">Juara 3</option>
                    <option value="peserta">Peserta</option>
                  </select>
                </div>
                <div className="form-group" style={{ marginTop: '10px' }}>
                  <label htmlFor="sertifikat">Sertifikat</label>
                  <input
                    type="file"
                    className="form-control"
                    id="sertifikat"
                    onChange={handleSertifikatChange}
                  />
                </div>
                <div className="form-group" style={{ marginTop: '10px' }}>
                  <button type="submit" className="btn btn-primary">
                    Tambahkan
                  </button>
                </div>
              </form>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AddIku2prestasi;

