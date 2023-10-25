import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { getRoles } from '../../service/UsersApi/RolApi';
import { createUser, getUserr, updateUserr } from '../../service/UsersApi/UserApi';

function UserAdd() {
    const [role, setRole] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [idE, setIdE] = useState(0);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.target;
        const userId = form.userId.value;
        const name = form.name.value;
        const lastName = form.lastName.value;
        const rol = form.rol.value;
        const phone = form.phone.value;
        const career = form.career.value;
        const password = form.password.value;
        const category = form.category.value;

        const newUser = {
            userId,
            category,
            roleId: rol,
            phone,
            career,
            password,
            name,
            lastName,
        };

        try {
            if (!isEditing) {
                const response = await createUser(newUser);
                console.log(response);
                alert('Usuario creado exitosamente');
            } else {
                newUser.id = idE;
                const response = await updateUserr(newUser);
                console.log(response);
                alert('Usuario actualizado exitosamente');
            }
        } catch (error) {
            console.error(error);
        }

        window.location.href = "/users";
    };

    const getRole = async () => {
        const res = await getRoles();
        if (res) {
            setRole(res);
            if (localStorage.getItem("id")) {
                setForm(localStorage.getItem("id"), res);
                setIsEditing(true);
                setIdE(localStorage.getItem("id"));
                localStorage.removeItem("id");
            }
        } else {
            setRole([]);
        }
    }

    useEffect(() => {
        getRole();
        // eslint-disable-next-line
    }, []);

    async function setForm(id, roles) {
        const userr = await getUserr(id);
        if (userr) {
            document.getElementById("userId").value = userr.userId;
            document.getElementById("name").value = userr.name;
            document.getElementById("lastName").value = userr.lastName;
            document.getElementById("rol").value = roles.find(rol => rol.name === userr.role).id;
            document.getElementById("phone").value = userr.phone;
            document.getElementById("career").value = userr.career;
            document.getElementById("category").value = userr.category;
        }
    }

    return (
        <div className='container pt-5'>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="userId">
                    <Form.Label>Cédula</Form.Label>
                    <Form.Control type="text" placeholder="123456789" maxLength={9} minLength={9} required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type="text" placeholder="Nombre" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="lastName">
                    <Form.Label>Apellido</Form.Label>
                    <Form.Control type="text" placeholder="Apellido" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="rol">
                    <Form.Label>Rol</Form.Label>
                    <Form.Select aria-label="rol" required >
                        <option>Seleccione</option>
                        {
                            role.map((rol, index) => (
                                <option key={index} value={rol.id}>{rol.name}</option>
                            ))
                        }
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3" controlId="phone">
                    <Form.Label>Teléfono</Form.Label>
                    <Form.Control type="text" placeholder="Teléfono" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="career">
                    <Form.Label>Carrera</Form.Label>
                    <Form.Control type="text" placeholder="Carrera" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control type="password" placeholder="Contraseña" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="category">
                    <Form.Label>Categoría</Form.Label>
                    <Form.Select aria-label="category" required >
                        <option>Seleccione</option>
                        <option value="Estudiante">Estudiante</option>
                        <option value="Administrativo">Administrativo</option>
                        <option value="Profesor">Profesor</option>
                    </Form.Select>
                </Form.Group>

                <Button variant="primary" type="submit">
                    {isEditing ? 'Actualizar' : 'Crear'}
                </Button>
            </Form>
        </div>
    )
}

export default UserAdd