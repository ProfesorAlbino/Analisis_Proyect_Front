import React from 'react';
import { Link } from 'react-router-dom';
import { register } from '../../service/UsersApi/LoginApi';
import { Toaster, toast } from "sonner";

import '../../css/LoginCss/Login.css';

const Register = () => {

    const onSubmit = (event) => {
        event.preventDefault();

        const user = {
            userId: event.target[0].value,
            password: event.target[1].value
        }


    }

    return (
        <>
            <div className="login-box">
                <form onSubmit={onSubmit}>
                    <div className="user-box">
                        <input type="text" required id='userId'/>
                        <label>Cedula</label>
                    </div>
                    <div className="user-box">
                        <input type="password" required id='userPass' />
                        <label>Contraseña</label>
                    </div><center>
                        <button type='submit' className='btn'>
                            Registrarse
                            <span></span>
                        </button></center>
                </form>
                <br></br>
                <Link type="button" className="btn btn-outline-primary ms-4" to="/register">Iniciar Sesión</Link>
            </div>
            <Toaster richColors />
        </>
    );
};

export default Register;
