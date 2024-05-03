import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';

const EditLulusan = () => {
    const [no_ijazah, setNoIjazah] = useState('');
    const [nama_alumni, setNamaAlumni] = useState('');
    const navigate = useNavigate();
   

    useEffect(() => {
        const fetchLulusan = async () => {
            if (!no_ijazah) return; // Pemeriksaan untuk iku1_id
            const response = await axios.get(`http://localhost:8080/lulusan/${no_ijazah}`);
            const lulusan = response.data;
            setNamaAlumni(lulusan.nama_alumni);
            setNoIjazah(lulusan.no_ijazah);
            
        
        }
        fetchLulusan();
    }, [no_ijazah]);

    const saveLulusan = async (e) => {
        e.preventDefault();
        if (!no_ijazah) return; // Pemeriksaan untuk iku1_id
        await axios.put(`http://localhost:8080/update/lulusan/${no_ijazah}`, {
            nama_alumni: nama_alumni,
            no_ijazah: no_ijazah,
    
        });
        navigate('/lulusanlist');
    }

    return (
        <div>
            <h2>Edit Data</h2>
            <form onSubmit={saveLulusan}>
                <div className="field">
                    <label className="label">No Ijazah</label>
                    <input
                        type="text"
                        className="input"
                        value={no_ijazah}
                        onChange={(e) => setNoIjazah(e.target.value)}
                        placeholder="No Ijazah" />
                </div>
                <div className="field">
                    <label className="label">Nama Alumni</label>
                    <input
                        type="text"
                        className="input"
                        value={nama_alumni}
                        onChange={(e) => setNamaAlumni(e.target.value)}
                        placeholder="Nama Alumni" />
                </div>
            
               
                <div className="field">
                    <button type="submit" className="button is-primary">Simpan</button>
                </div>
            </form>
        </div>
    )
}

export default EditLulusan;
