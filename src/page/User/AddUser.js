import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import { getRoles } from '../../service/UsersApi/RolApi';
import { createUser, getUserr, updateUserr } from '../../service/UsersApi/UserApi';
import Swal from 'sweetalert2';
import UserIdVerify from '../../scripts/UserIdVerify';
import { Toaster, toast } from "sonner";

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

            console.log(newUser);

            try {
                if (!isEditing) {
                    const response = await createUser(newUser);
                    console.log(response);
                } else {
                    newUser.id = idE;
                    const response = await updateUserr(newUser).catch((err) => {
                        console.log(err);
                    });
                    console.log(response);
                }
                window.location.href = !isEditing ? "/users?success" : "/users?editSuccess";
            } catch (error) {
                console.error(error);
                toast.error(error.response.data === 'Usuario exitente' ? 'Usuario existente' : 'Error al crear usuario');
            }

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

    return (<>
        <form onSubmit={handleSubmit}>
            <h2 className="text-center">Registrar Usuario</h2>
            <div className="container py-4">
                <div className='row' >
                    {/* CEDULA */}
                    <div className="mb-4 form-floating col-lg-4 col-md-4 col-sm-6 col-xs-12">
                        <input type="text"
                            className="form-control border border-primary"
                            id='userId'
                            maxLength={9}
                            minLength={9}
                            required
                            onChange={veridyId} />
                        <label className='ms-2 '>Cédula</label>
                    </div>
                    {/* NOMBRE */}
                    <div className="mb-4 form-floating col-lg-4 col-md-4 col-sm-6 col-xs-12">
                        <input type="text"
                            className="form-control border border-primary"
                            id='name'
                            required />
                        <label className='ms-2 '>Nombre</label>
                    </div>
                    {/* APELLIDO */}
                    <div className="mb-4 form-floating col-lg-4 col-md-4 col-sm-6 col-xs-12">
                        <input type="text"
                            className="form-control border border-primary"
                            id='lastName'
                            required />
                        <label className='ms-2 '>Apellido</label>
                    </div>
                    {/* ROL */}
                    <div className="mb-4 form-floating col-lg-4 col-md-4 col-sm-6 col-xs-12">
                        <select className="form-select border border-primary"
                            id='rol'
                            required >
                            <option>Seleccione</option>
                            {
                                role.map((rol, index) => (
                                    <option key={index} value={rol.id}>{rol.name}</option>
                                ))
                            }
                        </select>
                        <label className='ms-2 '>Rol</label>
                    </div>
                    {/* TELEFONO */}
                    <div className="mb-4 form-floating col-lg-4 col-md-4 col-sm-6 col-xs-12">
                        <input type="text"
                            className="form-control border border-primary"
                            id='phone'
                            required />
                        <label className='ms-2 '>Teléfono</label>
                    </div>
                    {/* CARRERA */}
                    <div className="mb-4 form-floating col-lg-4 col-md-4 col-sm-6 col-xs-12">
                        <input type="text" className="form-control border border-primary" id='career' required />
                        <label className='ms-2 '>Carrera</label>
                    </div>
                    {/* CONTRASEÑA */}
                    <div className="mb-4 form-floating col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        {
                            showPassword ?
                                <>
                                    <input type="text" className="form-control border border-primary" id='password' required />
                                    {isEditing ? <Button variant="primary" onClick={changePassword}>Cancelar</Button> : null}
                                </>
                                :
                                <div>
                                    <Button variant="primary" onClick={changePassword}>Cambiar Contraseña</Button>
                                </div>
                        }
                        <label className='ms-2 '>Contraseña</label>
                    </div>
                    {/* CATEGORIA */}
                    <div className="mb-4 form-floating col-lg-6 col-md-6 col-sm-6 col-xs-12">
                        <select className="form-select border border-primary" id='category' required >
                            <option>Seleccione</option>
                            <option value="Estudiante">Estudiante</option>
                            <option value="Administrativo">Administrativo</option>
                            <option value="Profesor">Profesor</option>
                        </select>
                        <label className='ms-2 '>Categoría</label>
                    </div>
                    {/* BOTON */}
                    <div className="mb-4 form-floating col-lg-4 col-md-4 col-sm-6 col-xs-12">
                        <Button variant="primary" type="submit">
                            {isEditing ? 'Actualizar' : 'Crear'}
                        </Button>
                    </div>
                </div>
            </div>
        </form>
        <Toaster richColors />
    </>)
}

export default UserAdd;

{/* <div className='container pt-5 col-6'>
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

    </div> */}