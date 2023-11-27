import React, { useState, useEffect } from 'react';
import { Button, Col, Form, OverlayTrigger, Row, Table, Tooltip } from 'react-bootstrap';
import { getUserrs, deleteUserr } from '../../service/UsersApi/UserApi';
import { FaRegEdit, FaTrashAlt } from 'react-icons/fa';
import { Toaster, toast } from "sonner";
import Swal from 'sweetalert2';
import { FormatterDate } from '../../scripts/FormatterDate';

import Loader from '../../layout/Loader';

function User() {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState([]);
    const [loading, setLoading] = useState(true);

    const getUsers = async () => {
        const res = await getUserrs();
        setLoading(false);
        if (res) {
            setUsers(res);
            setSearch(res);
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

    async function searchUser() {
        const e = document.getElementById("search").value;
        if (e !== "") {
            setUsers(search.filter(user => user.name.toLowerCase().includes(e.toLowerCase()) || user.lastName.toLowerCase().includes(e.toLowerCase())));
        }
    }

    function isEmptySearch(e) {
        if (e === "") {
            setUsers(search);
        }
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
                                id='search'
                                onChange={(e) => isEmptySearch(e.target.value)}
                            />
                        </Col>
                        <Col xs="auto">
                            <Button type="button" onClick={searchUser}>Buscar</Button>
                        </Col>
                    </Row>
                </Form>
            </div>
            <h1>Usuarios</h1>
            <Button variant="primary" href="/users/create">Crear usuario</Button>
            <Table className='border shadow mt-2 mb-5'>
                {loading ?
                    <>
                        <Loader />
                        <Loader />
                        <Loader />
                    </> :
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
                    </thead>}
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
            <nav aria-label="Page navigation example">
                <ul class="pagination">
                    <li class="page-item"><a class="page-link" href="#">Anterior</a></li>
                    <li class="page-item"><a class="page-link" href="#">Siguiente</a></li>
                </ul>
            </nav>
            <Toaster richColors />
        </div>
    );
}

export default User;
