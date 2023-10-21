import React, { useState, useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import { getUserrs, deleteUserr } from '../../service/Api';

function User() {

    const [users, setUsers] = useState([]);

    const getUsers = async () => {
        const res = await getUserrs();
        setUsers(res);
        console.log(res);
    }

    useEffect(() => {
        getUsers();
    }, []);

    function deleteUser(id) {
        console.log(id);
        deleteUserr(id);
    }

    function editUser(id) {
        console.log(id);
    }

    return (
        <div className='container pt-5'>
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
                                <td>{user.creationDate}</td>
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
