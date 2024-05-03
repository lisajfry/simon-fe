import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';

const EditMahasiswa = () => {
    const [nama_mahasiswa, setNamaMahasiswa] = useState('');
    const [angkatan, setAngkatan] = useState('');
    const navigate = useNavigate();
    const { NIM } = useParams();

    useEffect(() => {
        const fetchMahasiswa = async () => {
            if (!NIM) return; // Pemeriksaan untuk iku1_id
            const response = await axios.get(`http://localhost:8080/mahasiswa/${NIM}`);
            const mahasiswa = response.data;
            setNamaMahasiswa(mahasiswa.nama_mahasiswa);
            setAngkatan(mahasiswa.angkatan);
        }
        fetchMahasiswa();
    }, [NIM]);

    const saveMahasiswa = async (e) => {
        e.preventDefault();
        if (!NIM) return; // Pemeriksaan untuk iku1_id
        await axios.put(`http://localhost:8080/update/mahasiswa/${NIM}`, {
            NIM: NIM,
            nama_mahasiswa: nama_mahasiswa,
            angkatan: angkatan,
        });
        navigate('/mahasiswalist');
    }

    return (
        <div>
            <h2>Edit Data</h2>
            <form onSubmit={saveMahasiswa}>
                <div className="field">
                    <label className="label">NIM</label>
                    <input
                        type="text"
                        className="input"
                        value={NIM}
                        
                        placeholder="NIM" />
                </div>
                <div className="field">
                    <label className="label">Nama Mahasiswa</label>
                    <input
                        type="text"
                        className="input"
                        value={nama_mahasiswa}
                        onChange={(e) => setNamaMahasiswa(e.target.value)}
                        placeholder="Nama Mahasiswa" />
                </div>
                <div className="form-group">
                  <label htmlFor="angkatan">Angkatan</label>
                  <select
                    className="form-control"
                    id="angkatan"
                    value={angkatan}
                    onChange={(e) => setAngkatan(e.target.value)}
                  >
                    <option value="">Pilih Angkatan</option>
                    <option value="2021">2021</option>
                    <option value="2022">2022</option>
                    <option value="2023">2023</option>
                  </select>
                </div>
                <div className="field">
                    <button type="submit" className="button is-primary">Simpan</button>
                </div>
            </form>
        </div>
    )
}

export default EditMahasiswa;
