import React from 'react';
import { Link } from 'react-router-dom';
import { login } from '../../service/UsersApi/LoginApi';
import { Toaster, toast } from "sonner";

import { encryptAES } from '../../scripts/AES-256';
import ErrorMessages from '../../enums/ErrorMessages';

import '../../css/LoginCss/Login.css';

function Login() {

    const onSubmit = (event) => {
        event.preventDefault();

        const user = {
            userId: event.target[0].value,
            password: event.target[1].value
        }

        login(user).then((response) => {
            if (response) {
                sessionStorage.setItem('user', encryptAES(JSON.stringify(response)));
                window.location.href = '/';
            } else {
                toast.error(ErrorMessages.INVALID_CREDENTIALS);
            }
        }).catch((error) => {
            toast.error(error.request.status === 401 ? ErrorMessages.INVALID_PASSWORD : ErrorMessages.INVALID_CREDENTIALS);
        });
    }

    return (
        <>
            <div className="login-box">
                <form onSubmit={onSubmit} id='loginForm'>
                    <div className="user-box">
                        <input type="text" name="" required id='userId' />
                        <label>Cedula</label>
                    </div>
                    <div className="user-box">
                        <input type="password" name="" required id='userPass' />
                        <label>Contraseña</label>
                    </div><center>
                        <button type='submit' className='btn' id='submit'>
                            Iniciar Sesión
                            <span></span>
                        </button></center>
                </form>
                <br></br>
                <Link type="button" className="btn btn-outline-primary " to="/register">Registrarse</Link>
            </div>
            <Toaster className='toaster' richColors />
        </>
    );
}

export default Login;


