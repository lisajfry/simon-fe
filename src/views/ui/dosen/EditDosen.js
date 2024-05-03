import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';

const EditDosen = () => {
    const [NIDN, setNIDN] = useState('');
    const [nama_dosen, setNamaDosen] = useState('');
    const navigate = useNavigate();
    

    useEffect(() => {
        const fetchDosen = async () => {
            if (!NIDN) return; // Pemeriksaan untuk iku1_id
            const response = await axios.get(`http://localhost:8080/dosen/${NIDN}`);
            const dosen = response.data;
            setNIDN(dosen.NIDN);
            setNamaDosen(dosen.nama_dosen);
        }
        fetchDosen();
    }, [NIDN]);

    const saveDosen = async (e) => {
        e.preventDefault();
        if (!NIDN) return; // Pemeriksaan untuk iku1_id
        await axios.put(`http://localhost:8080/update/dosen/${NIDN}`, {
            NIDN: NIDN,
            nama_dosen: nama_dosen,
        });
        navigate('/dosenlist');
    }

    return (
        <div>
            <h2>Edit Data</h2>
            <form onSubmit={saveDosen}>
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
                <div className="field">
                    <button type="submit" className="button is-primary">Simpan</button>
                </div>
            </form>
        </div>
    )
}

export default EditDosen;
