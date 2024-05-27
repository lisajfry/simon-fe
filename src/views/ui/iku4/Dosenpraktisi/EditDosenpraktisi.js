import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';

const EditDosenpraktisi = () => {
    const [NIDN_praktisi, setNIDN_praktisi] = useState('');
    const [nama_dosen_praktisi, setNamaDosenpraktisi] = useState('');
    const navigate = useNavigate();
    

    useEffect(() => {
        const fetchDosenpraktisi = async () => {
            if (!NIDN_praktisi) return; // Pemeriksaan untuk iku1_id
            const response = await axios.get('http://localhost:8080/dosenpraktisi/${NIDN_praktisi}');
            const dosenpraktisi = response.data;
            setNIDN_praktisi(dosenpraktisi.NIDN_praktisi);
            setNamaDosenpraktisi(dosenpraktisi.nama_dosen_praktisi);
        }
        fetchDosenpraktisi();
    }, [NIDN_praktisi]);

    const saveDosenpraktisi = async (e) => {
        e.preventDefault();
        if (!NIDN_praktisi) return; // Pemeriksaan untuk iku1_id
        await axios.put('http://localhost:8080/update/dosenpraktisi/${NIDN_praktisi}', {
            NIDN_praktisi: NIDN_praktisi,
            nama_dosen_praktisi: nama_dosen_praktisi,
        });
        navigate('/dosenpraktisilist');
    }

    return (
        <div>
            <h2>Edit Data</h2>
            <form onSubmit={saveDosenpraktisi}>
                <div className="field">
                    <label className="label">NIDN</label>
                    <input
                        type="text"
                        className="input"
                        value={NIDN_praktisi}
                        onChange={(e) => setNIDN_praktisi(e.target.value)}
                        placeholder="NIDN" />
                </div>
                <div className="field">
                    <label className="label">Nama Dosen</label>
                    <input
                        type="text"
                        className="input"
                        value={nama_dosen_praktisi}
                        onChange={(e) => setNamaDosenpraktisi(e.target.value)}
                        placeholder="Nama Dosen" />
                </div>
                <div className="field">
                    <button type="submit" className="button is-primary">Simpan</button>
                </div>
            </form>
        </div>
    )
}

export default EditDosenpraktisi;