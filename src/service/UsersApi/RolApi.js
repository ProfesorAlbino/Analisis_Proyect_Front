import axios from 'axios';

const url = 'https://localhost:7210/api/Roles/';

export async function getRoles() {
    try {
        const response = await axios.get(url + 'getAll/');
        return response.data; // Devuelve el contenido JSON de la respuesta
    } catch (error) {
        console.error('Error al obtener los datos:', error);
        return null; // Puedes manejar el error aquí o lanzarlo para que se maneje en otro lugar.
    }
}