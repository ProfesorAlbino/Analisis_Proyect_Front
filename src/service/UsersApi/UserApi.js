import axios from 'axios';

const url = 'https://localhost:7210/api/Userrs/';

export async function getUserrs() {
    try {
        const response = await axios.get(url + 'getAll/');
        return response.data;
    } catch (error) {
        console.error('Error al obtener los datos:', error);
        throw error;
    }
}

export async function getUserr(id) {
    try {
        const response = await axios.get(url + 'getUser/' + id);
        return response.data;
    } catch (error) {
        console.error('Error al obtener los datos:', error);
        throw error;
    }
}

export async function createUser(data) {
    try {
        const response = await axios.post(url + 'createUser/', data);
        return response.data;
    } catch (error) {
        console.error('Error al crear el usuario:', error);
        throw error;
    }
}

export async function updateUserr(data) {
    try {
        const response = await axios.put(url + 'updateUser/', data);
        return response.data;
    } catch (error) {
        console.error('Error al actualizar el usuario:', error);
        throw error;
    }
}

export async function deleteUserr(id) {
    try {
        const response = await axios.delete(url + 'deleteUser/' + id);
        return response.data;
    } catch (error) {
        console.error('Error al eliminar el usuario:', error);
        throw error;
    }
}

export async function newLog(data) {
    try {
        const response = await axios.post(url + 'newLog/', data);
        return response.data;
    } catch (error) {
        console.error('Error al crear el log:', error);
        throw error;
    }
}