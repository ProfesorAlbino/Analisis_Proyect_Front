import React from 'react';

import '../../css/LoginCss/Login.css';

function Login() {

    return (
        <div class="login-box">
            <form>
                <div class="user-box">
                    <input type="text" name="" required="" />
                    <label>Username</label>
                </div>
                <div class="user-box">
                    <input type="password" name="" required="" />
                    <label>Password</label>
                </div><center>
                    <a href="#">
                        SEND
                        <span></span>
                    </a></center>
            </form>
        </div>
    );
}

export default Login;


