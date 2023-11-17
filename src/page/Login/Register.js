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
                        <input type="text" name="" required="" />
                        <label>Cedula</label>
                    </div>
                    <div className="user-box">
                        <input type="password" name="" required="" />
                        <label>Contraseña</label>
                    </div><center>
                        <button type='submit' className='btn'>
                            Iniciar Sesión
                            <span></span>
                        </button></center>
                </form>
                <br></br>
                <Link type="button" className="btn btn-outline-primary ms-4" to="/register">Registrarse</Link>
            </div>
            <Toaster richColors />
        </>
    );
};

export default Register;
