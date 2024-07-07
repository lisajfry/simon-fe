import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from 'react-router-dom';
import { Table } from 'reactstrap';
import {
    Card,
    CardBody,
    CardTitle,
    Button,
    Row,
    Col,
  } from "reactstrap";

const UserList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        const response = await axios.get("http://localhost:8080/user");
        setUsers(response.data);
    }

    const deleteUser = async (id) => {
        const confirmDelete = window.confirm("Apakah Anda yakin ingin menghapus pengguna?");
        if (confirmDelete) {
          await axios.delete(`http://localhost:8080/delete/user/${id}`);
          getUsers();
        }
    }

    return (
        <Row>
        <Col>
        <div className="mb-3">
                <Link to="/adduser">
                <Button color="primary" size="sm">Input</Button>
                </Link>
            </div>
                <Card>
                    
        <div style={{textAlign: 'center'}}>
    <CardTitle>TABEL USER</CardTitle>
</div>

    <CardBody className="">
        <Table bordered striped>
            <thead>
                <tr>
                    <th>No</th>
                    <th>Email</th>
                    <th>Password</th>
                    <th>Role</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user, index) => (
                    <tr key={user.id_user}>
                        <td>{index + 1}</td>
                        <td>{user.email}</td>
                        <td>{user.password}</td>
                        <td>{user.role}</td>
                        <td>
                            <Link to={`/update/user/${user.id_user}`}>
                                <Button className="btn" outline color="info">Edit</Button>
                            </Link>
                            <Button className="btn" outline color="danger" onClick={() => deleteUser(user.id_user)}>Delete</Button>

                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
        </CardBody>
        </Card>
        </Col>
        </Row>
    );
}

export default UserList;
