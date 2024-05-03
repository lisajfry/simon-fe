import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';

const EditUser = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const navigate = useNavigate();
    const { id_user } = useParams();

    useEffect(() => {
        const fetchUser = async () => {
            if (!id_user) return; // Pemeriksaan untuk iku1_id
            const response = await axios.get(`http://localhost:8080/user/${id_user}`);
            const user = response.data;
            setEmail(user.email);
            setPassword(user.password);
            setRole(user.role);
        }
        fetchUser();
    }, [id_user]);

    const saveUser = async (e) => {
        e.preventDefault();
        if (!id_user) return; // Pemeriksaan untuk iku1_id
        await axios.put(`http://localhost:8080/update/user/${id_user}`, {
            email: email,
            password: password,
            role: role,
        });
        navigate('/userlist');
    }

    return (
        <div>
            <h2>Edit Data</h2>
            <form onSubmit={saveUser}>
                <div className="field">
                    <label className="label">Email</label>
                    <input
                        type="text"
                        className="input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="email" />
                </div>
                <div className="field">
                    <label className="label">Password</label>
                    <input
                        type="text"
                        className="input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="password" />
                </div>
                <div className="field">
                    <label className="label">Role</label>
                    <select
                        className="select"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    >
                        <option value=""></option>
                        <option value="admin">Admin</option>
                        <option value="mahasiswa">Mahasiswa</option>
                        <option value="dosen">Dosen</option>
                    </select>
                </div>
                <div className="field">
                    <button type="submit" className="button is-primary">Simpan</button>
                </div>
            </form>
        </div>
    )
}

export default EditUser;
