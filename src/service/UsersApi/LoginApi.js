import axios from 'axios';

const url = 'https://localhost:7210/api/Userrs/';

export async function login(user) {
    try {
        const response = await axios.post(url + 'login/', user);
        return response.data;
    } catch (error) {
        throw error;
    }
}


export async function register(userr) {
    try {
        const response = await axios.post(url + 'register/', userr);
        return response.data;
    } catch (error) {
        //console.error('Error al crear el usuario:', error);
        throw error;
    }
}