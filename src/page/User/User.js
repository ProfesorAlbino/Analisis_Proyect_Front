import React, { useState, useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import { getUserrs, deleteUserr } from '../../service/UsersApi/UserApi';

function User() {

    const [users, setUsers] = useState([]);

    const getUsers = async () => {
        const res = await getUserrs();
        if (res) {
            setUsers(res);
        }
    }

    useEffect(() => {
        getUsers();
    }, []);

    function deleteUser(id) {
        deleteUserr(id);
        getUsers();
        window.location.reload();
    }

    function editUser(id) {
        localStorage.setItem("id", id);
        window.location.href = "/users/create/";
    }

    function formatDate(isoDate) {
        const date = new Date(isoDate);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear().toString();
        return `${day}-${month}-${year}`;
    }

    return (
        <div className='container pt-5 mb-5'>
            <Button variant="primary" href="/users/create">Crear usuario</Button>
            <Table >
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Cedula</th>
                        <th>Nombre</th>
                        <th>Apellido</th>
                        <th>Categoría</th>
                        <th>Rol</th>
                        <th>Telefono</th>
                        <th>Carrera</th>
                        <th>Fecha de creación</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.filter(user => !user.deleted).map((user, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{user.userId}</td>
                                <td>{user.name}</td>
                                <td>{user.lastName}</td>
                                <td>{user.category}</td>
                                <td>{user.role}</td>
                                <td>{user.phone}</td>
                                <td>{user.career}</td>
                                <td>{formatDate(user.creationDate)}</td>
                                <td>
                                    <Button variant="primary" onClick={() => editUser(user.id)}>Editar</Button>
                                    <Button variant="danger" onClick={() => deleteUser(user.id)}>Eliminar</Button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table >
        </div>
    );
}

export default User;
