import axios from 'axios';

const url = 'https://localhost:7210/api/Areas/';

export async function getAreas() {
    try {
        const response = await axios.get(url + 'getAll/');
        return response.data;
    } catch (error) {
        console.error('Error al obtener los datos:', error);
        throw error;
    }
}

export async function getArea(id) {
    try {
        const response = await axios.get(url + 'getArea/' + id);
        return response.data;
    } catch (error) {
        console.error('Error al obtener los datos:', error);
        throw error;
    }
}

export async function createArea(data) {
    try {
        const response = await axios.post(url + 'createArea/', data);
        console.log("api  api");
        console.log(response);
        console.log("api  api");
        return response.data;
    } catch (error) {
        console.error('Error al crear el area:', error);
        throw error;
    }
}

export async function updateArea(data) {
    try {
        const response = await axios.put(url + 'updateArea/', data);
        return response.data;
    } catch (error) {
        console.error('Error al actualizar el area:', error);
        throw error;
    }
}

export async function deleteArea(id) {
    try {
        const response = await axios.delete(url + 'deleteArea/' + id);
        return response.data;
    } catch (error) {
        console.error('Error al eliminar el area:', error);
        throw error;
    }
}

export async function getAreasByIdInventory(id) {
    try {
        const response = await axios.get(url + 'getAreasByIdInventory/' + id);
        return response.data;
    } catch (error) {
        console.error('Error al obtener los datos:', error);
        throw error;
    }
}