import axios from 'axios';
const urlApi = 'https://localhost:7210/api/Loans/';

export async function createLoan(data) {
    console.log(urlApi);
    try {
        const response = await axios.post(urlApi + "create", data);
        return response.data;
    } catch (error) {
        console.error('Error al obtener los datos:', error);
        throw error;
    }
}

export async function getLoans() {
    try {
        const response = await axios.get(urlApi + 'getAll');
        return response.data;
    } catch (error) {
        console.error('Error al obtener los datos:', error);
        throw error;
    }
}

export async function getLoanById(id) {
    try {
        const response = await axios.get(urlApi + 'getById/' + id);
        return response.data;
    } catch (error) {
        console.error('Error al obtener los datos:', error);
        throw error;
    }
}

export async function updateLoan(data) {
    try {
        const response = await axios.put(urlApi + 'update', data);
        return response.data;
    } catch (error) {
        console.error('Error al modificar los datos:', error);
        throw error;
    }
}

export async function deleteLoan(id) {
    try {
        const response = await axios.delete(urlApi + 'delete/' + id);
        return response.data;
    } catch (error) {
        console.error('Error al modificar los datos:', error);
        throw error;
    }
}
