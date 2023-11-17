import React from 'react';

import '../../css/LoginCss/Login.css';

function Login() {

    return (
        <div class="login-box">
            <form>
                <div class="user-box">
                    <input type="text" name="" required="" />
                    <label>Carne</label>
                </div>
                <div class="user-box">
                    <input type="password" name="" required="" />
                    <label>Contraseña</label>
                </div><center>
                    <a href="#">
                        Iniciar Sesión
                        <span></span>
                    </a></center>
            </form>
        </div>
    );
}

export default Login;


