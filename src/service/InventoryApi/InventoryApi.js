import axios from 'axios';

const url = 'https://localhost:7210/api/Inventories/';

export async function getInventories() {
    try {
        const response = await axios.get(url + 'getAll/');
        return response.data; 
    } catch (error) {
        console.error('Error al obtener los datos:', error);
        throw error;
    }
}

export async function getInventory(id) {
    try {
        const response = await axios.get(url + 'getInventory/' + id);
        return response.data; 
    } catch (error) {
        console.error('Error al obtener los datos:', error);
        throw error;
    }
}

export async function createInventory(data) {
    try {
        const response = await axios.post(url + 'createInventory/', data);
        return response.data; 
    } catch (error) {
        console.error('Error al crear el inventario:', error);
        throw error;
    }
}

export async function updateInventory(data) {
    try {
        const response = await axios.put(url + 'updateInventory/', data);
        return response.data; 
    } catch (error) {
        console.error('Error al actualizar el inventario:', error);
        throw error;
    }
}

export async function deleteInventory(id) {
    try {
        const response = await axios.delete(url + 'deleteInventory/' + id);
        return response.data; 
    } catch (error) {
        console.error('Error al eliminar el inventario:', error);
        throw error;
    }
}