import React from 'react';
import { Link } from 'react-router-dom';
import { register } from '../../service/UsersApi/LoginApi';
import { Toaster, toast } from "sonner";
import UserIdVerify from '../../scripts/UserIdVerify.js';
import ErrorMessages from '../../enums/ErrorMessages.js';
import SuccessMessages from '../../enums/SuccessMessages.js';

import '../../css/LoginCss/Login.css';

const Register = () => {

    const onSubmit = (event) => {
        event.preventDefault();

        if (event.target[5].value !== event.target[6].value) {
            return toast.error(ErrorMessages.PASSWORDS_NOT_MATCH);
        }

        const user = {
            userId: event.target[0].value,
            userName: event.target[1].value,
            userLastName: event.target[2].value,
            userPhone: event.target[3].value,
            userCareer: event.target[4].value,
            userPass: event.target[5].value,
        }

        if (user.userId.length !== 9 || user.userId === '' || user.userName === '' || user.userLastName === '' || user.userPhone === '' || user.userCareer === '' || user.userPass === '') {
            return toast.error(ErrorMessages.INVALID_DATA);
        }


        if (user) {
            register(user).then((response) => {
                if (response) {
                    toast.success(SuccessMessages.CREATED);
                    setTimeout(() => {
                        window.location.href = '/login';
                    }, 1000);
                } else {
                    toast.error(ErrorMessages.USER_CREATION_ERROR);
                }
            }).catch((error) => {
                toast.error(error.response.data && error.response.data === ErrorMessages.USER_EXISTING ? error.response.data : ErrorMessages.REGISTRATION_ERROR);
            });
        }

    }

    const onchange = (e) => {
        if (!UserIdVerify(e.target.value)) {
            e.target.value = e.target.value.slice(0, -1);
        }
    };

    return (
        <>
            <div className="login-box">
                <form onSubmit={onSubmit}>
                    <div className="user-box">
                        <input type="text" required id='userId' onChange={onchange} maxLength={9} minLength={9} />
                        <label>Cedula</label>
                    </div>
                    <div className="user-box">
                        <input type="text" required id='userName' />
                        <label>Nombre</label>
                    </div>
                    <div className="user-box">
                        <input type="text" required id='userLastName' />
                        <label>Apellido</label>
                    </div>
                    <div className="user-box">
                        <input type="number" required id='userPhone' />
                        <label>Telefono</label>
                    </div>
                    <div className="user-box form-control mb-3" style={{ backgroundColor: "#16c1f3" }}>
                        <select required id='userCareer' className='form-select' style={{ backgroundColor: "#16c1f3", color: "white" }}>
                            <option value="">Carrera</option>
                            <option value="Inform&aacute;tica Empresarial">Inform&aacute;tica Empresarial</option>
                            <option value="Econom&iacute;a agr&iacute;cola">Econom&iacute;a agr&iacute;cola</option>
                            <option value="Ense&ntilde;anza del ingles">Ense&ntilde;anza del ingles</option>
                            <option value="Ense&ntilde;anza de la matem&aacute;tica">Ense&ntilde;anza de la matem&aacute;tica</option>
                            <option value="Contadur&iacute;a p&uacute;blica">Contadur&iacute;a p&uacute;blica</option>
                        </select>
                    </div>
                    <div className="user-box">
                        <input type="password" required id='userPass' />
                        <label>Contraseña</label>
                    </div>
                    <div className="user-box">
                        <input type="password" required id='userPassCheck' />
                        <label>Confirmar contraseña</label>
                    </div>
                    <center>
                        <button type='submit' className='btn'>
                            Registrarse
                            <span></span>
                        </button>
                    </center>
                </form>
                <br></br>
                <Link type="button" className="btn btn-outline-warning " to="/login">Iniciar Sesión</Link>
            </div>
            <Toaster richColors />
        </>
    );
};

export default Register;
