import React, { useState, useEffect } from 'react';
import { Button, Col, Form, OverlayTrigger, Row, Table, Tooltip } from 'react-bootstrap';
import { getUserrs, deleteUserr } from '../../service/UsersApi/UserApi';
import { FaRegEdit, FaTrashAlt } from 'react-icons/fa';
import { Toaster, toast } from "sonner";
import Swal from 'sweetalert2';
import { FormatterDate } from '../../scripts/FormatterDate';

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
        validations();
    }, []);

    function validations() {
        if (localStorage.getItem("id")) {
            localStorage.removeItem("id");
        }
        if (window.location.search.includes("success")) {
            window.history.replaceState({}, document.title, "/users");
            toast.success("Usuario creado exitosamente");
        } else if (window.location.search.includes("editSuccess")) {
            window.history.replaceState({}, document.title, "/users");
            toast.success("Usuario editado exitosamente");
        }
    }

    function deleteUser(id) {
        Swal.fire({
            title: '¿Deseas continuar?',
            text: 'Se eliminará el usuario',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#007bff',
            cancelButtonColor: '#dc3545',
            confirmButtonText: 'Si',
            cancelButtonText: 'No'
        }).then(async (result) => {
            if (result.isConfirmed) {
                deleteUserr(id).then((res) => {
                    getUsers();
                    toast.success("Eliminado exitosamente");
                }).catch((err) => {
                    console.log(err);
                    toast.error("Error al eliminar");
                });
                setTimeout(() => {
                    window.location.reload();
                }, 1000);

            }
        });
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
        <div className='container pt-3'>
            <div className="row">
                <Form inline>
                    <Row>
                        <Col xs="auto">
                            <Form.Control
                                type="text"
                                placeholder="Nombre o apellido"
                                className=" mr-sm-2"
                            />
                        </Col>
                        <Col xs="auto">
                            <Button type="submit">Buscar</Button>
                        </Col>
                    </Row>
                </Form>
            </div>
            <h1>Usuarios</h1>
            <Button variant="primary" href="/users/create">Crear usuario</Button>
            <Table className='border shadow mt-2'>
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
                        users.filter(user => !user.deleted).sort((a, b) => {
                            return a.name === b.name ? a.lastName.localeCompare(b.lastName) : a.name.localeCompare(b.name);
                        }).map((user, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{user.userId}</td>
                                <td>{user.name}</td>
                                <td>{user.lastName}</td>
                                <td>{user.category}</td>
                                <td>{user.role}</td>
                                <td>{user.phone}</td>
                                <td>{user.career}</td>
                                <td>{FormatterDate(user.creationDate)}</td>
                                <td>
                                    <OverlayTrigger placement="top" overlay={<Tooltip>Eliminar</Tooltip>}>
                                        <Button variant="danger" onClick={() => deleteUser(user.id)}><FaTrashAlt /></Button>
                                    </OverlayTrigger>
                                    <OverlayTrigger placement="top" overlay={<Tooltip>Editar</Tooltip>}>
                                        <Button variant="primary" onClick={() => editUser(user.id)}><FaRegEdit /></Button>
                                    </OverlayTrigger>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </Table >
            <Toaster richColors />
        </div>
    );
}

export default User;
