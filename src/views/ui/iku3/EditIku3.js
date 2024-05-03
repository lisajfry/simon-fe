import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';

const EditIku3 = () => {
    const [NIDN, setNIDN] = useState('');
    const [nama_dosen, setNamaDosen] = useState('');
    const [aktivitas_dosen, setAktivitasDosen] = useState('');
    const navigate = useNavigate();
    const { iku3_id } = useParams();

    useEffect(() => {
        const fetchIku3 = async () => {
            if (!iku3_id) return; // Pemeriksaan untuk iku1_id
            const response = await axios.get(`http://localhost:8080/iku3/${iku3_id}`);
            const iku3 = response.data;
            setNIDN(iku3.NIDN);
            setNamaDosen(iku3.nama_dosen);
            setAktivitasDosen(iku3.aktivitas_dosen);
        }
        fetchIku3();
    }, [iku3_id]);

    const saveIku3 = async (e) => {
        e.preventDefault();
        if (!iku3_id) return; // Pemeriksaan untuk iku1_id
        await axios.put(`http://localhost:8080/update/iku3/${iku3_id}`, {
            NIDN: NIDN,
            nama_dosen: nama_dosen,
            aktivitas_dosen: aktivitas_dosen,
        });
        navigate('/iku3list');
    }

    return (
        <div>
            <h2>Edit Data</h2>
            <form onSubmit={saveIku3}>
                <div className="field">
                    <label className="label">NIDN</label>
                    <input
                        type="text"
                        className="input"
                        value={NIDN}
                        onChange={(e) => setNIDN(e.target.value)}
                        placeholder="NIDN" />
                </div>
                <div className="field">
                    <label className="label">Nama Dosen</label>
                    <input
                        type="text"
                        className="input"
                        value={nama_dosen}
                        onChange={(e) => setNamaDosen(e.target.value)}
                        placeholder="Nama Dosen" />
                </div>
                <div className="form-group">
                  <label htmlFor="aktivitas_dosen">Aktivitas Dosen</label>
                  <select
                    className="form-control"
                    id="aktivitas_dosen"
                    value={aktivitas_dosen}
                    onChange={(e) => setAktivitasDosen(e.target.value)}
                  >
                    <option value="">Pilih Aktivitas</option>
                    <option value="Bertridharma di Kampus Lain" >Bertridharma di Kampus Lain</option>
                    <option value="Memiliki Pengalaman Sebagai Praktisi">Memiliki Pengalaman Sebagai Praktisi</option>
                    <option value="Membimbing Mahasiswa Berprestasi">Membimbing Mahasiswa Berprestasi</option>
                  </select>
                </div>
                
                
                <div className="field">
                    <button type="submit" className="button is-primary">Simpan</button>
                </div>
            </form>
        </div>
    )
}

export default EditIku3;
