import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { getRoles } from '../../service/UsersApi/RolApi';
import { createUser, getUserr, updateUserr } from '../../service/UsersApi/UserApi';
import Swal from 'sweetalert2';
import UserIdVerify from '../../scripts/UserIdVerify';

function UserAdd() {
    const [role, setRole] = useState([]);
    const [isEditing, setIsEditing] = useState(localStorage.getItem("id") ? true : false);
    const [idE, setIdE] = useState(0);
    const [showPassword, setShowPassword] = useState(localStorage.getItem("id") ? false : true);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const confirm = await Swal.fire({
            title: '¿Deseas continuar?',
            text: isEditing ? 'Se actualizará el usuario' : 'Se creará un nuevo usuario',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#007bff',
            cancelButtonColor: '#dc3545',
            confirmButtonText: 'Si',
            cancelButtonText: 'No'
        }).then(async (result) => {
            return result.isConfirmed;
        });

        if (confirm) {
            const form = event.target;
            const userId = form.userId.value;
            const name = form.name.value;
            const lastName = form.lastName.value;
            const rol = form.rol.value;
            const phone = form.phone.value;
            const career = form.career.value;
            const password = form.password ? form.password.value : null;
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
                } else {
                    newUser.id = idE;
                    const response = await updateUserr(newUser);
                    console.log(response);
                }
            } catch (error) {
                console.error(error);
            }
    
            window.location.href = !isEditing ? "/users?success" : "/users?editSuccess"; 
        }
    };

    const getRole = async () => {
        const res = await getRoles();
        if (res) {
            setRole(res);
            if (localStorage.getItem("id")) {
                setForm(localStorage.getItem("id"), res);
                setIsEditing(true);
                setIdE(localStorage.getItem("id"));
            }
        } else {
            setRole([]);
        }
    }

    const veridyId = () => {
        const userId = document.getElementById("userId").value;
        if (!UserIdVerify(userId)) {
            document.getElementById("userId").value = userId.slice(0, -1);
        }
    }

    const changePassword = () => {
        setShowPassword(!showPassword);
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
        <div className='container pt-5 col-6'>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-4" controlId="userId">
                    <Form.Label>Cédula</Form.Label>
                    <Form.Control type="text" placeholder="123456789" maxLength={9} minLength={9} onChange={veridyId} required />
                </Form.Group>

                <Form.Group className="mb-4" controlId="name">
                    <Form.Label>Nombre</Form.Label>
                    <Form.Control type="text" placeholder="Nombre" required />
                </Form.Group>

                <Form.Group className="mb-4" controlId="lastName">
                    <Form.Label>Apellido</Form.Label>
                    <Form.Control type="text" placeholder="Apellido" required />
                </Form.Group>

                <Form.Group className="mb-4" controlId="rol">
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

                <Form.Group className="mb-4" controlId="phone">
                    <Form.Label>Teléfono</Form.Label>
                    <Form.Control type="text" placeholder="Teléfono" required />
                </Form.Group>

                <Form.Group className="mb-4" controlId="career">
                    <Form.Label>Carrera</Form.Label>
                    <Form.Control type="text" placeholder="Carrera" required />
                </Form.Group>

                <Form.Group className="mb-4" controlId="password">
                    <Form.Label>Contraseña: </Form.Label>
                    {
                        showPassword ?
                            <>
                                <Form.Control type="text" placeholder="Contraseña" required />
                                {isEditing ? <Button variant="primary" onClick={changePassword}>Cancelar</Button> : null}
                            </>
                            :
                            <div>
                                <Button variant="primary" onClick={changePassword}>Cambiar Contraseña</Button>
                            </div>
                    }
                </Form.Group>

                <Form.Group className="mb-4" controlId="category">
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