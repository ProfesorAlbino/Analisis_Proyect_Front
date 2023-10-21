import axios from 'axios';

const url = 'https://localhost:7210/api/';

export async function getUserrs() {
    try {
        const response = await axios.get(url + 'Userrs/getAll/');
        //console.log(response.data);
        return response.data; // Devuelve el contenido JSON de la respuesta
    } catch (error) {
        console.error('Error al obtener los datos:', error);
        throw error; // Puedes manejar el error aquí o lanzarlo para que se maneje en otro lugar.
    }
}

export async function getUserr(id) {
    try {
        const response = await axios.get(url + 'Userrs/get/' + id);
        //console.log(response.data);
        return response.data; // Devuelve el contenido JSON de la respuesta
    } catch (error) {
        console.error('Error al obtener los datos:', error);
        throw error; // Puedes manejar el error aquí o lanzarlo para que se maneje en otro lugar.
    }
}

export async function createUserr(data) {
    try {
        const response = await axios.post(url + 'Userrs/create/', data);
        //console.log(response.data);
        return response.data; // Devuelve el contenido JSON de la respuesta
    } catch (error) {
        console.error('Error al crear el usuario:', error);
        throw error; // Puedes manejar el error aquí o lanzarlo para que se maneje en otro lugar.
    }
}

export async function updateUserr(data) {
    try {
        const response = await axios.put(url + 'Userrs/update/', data);
        //console.log(response.data);
        return response.data; // Devuelve el contenido JSON de la respuesta
    } catch (error) {
        console.error('Error al actualizar el usuario:', error);
        throw error; // Puedes manejar el error aquí o lanzarlo para que se maneje en otro lugar.
    }
}

export async function deleteUserr(id) {
    try {
        const response = await axios.delete(url + 'Userrs/deleteUser/' + id);
        console.log(response.data);
        return response.data; // Devuelve el contenido JSON de la respuesta
    } catch (error) {
        console.error('Error al eliminar el usuario:', error);
        throw error; // Puedes manejar el error aquí o lanzarlo para que se maneje en otro lugar.
    }
}