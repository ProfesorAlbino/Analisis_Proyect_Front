import axios from 'axios';

const url = 'https://localhost:7210/api/Roles/';

export async function getRoles() {
    try {
        const response = await axios.get(url + 'getAll/');
        return response.data; 
    } catch (error) {
        console.error('Error al obtener los datos:', error);
        return null; 
    }
}